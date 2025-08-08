import RecipeDialog from "@/components/dashboard/recipe-dialog";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-end mt-2">
        <RecipeDialog />
      </div>
    </div>
  );
};

export default DashboardPage;
