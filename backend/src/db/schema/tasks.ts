import {
    mysqlTable,
    varchar,
    text,
    mysqlEnum,
    int,
    date,
    timestamp,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

export const tasks = mysqlTable("tasks", {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    assigned_to: int("assigned_to")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    status: mysqlEnum("status", [
        "pending",
        "in_progress",
        "completed",
    ])
        .notNull()
        .default("pending"),
    due_date: date("due_date"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at")
        .defaultNow()
        .onUpdateNow(),
});
