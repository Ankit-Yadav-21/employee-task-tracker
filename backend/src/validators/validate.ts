import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const validate = (schema: z.Schema, property: "body" | "params" = "body") => (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => {
                const field = issue.path.join(".");
                if (
                    issue.code === "invalid_type"
                ) {
                    return `${field} is required`;
                }
                return issue.message;
            })
            .join(", ");

        throw new AppError(message, 400);
    }

    req[property] = result.data;
    next();
};
