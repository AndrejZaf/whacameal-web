"use server";

import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { z } from "zod";

export const createRecipe = async (values: z.infer<typeof RecipeSchema>) => {
  const validatedFields = RecipeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  console.log(validatedFields.data);
};
