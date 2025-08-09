"use server";

import { db } from "@/db";
import { ingredient } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteAllByRecipeId = async (recipeId: string) => {
  await db.delete(ingredient).where(eq(ingredient.recipeId, recipeId));
};
