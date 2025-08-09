import { findAllByUserId } from "@/actions/recipe/find-all-by-user-id.action";
import { auth } from "@/auth";
import RecipeDialog from "@/components/dashboard/recipe-dialog";
import RecipesTable from "@/components/dashboard/recipes-table";
import { headers } from "next/headers";

const DashboardPage = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    pageSize?: string;
  }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <div>Please log in to view your recipes.</div>;
  }

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  const recipesData = await findAllByUserId(
    session.user.id,
    pageSize,
    currentPage
  );

  return (
    <div className="container mx-auto space-y-2 mt-2">
      <div className="flex justify-end">
        <RecipeDialog />
      </div>
      <RecipesTable
        currentPage={currentPage}
        initialData={recipesData.data}
        pageSize={pageSize}
        totalCount={recipesData.totalCount}
      />
    </div>
  );
};

export default DashboardPage;
