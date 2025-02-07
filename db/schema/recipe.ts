import { users } from "@/db/schema/user";
import { AnyPgColumn, integer, pgTable, text } from "drizzle-orm/pg-core";

export const recipes = pgTable(
    "recipe",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        userId: text("user_id")
            .references((): AnyPgColumn => users.id)
            .notNull(),
        title: text("title")
            .notNull(),
        prepTime: integer("prep_time")
            .notNull(),
        cookTime: integer("cook_time")
            .notNull(),
        servings: integer("servings")
            .notNull(),
        instructions: text("instructions")
            .notNull()
    }
);