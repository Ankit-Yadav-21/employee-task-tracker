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
    created_at: Date | null;
    updated_at: Date | null;
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    assigned_to: number;
    status: 'pending' | 'in_progress' | 'completed';
    due_date: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface TaskWithUser extends Task {
    assigned_to_name: string;
    assigned_to_email: string;
}