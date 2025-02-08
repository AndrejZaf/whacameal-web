import { users } from "@/db/schema/user";
import { AnyPgColumn, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const mealType = pgEnum("meal_type", ["BREAKFAST", "BRUNCH", "LUNCH", "DINNER", "SNACK", "LATE_NIGHT", "HOLIDAY"]);
export const mealCourse = pgEnum("meal_course", ["APPETIZER", "SOUP", "SALAD", "MAIN_COURSE", "SIDE_DISH", "DESSERT"]);
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
            .notNull(),
        mealType: mealType("meal_type")
            .notNull(),
        mealCourse: mealCourse("meal_course")
            .notNull(),
    },
);