"use client";

import { RecipePromptSchema } from "@/lib/validation/prompt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { createAIRecipe } from "@/actions/ai-chef/create-recipe.action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const RecipePrompt = () => {
  const { data } = authClient.useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof RecipePromptSchema>>({
    resolver: zodResolver(RecipePromptSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof RecipePromptSchema>) => {
    if (data?.user) {
      const recipeId = await createAIRecipe(values.prompt, data.user.id);
      router.push(`/recipes/${recipeId}`);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea {...field} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="float-end">
            Generate Recipe
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RecipePrompt;
