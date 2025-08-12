import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Trash } from "lucide-react";
import { IngredientSchema } from "@/lib/validation/ingredient.schema";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { measurementType } from "@/db/schema/recipe";

const IngredientsForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof RecipeSchema>>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const ingredientForm = useForm<z.infer<typeof IngredientSchema>>({
    resolver: zodResolver(IngredientSchema),
    defaultValues: {
      name: "",
      amount: 0,
      measurementType: undefined,
    },
  });

  const onAddIngredient = ingredientForm.handleSubmit((values) => {
    append(values);
    ingredientForm.reset();
  });

  return (
    <>
      <div className="text-[#627AF7] font-bold uppercase">Ingredients</div>
      <Form {...ingredientForm}>
        <div className="flex flex-col gap-x-4 md:flex-row">
          <FormField
            control={ingredientForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="ingredient-name">Ingredient</FormLabel>
                <FormControl>
                  <Input
                    id="ingredient-name"
                    placeholder="Ingredient"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ingredientForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="ingredient-amount">Amount</FormLabel>
                <FormControl>
                  <Input
                    id="ingredient-amount"
                    placeholder="Amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ingredientForm.control}
            name="measurementType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Measurement Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder={"Select type"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(measurementType.enumValues).map(
                        (value) => (
                          <SelectItem
                            key={value}
                            className="capitalize"
                            value={value}
                          >
                            {value.toLocaleLowerCase()}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={onAddIngredient}
            className="w-full md:w-auto self-end mb-2"
          >
            Add
          </Button>
        </div>
      </Form>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground text-center"
                >
                  {"No ingredients added yet."}
                </TableCell>
              </TableRow>
            ) : (
              fields.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {form.getValues(`ingredients.${index}.name`)}
                  </TableCell>
                  <TableCell>
                    {form.getValues(`ingredients.${index}.amount`)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {form
                      .getValues(`ingredients.${index}.measurementType`)
                      .toLowerCase()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      aria-label={`Remove ingredient ${
                        form.getValues(`ingredients.${index}.name`) || ""
                      }`}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default IngredientsForm;
