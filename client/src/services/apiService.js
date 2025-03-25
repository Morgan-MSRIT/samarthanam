import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';
const RECOMMENDATION_API_URL = 'http://localhost:4002';

// Create two instances of axios - one for authenticated requests and one for public requests
const api = axios.create({
  baseURL: API_URL,
});

const recommendationApi = axios.create({
    baseURL: RECOMMENDATION_API_URL,
})


// Add token to every request via an interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

const publicApi = axios.create({
  baseURL: API_URL,
});

// Auth-related API functions
export const signup = async (userData) => {
  try {
    const response = await publicApi.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during signup' };
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await publicApi.post('/auth/sendotp', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while sending OTP' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await publicApi.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during login' };
  }
};

export const getTags = async () => {
  try {
    const response = await publicApi.get('/tag/get-tags');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching tags' };
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/event/create-event', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while creating event' };
  }
};

// Event-related API functions
export const getEvents = async () => {
  try {
    const response = await publicApi.get('/event/get-events');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching events' };
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await publicApi.get(`/event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching event details' };
  }
};

// export const organizerGetEventById = async (eventId) => {
//   try {
//     const response = await api.get(`/event/get-events-by-id`, { eventId });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'An error occurred while fetching event details' };
//   }
// };

export const getUserEvents = async (userId) => {
  try {
    const response = await api.post('/user/get-user-events', { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching user events' };
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/task/create-task', taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while creating task' };
  }
};

export const getTasks = async (eventId) => {
  try {
    const response = await api.post('/task/get-tasks', { event: eventId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching tasks' };
  }
};

export const updateTask = async (taskData) => {
  try {
    const response = await api.post('/task/update-task', taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while updating task' };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.post('/task/delete-task', { taskId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while deleting task' };
  }
};

export const getAllRegisterVolunteer = async (data) => {
  try {
    const response = await api.post('/event/get-all-register-volunteer', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching volunteers' };
  
  }
}

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.post('/event/update-event', { eventId, ...eventData });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while updating the event' };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.post('/event/delete-event', { eventId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while deleting the event' };
  }
};

export const participantRegistration = async (eventId, email, otp) => {
  try {
    const response = await publicApi.post('/event/participant-registration', { event: eventId, email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during registration' };
  }
};

export const participantDeregistration = async (eventId, email) => {
  try {
    const response = await publicApi.post('/event/participant-deregistration', { event: eventId, email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during deregistration' };
  }
};

export const updateVolunteer = async (volunteerData) => {
  try {
    const response = await api.post('/volunteer/update-volunteer', volunteerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while updating volunteer' };
  }
}

export const volunteerRegistration = async (eventId, data) => {
  try {
    console.log('Data received in volunteerRegistration:', data); // Debug log
    
    // Ensure we have all required fields
    if (!data.user || !data.user._id || !data.preferredTasks || !data.availableHours) {
      throw new Error('Missing required fields for volunteer registration');
    }

    const volunteerData = {
      user: data.user._id,
      taskPreferred: data.preferredTasks,
      taskAllocated: [],
      status: "not started",
      volunteerHrs: parseInt(data.availableHours),
      event: eventId
    };

    console.log('Transformed volunteer data:', volunteerData); // Debug log
    const response = await createVolunteer(volunteerData);
    return response;
  } catch (error) {
    console.error('Error in volunteerRegistration:', error); // Debug log
    throw error;
  }
};

export const createVolunteer = async (data) => {
  try {
    console.log('Data being sent to backend:', data); // Debug log
    
    // Validate required fields
    if (!data.user || !data.taskPreferred || typeof data.volunteerHrs !== 'number' || !data.event) {
      throw new Error('Missing required fields for creating volunteer');
    }

    // Ensure taskPreferred is an array
    if (!Array.isArray(data.taskPreferred)) {
      data.taskPreferred = [data.taskPreferred];
    }

    // Ensure taskAllocated is an array
    if (!Array.isArray(data.taskAllocated)) {
      data.taskAllocated = [];
    }

    const response = await api.post('/volunteer/create-volunteer', data);
    return response.data;
  } catch (error) {
    console.error('Error in createVolunteer:', error.response?.data || error); // Debug log
    throw error.response?.data || error;
  }

};

export const createFeedback = async (eventId, feedbackData) => {
  try {
    const response = await api.post('/feedback/create-feedback', { event: eventId, ...feedbackData });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while submitting feedback' };
  }
};

export const getRecommendedEvents = async (userId) => {
  try {
    const response = await recommendationApi.post('/recommendation/get-recommendation', {
        userId: userId, 
    })
    response.data.data = response.data.data.filter(data => data.matchedTags >= 1).map(data => data.event);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching recommended events' };
  }
};


export const organizerSignup = async (userData) => {
  try {
    const response = await publicApi.post('/auth/organizer-signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during signup' };
  }
};


export const getOrganizers = async () => {
  try {
    const response = await publicApi.get(`/auth/get-organizers`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching event details' };
  }
};

export const removeOrganizer = async (userid) => {
  try {
    const response = await publicApi.get(`/auth/${userid}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching event details' };
  }
};