export type UserRole = 'admin' | 'employee';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    assigned_to: number;
    status: TaskStatus;
    due_date: string;
    assignedUser?: User;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface CreateTaskData {
    title: string;
    description: string;
    assigned_to: number;
    due_date: string;
    status: TaskStatus;
}

export interface UpdateTaskData {
    title?: string;
    description?: string;
    status?: TaskStatus;
    due_date?: string;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}