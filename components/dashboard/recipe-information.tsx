import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RecipeSchema } from "@/lib/validation/recipe.schema";
import { z } from "zod";

const RecipeInformation = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof RecipeSchema>>;
}) => {
  return (
    <>
      <div className="text-[#627AF7] font-bold uppercase">
        Recipe Information
      </div>
      <div className="flex gap-x-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Recipe Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipeType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Recipe Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Choose an option" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-x-4">
        <FormField
          control={form.control}
          name="cookTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cook Time</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Cook time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prepTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Prep Time</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Prep time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="servings"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Servings</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Servings" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Course" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default RecipeInformation;
