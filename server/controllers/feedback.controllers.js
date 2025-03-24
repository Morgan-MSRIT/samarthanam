const Feedback = require('../models/feedback.models');
const Event = require('../models/event.models');
const axios = require("axios");

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

        
        
        const response = await axios.post("http://localhost:5000/sentiment-analysis", { 
            data: {
                event, 
                contactHours, 
                volunteerOrParticipationExperience, 
                websiteExperience, 
                experienceWorkingWithOrg, 
                additionalInfo 
            }
            
        });
        if (!response) {
                return res.status(404).json({
                        success: false,
                        message: "python flask error for backend"
            })
        }
        console.log("RESPONSE HERE:", response.data)
        
        
        const type =response.data.type
        const sentimentScore = response.data.sentiment_score


        const feedback = await Feedback.create({
            event,
            contactHours,
            volunteerOrParticipationExperience,
            websiteExperience,
            experienceWorkingWithOrg,
            additionalInfo,
            type,
            sentimentScore
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
        const {event} = req.body;
        console.log("------------", event)
        const feedbacks = await Feedback.find({event: req.body.event});

        // setFeedbacks(response?.data?.data.feedbacks);
        // setFeedbackSummary(response?.data?.data?.summary);
        // setScore(response?.data?.data?.score)
        const response = await axios.post("http://localhost:5000/feedback-analysis", { 
            data: feedbacks
            
        });
        if (!response) {
                return res.status(404).json({
                        success: false,
                        message: "python flask error for backend"
            })
        }
        console.log("RESPONSE HERE:", response.data)


        return res.status(200).json({
            success: true,
            data: {
                feedbacks,
                summary : response?.data,
                score: 10
            }
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
