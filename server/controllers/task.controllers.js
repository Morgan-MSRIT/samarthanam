const Task = require('../models/task.models');
const Event = require('../models/event.models');

exports.createTask = async (req, res) => {
    try {
        const { name, startTime, endTime, currentVolunteerCount, maxVolunteerNeeded } = req.body;
        if (!name || !startTime || !endTime || !currentVolunteerCount || !maxVolunteerNeeded) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
    
        const task = await Task.create({
            name,
            startTime,
            endTime,
            currentVolunteerCount,
            maxVolunteerNeeded
        });
    
        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            data: task
        })
    } catch (error) {
        console.log("Error occured while creating task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getTasks = async (req, res) => {
    try {
        const {event} = req.body;
        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Event is required"
            })
        }
        const tasks = await Task.find({event});

        return res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        console.log("Error occured while fetching tasks", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        await Task.findByIdAndDelete(taskId);

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })
    }
    catch (error) {
        console.log("Error occured while deleting task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.updateTask = async (req, res) => {
    try {
        const { taskId, name, startTime, endTime, currentVolunteerCount, maxVolunteerNeeded } = req.body;
        
        if (!taskId || !name || !startTime || !endTime || !currentVolunteerCount || !maxVolunteerNeeded) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        task.name = name;
        task.startTime = startTime;
        task.endTime = endTime;
        task.currentVolunteerCount = currentVolunteerCount;
        task.maxVolunteerNeeded = maxVolunteerNeeded;

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        })
    }
    catch (error) {
        console.log("Error occured while updating task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}