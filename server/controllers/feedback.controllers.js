const Feedback = require('../models/feedback.models');
const Event = require('../models/event.models');


exports.createFeedback = async (req, res) => {
    try {
        const { event, contactHours, volunteerOrParticipationExperience, websiteExperience, experienceWorkingWithOrg, additionalInfo} = req.body;

        if(!event || !contactHours || !volunteerOrParticipationExperience || !websiteExperience || !experienceWorkingWithOrg || !additionalInfo) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if(contactHours < 0) {
            return res.status(400).json({
                success: false,
                message: "Contact hours must be more than 0"
            })
        }

        const eventExists = await Event.findById(event);
        if(!eventExists) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            })
        }



        const eventExistsInFeedback = await Feedback.findOne({event});
        if(eventExistsInFeedback) {
            return res.status(400).json({
                success: false,
                message: "Feedback for this event already exists"
            })
        }



        const feedback = await Feedback.create({
            event,
            contactHours,
            volunteerOrParticipationExperience,
            websiteExperience,
            experienceWorkingWithOrg,
            additionalInfo
        });

        return res.status(200).json({
            success: true,
            message: "Feedback created successfully",
            data: feedback
        })
    }
    catch (error) {
        console.log("Error occured while creating feedback", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getFeedbacks = async (req, res) => {
    try {

        const feedbacks = await Feedback.find({event: req.body.event});
        return res.status(200).json({
            success: true,
            data: feedbacks
        })
    }
    catch (error) {
        console.log("Error occured while fetching feedbacks", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.deleteFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.body;
        const feedback = await Feedback.findByIdAndDelete(feedbackId);

        if(!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Feedback deleted successfully"
        })
    }
    catch (error) {
        console.log("Error occured while deleting feedback", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

