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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { courseType, recipeType } from "@/db/schema/recipe";

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
                <Input
                  {...field}
                  placeholder="Recipe Name"
                  disabled={form.formState.isSubmitting}
                />
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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full capitalize"
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectValue placeholder={"Select type"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(recipeType.enumValues).map((value) => (
                      <SelectItem
                        key={value}
                        className="capitalize"
                        value={value}
                      >
                        {value.toLocaleLowerCase().split("_").join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Input
                  {...field}
                  type="number"
                  placeholder="Cook time"
                  disabled={form.formState.isSubmitting}
                />
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
                <Input
                  {...field}
                  type="number"
                  placeholder="Prep time"
                  disabled={form.formState.isSubmitting}
                />
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
                <Input
                  {...field}
                  type="number"
                  placeholder="Servings"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full capitalize"
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectValue placeholder={"Select type"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(courseType.enumValues).map((value) => (
                      <SelectItem
                        key={value}
                        className="capitalize"
                        value={value}
                      >
                        {value.toLocaleLowerCase().split("_").join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
