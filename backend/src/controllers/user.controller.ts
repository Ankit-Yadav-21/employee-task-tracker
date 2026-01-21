import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { UserService } from '../services';
import { asyncHandler } from '../utils/asyncHandler';
import { ResponseHandler } from '../utils/response';

export class UserController {
    static getAllUsers = asyncHandler(
        async (_req: AuthRequest, res: Response, _next: NextFunction) => {
            const users = await UserService.getAllUsers();

            ResponseHandler.success(
                res,
                { users, count: users.length },
                'Users retrieved successfully'
            );
        }
    );

    static getUserById = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;

            const user = await UserService.getUserById(Number(id));

            ResponseHandler.success(res, { user }, 'User retrieved successfully');
        }
    );

    static updateUser = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;
            const { name, email, role } = req.body;

            const user = await UserService.updateUser(Number(id), { name, email, role });

            ResponseHandler.success(res, { user }, 'User updated successfully');
        }
    );

    static deleteUser = asyncHandler(
        async (req: AuthRequest, res: Response, _next: NextFunction) => {
            const { id } = req.params;

            await UserService.deleteUser(Number(id));

            ResponseHandler.success(res, null, 'User deleted successfully');
        }
    );
}