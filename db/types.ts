import { user } from "@/db/schema";
import {
  courseType,
  ingredient,
  measurementType,
  recipe,
  recipeType,
} from "./schema/recipe";

export type User = typeof user.$inferSelect;
export type Recipe = typeof recipe.$inferSelect;
export type Ingredient = typeof ingredient.$inferSelect;
export type RecipeWithIngredients = Recipe & { ingredients: Ingredient[] };

export type MeasurementType = typeof measurementType.enumValues;
export type CourseType = (typeof courseType.enumValues)[number];
export type RecipeType = (typeof recipeType.enumValues)[number];
