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
  amount: z.number({ required_error: "Amount is required" }),
  measurementType: MeasurementType,
});
