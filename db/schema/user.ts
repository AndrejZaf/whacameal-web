import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    username: text("username")
        .unique()
        .notNull(),
    email: text("email")
        .unique()
        .notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
    password: text("password")
        .notNull()
});