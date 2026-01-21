import { Request } from 'express';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: 'admin' | 'employee';
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'employee';
    created_at: Date;
    updated_at: Date;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    assigned_to: number;
    status: 'pending' | 'in_progress' | 'completed';
    due_date: string;
    created_at: Date;
    updated_at: Date;
}

export interface TaskWithUser extends Task {
    assigned_to_name: string;
    assigned_to_email: string;
}