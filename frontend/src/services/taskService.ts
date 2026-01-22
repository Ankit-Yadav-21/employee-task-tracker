import axiosInstance from '../lib/axios';
import { Task, CreateTaskData, UpdateTaskData } from '../types';

export const taskService = {
    getAllTasks: async (): Promise<Task[]> => {
        const { data } = await axiosInstance.get<Task[]>('/tasks');
        return data;
    },

    getTaskById: async (id: number): Promise<Task> => {
        const { data } = await axiosInstance.get<Task>(`/tasks/${id}`);
        return data;
    },

    createTask: async (taskData: CreateTaskData): Promise<Task> => {
        const { data } = await axiosInstance.post<Task>('/tasks', taskData);
        return data;
    },

    updateTask: async (id: number, taskData: UpdateTaskData): Promise<Task> => {
        const { data } = await axiosInstance.put<Task>(`/tasks/${id}`, taskData);
        return data;
    },

    getUserTasks: async (userId: number): Promise<Task[]> => {
        const { data } = await axiosInstance.get<Task[]>(`/users/${userId}/tasks`);
        return data;
    },
};