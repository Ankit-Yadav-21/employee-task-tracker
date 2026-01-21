import { UserModel } from '../models';
import { JWTUtils } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { User } from '../types';

export class AuthService {
    static async register(userData: {
        name: string;
        email: string;
        password: string;
        role?: 'admin' | 'employee';
    }): Promise<{ user: Omit<User, 'password'>; token: string }> {
        // Check if user already exists
        const existingUser = await UserModel.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError('User with this email already exists', 400);
        }

        // Create user
        const user = await UserModel.create(userData);

        // Generate token
        const token = JWTUtils.generateToken(user);

        return {
            user,
            token,
        };
    }

    static async login(
        email: string,
        password: string
    ): Promise<{ user: Omit<User, 'password'>; token: string }> {
        // Verify credentials
        const user = await UserModel.verifyPassword(email, password);

        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        // Generate token
        const token = JWTUtils.generateToken(user);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    static async getCurrentUser(userId: number): Promise<Omit<User, 'password'>> {
        const user = await UserModel.findById(userId);
        return user;
    }
}