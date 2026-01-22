import { db } from "../db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { PasswordUtils } from "../utils/password";

export class UserModel {
    static async create(userData: {
        name: string;
        email: string;
        password: string;
        role?: "admin" | "employee";
    }) {
        const hashedPassword = await PasswordUtils.hash(userData.password);

        const result = await db.insert(users).values({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role ?? "employee",
        });

        const insertId = Number(result[0].insertId);
        return this.findById(insertId);
    }

    static async findById(id: number) {
        const user = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                created_at: users.created_at,
                updated_at: users.updated_at,
            })
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        if (user.length === 0) {
            throw new Error("User not found");
        }

        return user[0];
    }

    static async findByEmail(email: string) {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return user.length > 0 ? user[0] : null;
    }

    static async findAll() {
        return db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                created_at: users.created_at,
                updated_at: users.updated_at,
            })
            .from(users)
            .orderBy(users.created_at);
    }

    static async findAllEmployees() {
        return db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                created_at: users.created_at,
                updated_at: users.updated_at,
            })
            .from(users)
            .where(eq(users.role, "employee"))
            .orderBy(users.created_at);
    }

    static async update(
        id: number,
        userData: Partial<{
            name: string;
            email: string;
            role: "admin" | "employee";
        }>
    ) {
        if (Object.keys(userData).length === 0) {
            return this.findById(id);
        }

        await db
            .update(users)
            .set(userData)
            .where(eq(users.id, id));

        return this.findById(id);
    }

    static async delete(id: number): Promise<void> {
        await db.delete(users).where(eq(users.id, id));
    }

    static async verifyPassword(email: string, password: string) {
        const user = await this.findByEmail(email);

        if (!user) return null;

        const isValid = await PasswordUtils.compare(password, user.password);

        return isValid ? user : null;
    }
}
