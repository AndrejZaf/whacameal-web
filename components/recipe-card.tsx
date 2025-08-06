import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, ForkKnife } from "lucide-react";

const RecipeCard = () => {
  return (
    <Card className="group relative aspect-square cursor-pointer hover:bg-[#627AF7] hover:bg-opacity-25 transition duration-300 ease-in-out">
      <CardHeader className="p-0 h-2/3 rounded-t-lg">
        <img
          src="/cover.webp"
          alt="Recipe Card"
          className="h-full w-full rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="text-xl font-bold p-4">
        Double Smash Cheese Burger
      </CardContent>
      <CardFooter className="flex justify-between text-[#6B6B6B] p-4">
        <div className="flex gap-x-2">
          <div>
            <Clock />
          </div>
          <div>20 minutes</div>
        </div>
        <div className="flex gap-x-2">
          <ForkKnife />
          <div>Gluten</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
