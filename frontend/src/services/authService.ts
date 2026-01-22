import axiosInstance from '../lib/axios';
import { LoginCredentials, AuthResponse } from '../types';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    register: async (userData: LoginCredentials & { name: string }) => {
        const { data } = await axiosInstance.post('/auth/register', userData);
        return data;
    },
};