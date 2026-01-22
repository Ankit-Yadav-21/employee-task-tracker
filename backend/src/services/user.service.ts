import { UserModel } from '../models';
import { AppError } from '../utils/AppError';
import { User } from '../types';

export class UserService {
    static async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        return UserModel.findAll();
    }

    static async getAllEmployees(): Promise<Omit<User, 'password'>[]> {
        return UserModel.findAllEmployees();
    }

    static async getUserById(id: number): Promise<Omit<User, 'password'>> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw new AppError('User not found', 404);
        }
    }

    static async updateUser(
        id: number,
        userData: Partial<Pick<User, 'name' | 'email' | 'role'>>
    ): Promise<Omit<User, 'password'>> {
        // Check if user exists
        try {
            await UserModel.findById(id);
        } catch (error) {
            throw new AppError('User not found', 404);
        }

        // If email is being updated, check if it's already taken
        if (userData.email) {
            const existingUser = await UserModel.findByEmail(userData.email);
            if (existingUser && existingUser.id !== id) {
                throw new AppError('Email already in use', 400);
            }
        }

        const updatedUser = await UserModel.update(id, userData);
        return updatedUser;
    }

    static async deleteUser(id: number): Promise<void> {
        // Check if user exists
        try {
            await UserModel.findById(id);
        } catch (error) {
            throw new AppError('User not found', 404);
        }

        await UserModel.delete(id);
    }
}