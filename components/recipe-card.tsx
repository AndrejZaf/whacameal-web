import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Recipe } from "@/db/types";
import { Clock, ForkKnife } from "lucide-react";
import Link from "next/link";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="group relative aspect-square cursor-pointer hover:bg-[#627AF7]/25 transition duration-150 ease-in-out">
        <CardHeader className="p-0 h-2/3 rounded-t-lg">
          <img
            src={recipe.image}
            alt="Recipe Card"
            className="h-full w-full rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="text-xl font-bold p-4 truncate">
          {recipe.name}
        </CardContent>
        <CardFooter className="flex justify-between text-[#6B6B6B] p-4">
          <div className="flex gap-x-2 items-center">
            <div>
              <Clock size={18} />
            </div>
            <div>{recipe.cookTime} minutes</div>
          </div>
          <div className="flex gap-x-2 items-center">
            <ForkKnife size={18} />
            <span className="capitalize">
              {recipe.recipeType.split(" ").join("-").toLowerCase()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
