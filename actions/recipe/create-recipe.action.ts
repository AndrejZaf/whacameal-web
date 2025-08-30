"use server";

import { db } from "@/db";
import { ingredient, measurementType, recipe } from "@/db/schema/recipe";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createIngredients } from "../ingredient/create-ingredients.action";
import { Ingredient } from "@/db/types";

export const createRecipe = async (
  values: z.infer<typeof RecipeSchema>,
  userId: string
) => {
  const validatedFields = RecipeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  if (!values.image) {
    return { error: "Image is required!" };
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

    const ingredients: Ingredient[] = validatedFields.data.ingredients.map(
      (ingredient) => {
        return {
          id: crypto.randomUUID(),
          name: ingredient.name,
          recipeId: result[0].id,
          amount: ingredient.amount.toString(),
          measurementType: ingredient.measurementType,
        };
      }
    );

    await createIngredients(ingredients, result[0].id);

    if (!result || result.length === 0) {
      throw new Error("Failed to create recipe");
    }

    revalidatePath("/");
    return { data: result[0] };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create recipe");
  }
};
