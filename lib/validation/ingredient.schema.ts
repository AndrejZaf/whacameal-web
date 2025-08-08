import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.string().min(1, "Amount is required"),
  type: z.string().min(1, "Type is required"),
});
