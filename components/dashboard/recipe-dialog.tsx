import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import RecipeForm from "./recipe-form";

const RecipeDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Create Recipe</Button>
        </DialogTrigger>
        <DialogContent className="lg:min-w-4xl max-h-10/12 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold">Add New Recipe</DialogTitle>
          </DialogHeader>
          <RecipeForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RecipeDialog;
