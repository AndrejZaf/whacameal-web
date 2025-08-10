"use server";

import { db } from "@/db";
import { ingredient, recipe } from "@/db/schema/recipe";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteAllByRecipeId } from "../ingredient/delete-all-by-recipe-id.action";
import { createIngredients } from "../ingredient/create-ingredients.action";
import { Ingredient } from "@/db/types";

export const updateRecipe = async (
  recipeId: string,
  values: z.infer<typeof RecipeSchema>
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
      .update(recipe)
      .set({
        name: validatedFields.data.name,
        cookTime: validatedFields.data.cookTime,
        prepTime: validatedFields.data.prepTime,
        servings: validatedFields.data.servings,
        courseType: validatedFields.data.courseType,
        recipeType: validatedFields.data.recipeType,
        instructions: validatedFields.data.instructions,
        image: base64Image,
      })
      .where(eq(recipe.id, recipeId))
      .returning();

    await deleteAllByRecipeId(recipeId);
    await createIngredients(
      validatedFields.data.ingredients as Ingredient[],
      recipeId
    );

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
