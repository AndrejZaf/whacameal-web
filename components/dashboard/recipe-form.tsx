"use client";

import { createRecipe } from "@/actions/recipe/create-recipe.action";
import { updateRecipe } from "@/actions/recipe/update-recipe.action";
import { RecipeWithIngredients } from "@/db/types";
import { authClient } from "@/lib/auth-client";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { dataUrlToFile } from "@/utils/image.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import ImageForm from "./image-form";
import IngredientsForm from "./ingredients-form";
import InstructionsForm from "./instructions-form";
import RecipeInformation from "./recipe-information";

const RecipeForm = ({
  setOpen,
  recipe,
}: {
  setOpen: (open: boolean) => void;
  recipe: RecipeWithIngredients | undefined;
}) => {
  const session = authClient.useSession();
  const form = useForm<z.infer<typeof RecipeSchema>>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: recipe?.name || "",
      recipeType: recipe?.recipeType || undefined,
      courseType: recipe?.courseType || undefined,
      cookTime: recipe?.cookTime || 0,
      prepTime: recipe?.prepTime || 0,
      servings: recipe?.servings || 0,
      ingredients: recipe?.ingredients || [],
      instructions: recipe?.instructions || "",
      image: recipe?.image
        ? dataUrlToFile(recipe?.image, `recipe-${recipe.id}.jpg`)
        : undefined,
    },
  });

  const handleSubmit = async (values: z.infer<typeof RecipeSchema>) => {
    if (session.data?.user.id) {
      try {
        if (recipe) {
          await updateRecipe(recipe.id, values);
          toast.success("Recipe updated");
        } else {
          await createRecipe(values, session.data.user.id);
          toast.success("Recipe created");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error creating recipe");
      } finally {
        setOpen(false);
      }
    }
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
        <Button
          type="submit"
          className="float-end"
          disabled={form.formState.isSubmitting}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
