"use client";

import { createAIRecipe } from "@/actions/ai-chef/create-recipe.action";
import { authClient } from "@/lib/auth-client";
import { RecipePromptSchema } from "@/lib/validation/prompt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

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
      const promise = createAIRecipe(values.prompt, data.user.id);

      toast.promise(promise, {
        loading: "Creating recipe...",
        success: "Recipe created successfully!",
        error: "Failed to save recipe. Please try again.",
      });
      try {
        const recipeId = await promise;
        router.push(`/recipes/${recipeId}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center w-full container mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder=""
                    disabled={
                      form.formState.isSubmitting ||
                      process.env.ENABLE_GEMINI !== "true"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="float-end"
            disabled={
              form.formState.isSubmitting ||
              process.env.ENABLE_GEMINI !== "true"
            }
          >
            Generate Recipe
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RecipePrompt;
