import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyOTP = async (email, emailOTP) => {
    try {
        const response = await axios.post(`${API_URL}/auth/verify-otp`, { email, emailOTP });
        console.log('OTP verification response:', response.data);
        return response.data;
    } catch (error) {
        console.error('OTP verification error:', error.response?.data || error.message);
        throw error;
    }
};