import { format, parseISO } from 'date-fns';

export const formatDate = (date: string): string => {
    try {
        return format(parseISO(date), 'MMM dd, yyyy');
    } catch {
        return date;
    }
};

export const formatDateTime = (date: string): string => {
    try {
        return format(parseISO(date), 'MMM dd, yyyy HH:mm');
    } catch {
        return date;
    }
};

export const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
        pending: 'Pending',
        in_progress: 'In Progress',
        completed: 'Completed',
    };
    return labels[status] || status;
};