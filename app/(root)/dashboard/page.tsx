import { findAllByUserId } from "@/actions/recipe/find-all-by-user-id.action";
import { auth } from "@/auth";
import RecipesTable from "@/components/dashboard/recipes-table";
import RecipesTableSkeleton from "@/components/dashboard/recipes-table-skeleton";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your recipes",
};

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
      <Suspense
        key={searchQuery + currentPage}
        fallback={<RecipesTableSkeleton />}
      >
        <RecipesTable
          currentPage={currentPage}
          initialData={recipesData.data}
          pageSize={pageSize}
          totalCount={recipesData.totalCount}
          searchQuery={searchQuery}
        />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
