import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be between 2 and 100 characters")
        .max(100, "Name must be between 2 and 100 characters"),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email")
        .transform((val) => val.toLowerCase()),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

    role: z.enum(["admin", "employee"]).optional(),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email")
        .transform((val) => val.toLowerCase()),

    password: z.string().min(1, "Password is required"),
});
