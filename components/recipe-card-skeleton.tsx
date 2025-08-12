import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

const RecipeCardSkeleton = () => {
  return (
    <Card className="group relative aspect-square cursor-pointer hover:bg-[#627AF7]/25 transition duration-150 ease-in-out">
      <CardHeader className="p-0 h-2/3 rounded-t-lg">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </CardHeader>
      <CardContent className="text-xl font-bold p-4 truncate">
        <Skeleton className="h-6 w-3/4" />
      </CardContent>
      <CardFooter className="flex justify-between text-[#6B6B6B] p-4">
        <div className="flex gap-x-2 items-center">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-x-2 items-center">
          <Skeleton className="h-4 w-16" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCardSkeleton;
