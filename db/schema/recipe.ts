import { user } from "@/db/schema/user";
import {
  AnyPgColumn,
  integer,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const recipeType = pgEnum("recipe_type", [
  "BREAKFAST",
  "BRUNCH",
  "LUNCH",
  "DINNER",
  "SNACK",
  "LATE_NIGHT",
  "HOLIDAY",
]);

export const courseType = pgEnum("course_type", [
  "APPETIZER",
  "SOUP",
  "SALAD",
  "MAIN_COURSE",
  "SIDE_DISH",
  "DESSERT",
]);

export const measurementType = pgEnum("measurement_type", [
  "GRAM",
  "KILOGRAM",
  "OUNCE",
  "POUND",
  "MILLILITER",
  "LITER",
  "CUP",
  "TABLESPOON",
  "TEASPOON",
  "PIECE",
  "BUNCH",
]);

export const recipe = pgTable("recipe", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references((): AnyPgColumn => user.id)
    .notNull(),
  name: text("name").notNull(),
  cookTime: integer("cook_time").notNull(),
  prepTime: integer("prep_time").notNull(),
  servings: integer("servings").notNull(),
  courseType: courseType("course_type").notNull(),
  recipeType: recipeType("recipe_type").notNull(),
  instructions: text("instructions").notNull(),
  image: text("image"),
});

export const ingredients = pgTable("ingredient", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  recipeId: text("recipe_id")
    .references((): AnyPgColumn => recipe.id)
    .notNull(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  measurementType: measurementType("measurement_type").notNull(),
});
