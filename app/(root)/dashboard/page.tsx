import RecipeDialog from "@/components/dashboard/recipe-dialog";
import RecipesTable from "@/components/dashboard/recipes-table";

const DashboardPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-end mt-2">
        <RecipeDialog />
      </div>
      <RecipesTable />
    </div>
  );
};

export default DashboardPage;
