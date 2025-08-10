"use client";

import { RecipeWithIngredients } from "@/db/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import RecipeForm from "./recipe-form";

const RecipeDialog = ({
  open,
  setOpen,
  recipe,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  recipe: RecipeWithIngredients | undefined;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="lg:min-w-4xl max-h-10/12 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold">
              {recipe ? "Edit Recipe" : "Add New Recipe"}
            </DialogTitle>
          </DialogHeader>
          <RecipeForm recipe={recipe} setOpen={setOpen} />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RecipeDialog;
