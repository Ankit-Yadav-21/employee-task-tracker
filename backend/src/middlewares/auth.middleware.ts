import { NextFunction } from 'express';
import { AuthRequest } from '../types';
import { JWTUtils } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';

export const authenticate = asyncHandler(
    async (req: AuthRequest, _: any, next: NextFunction) => {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided. Please authenticate.', 401);
        }

        const token = authHeader.split(' ')[1];

        try {
            // Verify token
            const decoded = JWTUtils.verifyToken(token);

            // Attach user info to request
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            };

            next();
        } catch (error) {
            throw new AppError('Invalid or expired token. Please login again.', 401);
        }
    }
);

export const authorize = (...roles: Array<'admin' | 'employee'>) => {
    return (req: AuthRequest, _: any, next: NextFunction) => {
        if (!req.user) {
            throw new AppError('User not authenticated', 401);
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError('You do not have permission to perform this action', 403);
        }

        next();
    };
};