import {
    mysqlTable,
    varchar,
    text,
    mysqlEnum,
    int,
    date,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

export const tasks = mysqlTable("tasks", {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    assignedTo: int("assigned_to")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    status: mysqlEnum("status", [
        "pending",
        "in_progress",
        "completed",
    ])
        .notNull()
        .default("pending"),
    dueDate: date("due_date"),
});
