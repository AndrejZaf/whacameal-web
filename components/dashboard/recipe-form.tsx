"use client";

import { createRecipe } from "@/actions/recipe/create-recipe.action";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import ImageForm from "./image-form";
import IngredientsForm from "./ingredients-form";
import InstructionsForm from "./instructions-form";
import RecipeInformation from "./recipe-information";

const RecipeForm = () => {
  const form = useForm<z.infer<typeof RecipeSchema>>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: "",
      recipeType: "",
      course: "",
      cookTime: "",
      prepTime: "",
      servings: "",
      ingredients: [],
      instructions: "",
      image: undefined,
    },
  });

  const handleSubmit = async (values: z.infer<typeof RecipeSchema>) => {
    await createRecipe(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className="space-y-2"
      >
        <ImageForm form={form} />
        <RecipeInformation form={form} />
        <IngredientsForm form={form} />
        <InstructionsForm form={form} />
        <Button type="submit" className="float-end">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
