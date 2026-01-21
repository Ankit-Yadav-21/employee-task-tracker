import { db } from "../db";
import { tasks } from "../db/schema/tasks";
import { users } from "../db/schema/users";
import { eq, asc, desc } from "drizzle-orm";

export class TaskModel {
    static async create(taskData: {
        title: string;
        description?: string;
        assigned_to: number;
        status?: "pending" | "in_progress" | "completed";
        due_date: string;
    }) {
        const result = await db.insert(tasks).values({
            title: taskData.title,
            description: taskData.description ?? "",
            assigned_to: taskData.assigned_to,
            status: taskData.status ?? "pending",
            due_date: new Date(taskData.due_date),
        });

        const insertId = Number(result[0].insertId);
        return this.findById(insertId);
    }

    static async findById(id: number) {
        const task = await db
            .select()
            .from(tasks)
            .where(eq(tasks.id, id))
            .limit(1);

        if (task.length === 0) {
            throw new Error("Task not found");
        }

        return task[0];
    }

    static async findAll() {
        return db
            .select({
                id: tasks.id,
                title: tasks.title,
                description: tasks.description,
                status: tasks.status,
                due_date: tasks.due_date,
                created_at: tasks.created_at,
                updated_at: tasks.updated_at,
                assigned_to: tasks.assigned_to,
                assigned_to_name: users.name,
                assigned_to_email: users.email,
            })
            .from(tasks)
            .innerJoin(users, eq(tasks.assigned_to, users.id))
            .orderBy(asc(tasks.due_date), desc(tasks.created_at));
    }

    static async findByUserId(userId: number) {
        return db
            .select({
                id: tasks.id,
                title: tasks.title,
                description: tasks.description,
                status: tasks.status,
                due_date: tasks.due_date,
                created_at: tasks.created_at,
                updated_at: tasks.updated_at,
                assigned_to: tasks.assigned_to,
                assigned_to_name: users.name,
                assigned_to_email: users.email,
            })
            .from(tasks)
            .innerJoin(users, eq(tasks.assigned_to, users.id))
            .where(eq(tasks.assigned_to, userId))
            .orderBy(asc(tasks.due_date), desc(tasks.created_at));
    }

    static async update(
        id: number,
        taskData: Partial<{
            title: string;
            description: string;
            assigned_to: number;
            status: "pending" | "in_progress" | "completed";
            due_date: string;
        }>
    ) {
        if (Object.keys(taskData).length === 0) {
            return this.findById(id);
        }

        await db
            .update(tasks)
            .set({
                ...(taskData.title !== undefined && { title: taskData.title }),
                ...(taskData.description !== undefined && {
                    description: taskData.description,
                }),
                ...(taskData.assigned_to !== undefined && {
                    assigned_to: taskData.assigned_to,
                }),
                ...(taskData.status !== undefined && { status: taskData.status }),
                ...(taskData.due_date !== undefined && {
                    due_date: new Date(taskData.due_date),
                }),
            })
            .where(eq(tasks.id, id));

        return this.findById(id);
    }

    static async delete(id: number): Promise<void> {
        await db.delete(tasks).where(eq(tasks.id, id));
    }

    static async getTasksByStatus(
        status: "pending" | "in_progress" | "completed"
    ) {
        return db
            .select({
                id: tasks.id,
                title: tasks.title,
                description: tasks.description,
                status: tasks.status,
                due_date: tasks.due_date,
                created_at: tasks.created_at,
                updated_at: tasks.updated_at,
                assigned_to: tasks.assigned_to,
                assigned_to_name: users.name,
                assigned_to_email: users.email,
            })
            .from(tasks)
            .innerJoin(users, eq(tasks.assigned_to, users.id))
            .where(eq(tasks.status, status))
            .orderBy(asc(tasks.due_date));
    }
}
