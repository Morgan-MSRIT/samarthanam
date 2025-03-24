import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

// Create two instances of axios - one for authenticated requests and one for public requests
const api = axios.create({
  baseURL: API_URL,
});

const publicApi = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

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

export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/event/create-event', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while creating the event' };
  }
};

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

export const updateVolunteerPreferences = async (data) => {
  try {
    const response = await api.post('/volunteer/update-preferences', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while updating volunteer preferences' };
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/task/create-task', taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while creating the task' };
  }
};