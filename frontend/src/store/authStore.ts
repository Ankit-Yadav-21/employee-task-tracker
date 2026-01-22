import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,

            setAuth: (user, token) => set({ user, token }),

            logout: () => {
                set({ user: null, token: null });
            },

            isAuthenticated: () => {
                const { token } = get();
                return !!token;
            },

            isAdmin: () => {
                const { user } = get();
                return user?.role === 'admin';
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);