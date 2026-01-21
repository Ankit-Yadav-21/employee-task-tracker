import {
    mysqlTable,
    varchar,
    mysqlEnum,
    timestamp,
    int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: mysqlEnum("role", ["admin", "employee"])
        .notNull()
        .default("employee"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at")
        .defaultNow()
        .onUpdateNow(),
});
