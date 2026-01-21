import { NextFunction, Response } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Handle MySQL errors
    if (err.name === 'ER_DUP_ENTRY' || (err as any).code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            success: false,
            message: 'Duplicate entry. This record already exists.',
        });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    // Default error
    console.error('❌ Unhandled Error:', err);

    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};