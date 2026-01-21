import { TaskModel, UserModel } from '../models';
import { AppError } from '../utils/AppError';
import { Task, TaskWithUser } from '../types';

export class TaskService {
    static async createTask(taskData: {
        title: string;
        description?: string;
        assigned_to: number;
        status?: 'pending' | 'in_progress' | 'completed';
        due_date: string;
    }): Promise<Task> {
        // Verify that the assigned user exists
        try {
            await UserModel.findById(taskData.assigned_to);
        } catch (error) {
            throw new AppError('Assigned user not found', 404);
        }

        return TaskModel.create(taskData);
    }

    static async getAllTasks(): Promise<TaskWithUser[]> {
        return TaskModel.findAll();
    }

    static async getTaskById(id: number): Promise<Task> {
        try {
            return await TaskModel.findById(id);
        } catch (error) {
            throw new AppError('Task not found', 404);
        }
    }

    static async getTasksByUserId(userId: number): Promise<TaskWithUser[]> {
        // Verify user exists
        try {
            await UserModel.findById(userId);
        } catch (error) {
            throw new AppError('User not found', 404);
        }

        return TaskModel.findByUserId(userId);
    }

    static async updateTask(
        id: number,
        taskData: Partial<{
            title: string;
            description: string;
            assigned_to: number;
            status: 'pending' | 'in_progress' | 'completed';
            due_date: string;
        }>,
        requestingUserId: number,
        requestingUserRole: 'admin' | 'employee'
    ): Promise<Task> {
        // Get existing task
        let existingTask: Task;
        try {
            existingTask = await TaskModel.findById(id);
        } catch (error) {
            throw new AppError('Task not found', 404);
        }

        // If user is employee, they can only update their own tasks and only the status
        if (requestingUserRole === 'employee') {
            if (existingTask.assigned_to !== requestingUserId) {
                throw new AppError('You can only update your own tasks', 403);
            }

            // Employee can only update status
            if (taskData.title || taskData.description || taskData.assigned_to || taskData.due_date) {
                throw new AppError('Employees can only update task status', 403);
            }
        }

        // If assigned_to is being updated, verify the new user exists
        if (taskData.assigned_to) {
            try {
                await UserModel.findById(taskData.assigned_to);
            } catch (error) {
                throw new AppError('Assigned user not found', 404);
            }
        }

        return TaskModel.update(id, taskData);
    }

    static async deleteTask(id: number): Promise<void> {
        try {
            await TaskModel.findById(id);
        } catch (error) {
            throw new AppError('Task not found', 404);
        }

        await TaskModel.delete(id);
    }

    static async getTasksByStatus(
        status: 'pending' | 'in_progress' | 'completed'
    ): Promise<TaskWithUser[]> {
        return TaskModel.getTasksByStatus(status);
    }
}