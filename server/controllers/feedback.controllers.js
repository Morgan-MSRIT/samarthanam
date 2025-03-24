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

        // const type = flask call
        // const sentiment_score = flask call

        
        // response = await axios.post("http://localhost:5000/get-sentimal-analysis", { event, contactHours, volunteerOrParticipationExperience, websiteExperience, experienceWorkingWithOrg, additionalInfo });
        // if (!response) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "python flask error for backend"
        //     })
        // }
        // console.log("RESPONSE HERE:", response)
        



        const feedback = await Feedback.create({
            event,
            contactHours,
            volunteerOrParticipationExperience,
            websiteExperience,
            experienceWorkingWithOrg,
            additionalInfo,
            // type,
            // sentiment_score
        });

        return res.status(200).json({
            success: true,
            message: "Feedback created successfully",
            data: feedback
        })
    }
    catch (error) {
        console.log("Error occurred while creating feedback", error);
        // Log the error message for debugging

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
        console.log("Error occurred while fetching feedbacks", error);
        // Log the error message for debugging

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
        console.log("Error occurred while deleting feedback", error);
        // Log the error message for debugging

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
