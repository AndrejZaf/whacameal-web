"use server";

import { db } from "@/db";
import { recipe } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteById = async (recipeId: string) => {
  try {
    await db.delete(recipe).where(eq(recipe.id, recipeId));
    revalidatePath("/");
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to delete recipe");
  }
};
