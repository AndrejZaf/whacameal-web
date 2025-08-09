import { z } from "zod";
import { IngredientSchema } from "./ingredient.schema";

export const RecipeTypeEnum = z.enum([
  "BREAKFAST",
  "BRUNCH",
  "LUNCH",
  "DINNER",
  "SNACK",
  "LATE_NIGHT",
  "HOLIDAY",
]);

export const CourseTypeEnum = z.enum([
  "APPETIZER",
  "SOUP",
  "SALAD",
  "MAIN_COURSE",
  "SIDE_DISH",
  "DESSERT",
]);

export const RecipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  recipeType: RecipeTypeEnum,
  cookTime: z.coerce.number({ required_error: "Cook time is required" }),
  prepTime: z.coerce.number({ required_error: "Prep time is required" }),
  servings: z.coerce.number({ required_error: "Servings is required" }),
  courseType: CourseTypeEnum,
  ingredients: z.array(IngredientSchema),
  instructions: z.string().min(1, "Instructions are required"),
  image: z.instanceof(File),
});
