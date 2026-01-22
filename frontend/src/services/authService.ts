import axiosInstance from '../lib/axios';
import { LoginCredentials, AuthResponse, RegisterCredentials } from '../types';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    register: async (userData: RegisterCredentials) => {
        const { data } = await axiosInstance.post('/auth/register', userData);
        return data;
    },
};