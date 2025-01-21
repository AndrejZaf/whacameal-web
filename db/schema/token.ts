import { users } from "@/db/schema/user";
import { AnyPgColumn, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const tokenType = pgEnum("token_type", ["FORGOT_PASSWORD", "VERIFICATION"]);

export const tokens = pgTable(
    "token",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        type: tokenType()
            .notNull(),
        userId: text("user_id")
            .references((): AnyPgColumn => users.id)
            .notNull(),
        expires: timestamp("expires", { mode: "date" })
            .notNull()
    }
);