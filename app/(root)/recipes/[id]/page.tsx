import { findById } from "@/actions/recipe/find-by-id.action";
import RecipeContent from "@/components/recipe/recipe-content";
import RecipeContentSkeleton from "@/components/recipe/recipe-content-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = await findById(id);
  return {
    title: recipe?.name,
  };
}

const RecipePage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<RecipeContentSkeleton />}>
      <RecipeContent params={params} />
    </Suspense>
  );
};

export default RecipePage;
