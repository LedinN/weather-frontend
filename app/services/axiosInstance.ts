import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {'Content-Type': 'application/json'}
});

axiosInstance.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosInstance;