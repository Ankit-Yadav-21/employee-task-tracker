import { Response } from 'express';
import { AuthRequest } from '../types';
import { AuthService } from '../services';
import { asyncHandler } from '../utils/asyncHandler';
import { ResponseHandler } from '../utils/response';

export class AuthController {
    static register = asyncHandler(
        async (req: AuthRequest, res: Response) => {
            const { name, email, password, role } = req.body;

            const result = await AuthService.register({ name, email, password, role });

            ResponseHandler.created(
                res,
                {
                    user: result.user,
                    token: result.token,
                },
                'User registered successfully'
            );
        }
    );

    static login = asyncHandler(
        async (req: AuthRequest, res: Response) => {
            const { email, password } = req.body;

            const result = await AuthService.login(email, password);

            ResponseHandler.success(
                res,
                {
                    user: result.user,
                    token: result.token,
                },
                'Login successful'
            );
        }
    );

    static getCurrentUser = asyncHandler(
        async (req: AuthRequest, res: Response) => {
            if (!req.user) {
                ResponseHandler.error(res, 'User not authenticated', 401);
                return;
            }

            const user = await AuthService.getCurrentUser(req.user.id);

            ResponseHandler.success(res, { user }, 'User retrieved successfully');
        }
    );
}