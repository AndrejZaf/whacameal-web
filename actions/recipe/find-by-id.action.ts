"use server";

import { db } from "@/db";

export const findById = async (id: string) => {
  return await db.query.recipe.findFirst({
    where: (recipe, { eq }) => eq(recipe.id, id),
    with: {
      ingredients: true,
    },
  });
};
