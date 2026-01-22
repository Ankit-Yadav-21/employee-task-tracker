import axiosInstance from '../lib/axios';
import { User } from '../types';

export const userService = {
    getAllUsers: async (): Promise<User[]> => {
        const { data } = await axiosInstance.get<User[]>('/users');
        return data;
    },
    getAllEmployee: async (): Promise<User[]> => {
        const { data } = await axiosInstance.get<User[]>('/users/employees');
        return data;
    },
};