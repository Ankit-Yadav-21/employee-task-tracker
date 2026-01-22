import { create } from 'zustand';
import { Task } from '../types';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    setTasks: (tasks: Task[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addTask: (task: Task) => void;
    updateTask: (id: number, task: Partial<Task>) => void;
    clearError: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    loading: false,
    error: null,

    setTasks: (tasks) => set({ tasks, error: null }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error, loading: false }),

    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task],
        error: null
    })),

    updateTask: (id, updatedTask) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
        ),
        error: null,
    })),

    clearError: () => set({ error: null }),
}));