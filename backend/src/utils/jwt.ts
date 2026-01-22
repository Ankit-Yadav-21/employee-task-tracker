import jwt from 'jsonwebtoken';
import { User } from '../types';

interface JWTPayload {
    id: number;
    email: string;
    role: 'admin' | 'employee';
}

export class JWTUtils {
    private static readonly secret = process.env.JWT_SECRET as string || 'fallback-secret-key';
    private static readonly expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    static generateToken(user: Pick<User, 'id' | 'email' | 'role'>): string {
        const payload: JWTPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn as string });
    }

    static verifyToken(token: string): JWTPayload {
        try {
            return jwt.verify(token, this.secret) as JWTPayload;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    static decodeToken(token: string): JWTPayload | null {
        try {
            return jwt.decode(token) as JWTPayload;
        } catch (error) {
            return null;
        }
    }
}