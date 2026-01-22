export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ROUTES = {
    LOGIN: '/login',
    ADMIN_DASHBOARD: '/admin',
    EMPLOYEE_DASHBOARD: '/employee',
} as const;

export const TASK_STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
] as const;

export const TASK_STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
} as const;