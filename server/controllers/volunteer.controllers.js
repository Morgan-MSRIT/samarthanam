const Volunteer = require('../models/volunteer.models');
const User = require('../models/user.models');
const Event = require('../models/event.models');
const Task = require('../models/task.models');



exports.createVolunteer = async (req, res) => {
    try {
        const {user, taskPreferred, taskAllocated, status, volunteerHrs, event} = req.body;
    
        if (!user || !taskPreferred || !taskAllocated || !status || !volunteerHrs || !event) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
    
        const userInfo = await User.findById(user);
        const eventInfo = await Event.findById(event);
    
        if (!userInfo || !eventInfo) {
            return res.status(404).json({
                success: false,
                message: "User or Event not found"
            })
        }
    
        const volunteer = await Volunteer.create({
            user,
            taskPreferred,
            taskAllocated,
            status,
            volunteerHrs,
            event
        });

        //Updating volunteer info in the event
        const updatedEvent = await Event.findByIdAndUpdate(
            event, 
            { 
                $push: { volunteers: volunteer._id }
            }, 
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: "Error while updating event"
            })
        }

        //Updating volunteer info in the tasks
        for (const taskId of taskAllocated) {
            await Task.findByIdAndUpdate(
                taskId, 
                { $inc: { currentVolunteerCount: 1 } }, 
                { new: true }
            );
        }
    
        return res.status(200).json({
            success: true,
            message: "Volunteer created successfully",
            data: volunteer
        })
    } catch (error) {
        console.log("Error occured while creating volunteer", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.getVolunteers = async (req, res) => {
    try {
        const {event} = req.body;

        const volunteers = await Volunteer.find({event: event});

        return res.status(200).json({
            success: true,
            data: volunteers
        })
    } catch (error) {
        console.log("Error occured while fetching volunteers", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.deleteVolunteer = async (req, res) => {
    try {
        const { volunteerId } = req.body;
        const volunteer = await Volunteer.findById(volunteerId);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found"
            })
        }
        
        //Updating volunteer info in the event
        const updatedEvent = await Event.findByIdAndUpdate
        (volunteer.event, { $inc: { totalVolunteerReq: 1 }, $pull : {totalVolunteerReq: volunteer._id} }, { new: true });

        //Updating volunteer info in the task
        volunteer.taskAllocated.forEach(task => async () => {
            const updatedTask = await Task.findByIdAndUpdate(
                task._id, 
                { $inc : {currentVolunteerCount: -1} }, 
                { new: true }
            );
        });


        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: "Error while updating event"
            })
        }

        await volunteer.remove();

        return res.status(200).json({
            success: true,
            message: "Volunteer deleted successfully"
        })
    } catch (error) {
        console.log("Error occured while deleting volunteer", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.updateVolunteer = async (req, res) => {
    try {
        const { volunteerId, taskPreferred, taskAllocated, status, volunteerHrs } = req.body;
        const volunteer = await Volunteer.findById(volunteerId);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found"
            })
        }

        const updatedVolunteer = await Volunteer.findByIdAndUpdate(volunteerId, {
            taskPreferred,
            taskAllocated,
            status,
            volunteerHrs
        }, { new: true });

        if (!updatedVolunteer) {
            return res.status(404).json({
                success: false,
                message: "Error while updating volunteer"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Volunteer updated successfully",
            data: updatedVolunteer
        })
    } catch (error) {
        console.log("Error occured while updating volunteer", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getVolunteer = async (req, res) => {
    try {
        const { volunteerId } = req.body;
        const volunteer = await Volunteer.findById(volunteerId).populate('user').populate('taskAllocated');

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: volunteer
        })
    } catch (error) {
        console.log("Error occured while fetching volunteer", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

