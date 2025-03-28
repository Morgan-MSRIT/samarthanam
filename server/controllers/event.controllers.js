const Event = require('../models/event.models');
const User = require('../models/user.models');
const OTP = require('../models/opt.models');
const Volunteer = require('../models/volunteer.models');

const cloudinary=require('cloudinary').v2;
const { cloudinaryConnect } = require("../configs/cloudinary");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

exports.createEvent = async (req, res) => {
    try {
        const { user, name, description, tags, location, startDate, endDate, tasks, isRegistrationRequired, totalVolunteerReq } = req.body;

        if(!user || !name || !description || !tags || !location || !startDate || !endDate || !tasks || !isRegistrationRequired || !totalVolunteerReq) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const image = req.files?.image;
        let imageUrl = '';

        if(image) {
            try {
                cloudinaryConnect();
                const result = await uploadImageToCloudinary(image, process.env.FOLDER_NAME, 1000, 1000);
                imageUrl = result.secure_url;
            } catch(error) {
                console.error("Error uploading image:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image to Cloudinary",
                    error: error.message
                });
            }
        }

        let parsedTags, parsedTasks;
        try {
            parsedTags = JSON.parse(tags);
            parsedTasks = JSON.parse(tasks);
        } catch(error) {
            console.error("Error parsing JSON:", error);
            return res.status(400).json({
                success: false,
                message: "Invalid format for tags or tasks",
                error: error.message
            });
        }

        const event = await Event.create({ 
            user, 
            name, 
            description, 
            tags: parsedTags, 
            location, 
            startDate, 
            endDate, 
            isRegistrationRequired, 
            totalVolunteerReq,
            tasks: parsedTasks,
            image: imageUrl
        });

        const fullEvent = await Event.findById(event._id)
            .populate('tasks')
            .populate("tags")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Event created successfully",
            data: fullEvent
        });
    } catch (error) {
        console.error("Error in createEvent controller:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating event",
            error: error.message
        });
    }
};


exports.getEvent = async (req, res) => {
    try {
        // If eventId is provided in params, get single event
        if (req.params.eventId) {
            console.log('Fetching event with ID:', req.params.eventId); // Debug log
            const event = await Event.findById(req.params.eventId)
                .populate('tasks')
                .populate('tags')
                .exec();

            if (!event) {
                console.log('Event not found'); // Debug log
                return res.status(404).json({
                    success: false,
                    message: "Event not found"
                });
            }

            console.log('Found event:', event); // Debug log
            return res.status(200).json({
                success: true,
                data: event
            });
        }

        // Otherwise, get all events
        const events = await Event.find()
            .populate('tasks')
            .populate('tags')
            .exec();

        return res.status(200).json({
            success: true,
            data: events
        });
    }
    catch (error) {
        console.log("Error occurred while fetching events:", error); // Debug log
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
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
        const { _id, name, description, location, tasks, startDate, endDate, isRegistrationRequired, totalVolunteerReq } = req.body;

        const event = await Event.findById(_id);

        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            });
        }

      
        const updatedEvent = await Event.findByIdAndUpdate(
            _id, 
            { name, description, location, tasks, startDate, endDate, isRegistrationRequired, totalVolunteerReq }, 
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


exports.getAllRegisterVolunteer = async (req, res) => {
    try {
        const { event_id } = req.body;
        // console.log("EVENT ID",event_id);
        const event = await Event.findById(event_id)
        .populate({
          path: 'volunteers',
          populate: { path: 'user' }
        })
        .populate('user')
        .exec();
        
        if(!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            })
        }
        console.log("EVENT: Get all registered volunteers: ",event);

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


exports.getEventById = async (req, res) => {
    try {
        const user = req.user.id;

        const event = await Event.find({user:user});

        if(!event) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: event
        })
    }
    catch (error) {
        console.log("Error occured while fetching event", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}