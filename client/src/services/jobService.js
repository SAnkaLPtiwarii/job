import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const getJobs = async () => {
    const response = await authAxios.get('/');
    return response.data;
};

export const createJob = async (jobData) => {
    const response = await authAxios.post('/', jobData);
    return response.data;
};

export const sendJobAlerts = async (jobId) => {
    const response = await authAxios.post(`/${jobId}/send-alerts`);
    return response.data;
};