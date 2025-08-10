import { RecipeSchema } from "@/lib/validation/recipe.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ImageForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof RecipeSchema>>;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  useEffect(() => {
    const currentImage = form.getValues("image");
    if (currentImage) {
      const previewUrl = createImagePreviewUrl(currentImage);
      setImagePreview(previewUrl);
    }
  }, [form]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Clean up previous preview URL if it was created from a File object
    if (imagePreview && !imagePreview.startsWith("data:")) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      form.setValue("image", file, { shouldValidate: true });
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      form.setValue("image", undefined, { shouldValidate: true });
      setImagePreview(null);
    }
  };

  useEffect(() => {
    return () => {
      // Only revoke URLs that were created with createObjectURL (not data URLs)
      if (imagePreview && !imagePreview.startsWith("data:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function createImagePreviewUrl(file: File | string): string {
    if (typeof file === "string") {
      return file; // This is already a data URL from the database
    }
    return URL.createObjectURL(file); // Create object URL for File objects
  }

  const handleRemoveImage = () => {
    form.setValue("image", undefined, { shouldValidate: true });

    // Clean up preview URL if it was created from a File object
    if (imagePreview && !imagePreview.startsWith("data:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);

    // Reset the file input
    const fileInput = document.getElementById(
      "recipe-image"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  return (
    <div className="space-y-2">
      <div className="text-[#627AF7] font-bold uppercase">Image</div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="image"
            render={({ field: _ }) => (
              <FormItem className="w-full md:max-w-md">
                <FormLabel htmlFor="recipe-image">Recipe Image</FormLabel>
                <FormControl>
                  <Input
                    id="recipe-image"
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="self-end"
            type="button"
            variant="ghost"
            onClick={() => {
              form.setValue("image", undefined, { shouldValidate: true });
              setImagePreview((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
              });
            }}
            disabled={!imagePreview}
          >
            Remove image
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {imagePreview ? (
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Recipe image preview"
              className="h-24 w-full rounded border object-cover"
            />
          ) : (
            <div className="h-24 w-full rounded border bg-muted text-muted-foreground grid place-items-center text-xs">
              {"No image"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
