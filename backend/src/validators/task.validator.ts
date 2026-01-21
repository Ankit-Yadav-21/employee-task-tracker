import { z } from "zod";

export const taskStatusEnum = z.enum([
    "pending",
    "in_progress",
    "completed",
]);


export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be between 3 and 255 characters")
        .max(255, "Title must be between 3 and 255 characters"),

    description: z
        .string()
        .trim()
        .max(5000, "Description cannot exceed 5000 characters")
        .optional(),

    assigned_to: z
        .number()
        .int("Assigned user must be a valid user ID")
        .positive("Assigned user must be a valid user ID"),

    status: taskStatusEnum.optional(),

    due_date: z
        .string()
        .refine((value) => {
            const dueDate = new Date(value);
            if (Number.isNaN(dueDate.getTime())) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return dueDate >= today;
        }, "Due date cannot be in the past"),
});


export const updateTaskBodySchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be between 3 and 255 characters")
        .max(255, "Title must be between 3 and 255 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .max(5000, "Description cannot exceed 5000 characters")
        .optional(),

    assigned_to: z
        .number()
        .int()
        .positive("Assigned user must be a valid user ID")
        .optional(),

    status: taskStatusEnum.optional(),

    due_date: z
        .string()
        .refine(
            (value) => !Number.isNaN(new Date(value).getTime()),
            "Due date must be a valid date (YYYY-MM-DD)"
        )
        .optional(),
});

export const taskIdSchema = z.object({
    id: z.coerce.number().int().positive("Invalid task ID"),
});
