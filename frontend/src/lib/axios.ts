import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/constants';
import { ApiError } from '../types';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth-storage');

        if (token) {
            try {
                const authData = JSON.parse(token);
                if (authData.state?.token) {
                    config.headers.Authorization = `Bearer ${authData.state.token}`;
                }
            } catch (error) {
                console.error('Error parsing auth token:', error);
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: AxiosError<ApiError>) => {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            statusCode: error.response?.status,
        };

        // Handle unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
        }

        return Promise.reject(apiError);
    }
);

export default axiosInstance;