import { findAllByUserId } from "@/actions/recipe/find-all-by-user-id.action";
import { auth } from "@/auth";
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
  const searchQuery = searchParams?.query || "";

  const recipesData = await findAllByUserId(
    session.user.id,
    pageSize,
    currentPage,
    searchQuery
  );

  return (
    <div className="container mx-auto mt-2">
      <RecipesTable
        currentPage={currentPage}
        initialData={recipesData.data}
        pageSize={pageSize}
        totalCount={recipesData.totalCount}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default DashboardPage;
