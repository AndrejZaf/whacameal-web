import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const InstructionsForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof RecipeSchema>>;
}) => {
  return (
    <>
      <div className="text-[#627AF7] font-bold uppercase">Instructions</div>
      <div className="flex gap-x-4">
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Instructions"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default InstructionsForm;
