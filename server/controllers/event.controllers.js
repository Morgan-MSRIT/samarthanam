const Event = require('../models/event.models');
const User = require('../models/user.models');
const OTP = require('../models/opt.models');
const Volunteer = require('../models/volunteer.models');




exports.createEvent =  async (req, res) => {
    try {
        const { user, name, description, tags, location, startDate, endDate, tasks, isRegistrationRequired, totalVolunteerReq } = req.body;
        
        if(!user || !name || !description || !tags || !location || !startDate || !endDate || !tasks || !isRegistrationRequired || !totalVolunteerReq) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const event = await Event.create({ 
            user, 
            name, 
            description, 
            tags, 
            location, 
            startDate, 
            endDate, 
            isRegistrationRequired, 
            totalVolunteerReq,
            tasks
        });

        const fullEvent = await Event.findById(event._id).populate('tasks').populate("tags").exec();
        

        // To find users who have tags similar to the event
        // const potentialUser = User.find({
        //     tags: { $in: tags }
        //   });

        
        // foreach(user in potentialUser) {
        //     //send the email 

        // }


        return res.status(200).json({
            success: true,
            message: "Event created successfully",
            data: fullEvent
        })
    }
    catch (error) {
        console.log("Error occured while creating event", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getEvent = async (req, res) => {
    try {
        const events = await Event.find().populate('tasks').populate("tags").exec();

        return res.status(200).json({
            success: true,
            data: events
        })
    }
    catch (error) {
        console.log("Error occured while fetching events", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



exports.participantRegistration = async (req, res) => {
    try {
        const { eventId, email, otp } = req.body;
        
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("--------------------");
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP NOT FOUND"
            })
        }
        
        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            })
        }
        
        console.log("--------------------");
        
        const event = await Event.findById(eventId);
        console.log("--------------------");

        if(!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            })
        }

        await event.updateOne({ $push: { registeredParticipants: email }});
    

        return res.status(200).json({
            success: true,
            message: "Volunteer registered successfully"
        })
    }
    catch (error) {
        console.log("Error occured while registering volunteer", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.participantDeregistration = async (req, res) => {
    try {
        const { eventId, email } = req.body;

        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            })
        }

        await event.updateOne({ $pull: { registeredParticipants: email } });

        return res.status(200).json({
            success: true,
            message: "Volunteer deregistered successfully"
        })
    }
    catch (error) {
        console.log("Error occured while deregistering volunteer", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



exports.updateEvent = async (req, res) => {
    try {
        const { _id, name, description, location, startDate, endDate, isRegistrationRequired, totalVolunteerReq } = req.body;

        const event = await Event.findById(_id);

        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            });
        }

      
        const updatedEvent = await Event.findByIdAndUpdate(
            _id, 
            { name, description, location, startDate, endDate, isRegistrationRequired, totalVolunteerReq }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        });

    } catch (error) {
        console.log("Error occurred while updating event:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



exports.deleteEvent = async (req, res) => {
    try {
        const { event_id } = req.body;

        const event = await Event.findById(event_id);

        if(!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            })
        }

        event.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        })

    }
    catch (error) {
        console.log("Error occured while deleting event", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



exports.getAllRegisterVolunteer = async (req, res) => {
    try {
        const { event_id } = req.body;

        const event = await Event.findById(event_id).populate('volunteers').exec().populate('user').exec();


        if(!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: event.volunteers
        })
    }
    catch (error) {
        console.log("Error occured while fetching volunteers", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
