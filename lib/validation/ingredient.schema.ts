import { z } from "zod";

export const MeasurementType = z.enum([
  "GRAM",
  "KILOGRAM",
  "OUNCE",
  "POUND",
  "MILLILITER",
  "LITER",
  "CUP",
  "TABLESPOON",
  "TEASPOON",
  "PIECE",
  "BUNCH",
]);

export const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .min(0, "Amount must be a positive number"),
  type: MeasurementType,
});
