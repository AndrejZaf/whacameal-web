"use server";

import { db } from "@/db";
import { recipe } from "@/db/schema/recipe";
import { Recipe } from "@/db/types";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { z } from "zod";

export const createRecipe = async (
  values: z.infer<typeof RecipeSchema>,
  userId: string
) => {
  const validatedFields = RecipeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const imageBytes = await values.image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const base64Image = `data:${
      values.image.type
    };base64,${imageBuffer.toString("base64")}`;

    const result = await db
      .insert(recipe)
      .values({
        userId: userId,
        name: validatedFields.data.name,
        cookTime: validatedFields.data.cookTime,
        prepTime: validatedFields.data.prepTime,
        servings: validatedFields.data.servings,
        courseType: validatedFields.data.courseType,
        recipeType: validatedFields.data.recipeType,
        instructions: validatedFields.data.instructions,
        image: base64Image,
      })
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to create recipe");
    }

    return { data: result[0] };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create recipe");
  }
};
