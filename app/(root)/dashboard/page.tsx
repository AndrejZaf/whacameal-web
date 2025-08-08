import RecipeDialog from "@/components/dashboard/recipe-dialog";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <>
      <div className="flex justify-end">
        <RecipeDialog />
      </div>
    </>
  );
};

export default DashboardPage;
