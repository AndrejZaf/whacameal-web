import RecipeContent from "@/components/recipe/recipe-content";
import RecipeContentSkeleton from "@/components/recipe/recipe-content-skeleton";
import { Suspense } from "react";

const RecipePage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<RecipeContentSkeleton />}>
      <RecipeContent params={params} />
    </Suspense>
  );
};

export default RecipePage;
