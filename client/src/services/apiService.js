// client/src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during signup' };
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sendotp`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while sending OTP' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during login' };
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${API_URL}/tag/get-tags`, {});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching tags' };
  }
};