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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RecipeForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const session = authClient.useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof RecipeSchema>>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: "",
      recipeType: undefined,
      courseType: undefined,
      cookTime: 0,
      prepTime: 0,
      servings: 0,
      ingredients: [],
      instructions: "",
      image: undefined,
    },
  });

  const handleSubmit = async (values: z.infer<typeof RecipeSchema>) => {
    if (session.data?.user.id) {
      try {
        const result = await createRecipe(values, session.data.user.id);
        toast.success("Recipe created");
        router.push(`/recipes/${result.data?.id}`);
      } catch (_) {
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
        <Button type="submit" className="float-end">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
