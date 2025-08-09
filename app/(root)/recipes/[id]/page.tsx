/* eslint-disable @next/next/no-img-element */
import { findById } from "@/actions/recipe/find-by-id.action";
import {
  Clock,
  ClockIcon,
  CookingPot,
  Hourglass,
  Users,
  Utensils,
} from "lucide-react";

const RecipePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await findById(id);
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover mb-4"
      />
      <div className="flex gap-x-8">
        <div className="flex">
          <Clock size={48} className="text-[#C1C1C1]" />
          <div className="flex flex-col">
            <span className="ml-2 text-[#6B6B6B]">Cook Time</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.cookTime} minutes
            </span>
          </div>
        </div>
        <div className="flex">
          <Hourglass size={48} className="text-[#C1C1C1]" />
          <div className="flex flex-col">
            <span className="ml-2 text-[#6B6B6B]">Prep Time</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.prepTime} minutes
            </span>
          </div>
        </div>
        <div className="flex">
          <Users size={48} className="text-[#C1C1C1]" />
          <div className="flex flex-col">
            <span className="ml-2 text-[#6B6B6B]">Servings</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.servings}
            </span>
          </div>
        </div>
        <div className="flex">
          <CookingPot size={48} className="text-[#C1C1C1]" />
          <div className="flex flex-col">
            <span className="ml-2 text-[#6B6B6B]">Course</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.courseType.split("_").join(" ").toLowerCase()}
            </span>
          </div>
        </div>
        <div className="flex">
          <Utensils size={48} className="text-[#C1C1C1]" />
          <div className="flex flex-col">
            <span className="ml-2 text-[#6B6B6B]">Type</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.recipeType.split("_").join(" ").toLowerCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-x-8 mt-8">
        <div>
          <h1 className="text-[#627AF7] uppercase font-bold">Ingredients</h1>
        </div>
        <div>
          <h1 className="text-[#627AF7] uppercase font-bold">Instructions</h1>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
