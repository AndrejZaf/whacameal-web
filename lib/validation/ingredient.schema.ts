import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .min(0, "Amount must be a positive number"),
  type: z.string().min(1, "Type is required"),
});
