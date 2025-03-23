import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('token');

// Configure axios with auth header
const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${getAuthToken()}` }
});

// Event Services
export const eventServices = {
    // Get all events
    getAllEvents: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/event/get-events`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new event
    createEvent: async (eventData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/event/create-event`,
                eventData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update event
    updateEvent: async (eventData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/event/update-event`,
                eventData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete event
    deleteEvent: async (eventId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/event/delete-event`,
                { event_id: eventId },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Register participant for an event
    registerParticipant: async (email, eventId, otp) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/event/participant-registration`,
                {
                    email,
                    event: eventId,
                    otp
                },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Deregister participant from an event
    deregisterParticipant: async (email, eventId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/event/participant-deregistration`,
                {
                    email,
                    event: eventId
                },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all registered volunteers for an event
    getAllRegisteredVolunteers: async (eventId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/event/get-all-register-volunteer`,
                { event: eventId },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Task Services
export const taskServices = {
    // Create new task
    createTask: async (taskData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/task/create-task`,
                taskData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all tasks
    getTasks: async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/task/get-tasks`,
                {},
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete task
    deleteTask: async (taskId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/task/delete-task`,
                { taskId },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Tag Services
export const tagServices = {
    // Create new tag
    createTag: async (name) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/tag/create-tag`,
                { name },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all tags
    getTags: async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/tag/get-tags`,
                {},
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete tag
    deleteTag: async (tagId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/tag/delete-tag`,
                { tagId },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Feedback Services
export const feedbackServices = {
    // Create feedback
    createFeedback: async (feedbackData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/feedback/create-feedback`,
                feedbackData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get feedbacks for an event
    getFeedbacks: async (eventId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/feedback/get-feedbacks`,
                { event: eventId },
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 