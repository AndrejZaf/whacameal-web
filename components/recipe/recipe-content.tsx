import { findById } from "@/actions/recipe/find-by-id.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, CookingPot, Hourglass, Users, Utensils } from "lucide-react";

const RecipeContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
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
        className="w-full h-80 object-cover mb-4"
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
            <span className="ml-2 text-[#6B6B6B]">Course Type</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.courseType.split("_").join(" ").toLowerCase()}
            </span>
          </div>
        </div>
        <div className="flex">
          <Utensils size={48} className="text-[#C1C1C1]" />
          <div className="flex flex-col">
            <span className="ml-2 text-[#6B6B6B]">Recipe Type</span>
            <span className="ml-2 text-[#627AF7] uppercase font-bold">
              {recipe.recipeType.split("_").join(" ").toLowerCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-x-8 mt-8">
        <div className="min-w-md">
          <h1 className="text-[#627AF7] uppercase font-bold">Ingredients</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipe.ingredients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-muted-foreground text-center"
                  >
                    {"No ingredients added yet."}
                  </TableCell>
                </TableRow>
              ) : (
                recipe.ingredients.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell className="capitalize">
                      {row.measurementType.split("_").join(" ").toLowerCase()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <h1 className="text-[#627AF7] uppercase font-bold">Instructions</h1>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeContent;
