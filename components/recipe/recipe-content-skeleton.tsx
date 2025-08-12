import { Skeleton } from "../ui/skeleton";

const RecipeContentSkeleton = () => {
  return (
    <div className="container mx-auto pt-8">
      <Skeleton className="h-8 w-64 font-bold mb-4" />
      <Skeleton className="w-full h-80 object-cover mb-4" />
      <div className="flex gap-x-8">
        <Skeleton className="h-24 w-48" />
        <Skeleton className="h-24 w-48" />
        <Skeleton className="h-24 w-48" />
        <Skeleton className="h-24 w-48" />
        <Skeleton className="h-24 w-48" />
      </div>
      <div className="flex gap-x-8 mt-8">
        <div className="min-w-md">
          <Skeleton className="h-8 w-64 font-bold mb-4" />
          <Skeleton className="w-full h-32" />
        </div>
        <div className="w-full">
          <Skeleton className="h-8 w-64 font-bold mb-4" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    </div>
  );
};

export default RecipeContentSkeleton;
