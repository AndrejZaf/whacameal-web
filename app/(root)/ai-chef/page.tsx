import RecipePrompt from "@/components/ai-chef/recipe-prompt";
import React from "react";
import Image from "next/image";

const ChefPage = () => {
  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div>
          <h1 className="text-2xl text-center font-semibold">
            Welcome to our very own AI Chef!
          </h1>
          <p className="max-w-xl text-justify text-sm">
            Tell the chef what you have, what you need, and any limits. List
            your ingredients (with amounts if you know them), servings, time
            limit, diet/allergies, gear (e.g., air fryer, no oven), preferred
            cuisine, spice level, and anything to avoid. If you want a specific
            course (appetizer, main, dessert) or meal time (breakfast, dinner),
            say so. If you prefer metric or imperial, say that too.
          </p>
        </div>
      </div>
      <Image
        src="/whc-no-recipe.svg"
        alt="No recipes found"
        width={120}
        height={120}
        className="mx-auto mb-4"
      />
      <RecipePrompt />
    </div>
  );
};
export default ChefPage;
