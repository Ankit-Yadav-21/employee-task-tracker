import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { TaskService } from '../services';
import { asyncHandler } from '../utils/asyncHandler';
import { ResponseHandler } from '../utils/response';

export class TaskController {
    static createTask = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { title, description, assigned_to, status, due_date } = req.body;

            const task = await TaskService.createTask({
                title,
                description,
                assigned_to,
                status,
                due_date,
            });

            ResponseHandler.created(res, { task }, 'Task created successfully');
        }
    );

    static getAllTasks = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { status } = req.query;

            let tasks;

            if (status && ['pending', 'in_progress', 'completed'].includes(status as string)) {
                tasks = await TaskService.getTasksByStatus(
                    status as 'pending' | 'in_progress' | 'completed'
                );
            } else {
                tasks = await TaskService.getAllTasks();
            }

            ResponseHandler.success(
                res,
                { tasks, count: tasks.length },
                'Tasks retrieved successfully'
            );
        }
    );

    static getTaskById = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;

            const task = await TaskService.getTaskById(Number(id));

            ResponseHandler.success(res, { task }, 'Task retrieved successfully');
        }
    );

    static updateTask = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;
            const { title, description, assigned_to, status, due_date } = req.body;

            if (!req.user) {
                return ResponseHandler.error(res, 'User not authenticated', 401);
            }

            const task = await TaskService.updateTask(
                Number(id),
                { title, description, assigned_to, status, due_date },
                req.user.id,
                req.user.role
            );

            ResponseHandler.success(res, { task }, 'Task updated successfully');
        }
    );

    static deleteTask = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;

            await TaskService.deleteTask(Number(id));

            ResponseHandler.success(res, null, 'Task deleted successfully');
        }
    );

    static getUserTasks = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;

            const tasks = await TaskService.getTasksByUserId(Number(id));

            ResponseHandler.success(
                res,
                { tasks, count: tasks.length },
                'User tasks retrieved successfully'
            );
        }
    );
}