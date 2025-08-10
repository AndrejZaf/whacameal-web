import { db } from "@/db";
import { ingredient } from "@/db/schema/recipe";
import { Ingredient } from "@/db/types";

export const createIngredients = async (
  ingredients: Ingredient[],
  recipeId: string
) => {
  const newIngredients = ingredients.map((ingredient) => ({
    recipeId: recipeId,
    name: ingredient.name,
    amount: ingredient.amount,
    measurementType: ingredient.measurementType,
  }));

  // TODO: create a separate action for this operation
  await db.insert(ingredient).values(newIngredients);
};
