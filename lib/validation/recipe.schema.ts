import { z } from "zod";
import { IngredientSchema } from "./ingredient.schema";

export const RecipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  recipeType: z.string().min(1, "Recipe type is required"),
  cookTime: z.string().min(1, "Cook time is required"),
  prepTime: z.string().min(1, "Prep time is required"),
  servings: z.string().min(1, "Servings is required"),
  course: z.string().min(1, "Course is required"),
  ingredients: z.array(IngredientSchema),
  instructions: z.string().min(1, "Instructions are required"),
  image: z.instanceof(File),
});
