import { Response } from 'express';

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: any;
}

export class ResponseHandler {
    static success(res: Response, data: any, message = 'Success', statusCode = 200): Response {
        const response: ApiResponse = {
            success: true,
            message,
            data,
        };
        return res.status(statusCode).json(response);
    }

    static error(res: Response, message = 'Error', statusCode = 500, error?: any): Response {
        const response: ApiResponse = {
            success: false,
            message,
            ...(error && process.env.NODE_ENV === 'development' && { error }),
        };
        return res.status(statusCode).json(response);
    }

    static created(res: Response, data: any, message = 'Resource created'): Response {
        return this.success(res, data, message, 201);
    }

    static noContent(res: Response): Response {
        return res.status(204).send();
    }
}