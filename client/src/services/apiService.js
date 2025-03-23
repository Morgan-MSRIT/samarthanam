import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

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

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during signup' };
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await api.post('/auth/sendotp', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while sending OTP' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during login' };
  }
};

export const getTags = async () => {
  try {
    const response = await api.get('/tag/get-tags');
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

export const getEvents = async () => {
  try {
    const response = await api.get('/event/get-events');
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

export const getUserEvents = async (userId) => {
  try {
    const response = await api.post('/user/get-user-events', { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching user events' };
  }
};
export const updateEvent = async (eventData) => {
  try {
    const response = await api.post('/event/update-event', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while updating event' };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.post('/event/delete-event', { event_id: eventId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while deleting event' };
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
};