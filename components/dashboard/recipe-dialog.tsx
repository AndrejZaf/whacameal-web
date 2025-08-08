import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Trash } from "lucide-react";

const RecipeDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Create Recipe</Button>
        </DialogTrigger>
        <DialogContent className="lg:min-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-bold">Add New Recipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-[#627AF7] font-bold uppercase">
              Recipe Information
            </div>
            <div className="flex gap-x-4">
              <div className="w-full">
                <Label htmlFor="name-1">Recipe Name</Label>
                <Input id="name-1" name="name" placeholder="Write something" />
              </div>

              <div className="w-full">
                <Label htmlFor="name-1">Recipe Type</Label>
                <Input id="name-1" name="name" placeholder="Choose an option" />
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="w-full">
                <Label htmlFor="name-1">Cook time</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Type something..."
                />
              </div>

              <div className="w-full">
                <Label htmlFor="name-1">Prep time</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Type something..."
                />
              </div>

              <div className="w-full">
                <Label htmlFor="name-1">Servings</Label>
                <Input id="name-1" name="name" placeholder="Choose an option" />
              </div>

              <div className="w-full">
                <Label htmlFor="name-1">Course</Label>
                <Input id="name-1" name="name" placeholder="Choose an option" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-[#627AF7] font-bold uppercase">
              Ingredients
            </div>
            <div className="flex gap-x-4">
              <div className="w-full">
                <div>Add Ingredient</div>
                <div className="flex gap-x-4">
                  <div className="w-full">
                    <Label htmlFor="name-1">Ingredient</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder="Type something..."
                    />
                  </div>

                  <div className="w-full">
                    <Label htmlFor="name-1">Amount</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder="Type something..."
                    />
                  </div>

                  <div className="w-full">
                    <Label htmlFor="name-1">Type</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder="Choose an option"
                    />
                  </div>
                  <Button className="self-end">Add</Button>
                </div>
                <div>Ingredient List</div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ground Beef</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>grams</TableCell>
                        <TableCell>
                          <Trash />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Salt</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>teaspoon</TableCell>
                        <TableCell>
                          <Trash />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bun</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <Trash />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cheese</TableCell>
                        <TableCell>100</TableCell>
                        <TableCell>grams</TableCell>
                        <TableCell>
                          <Trash />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-[#627AF7] font-bold uppercase">
              Instructions
            </div>
            <div className="flex gap-x-4">
              <div className="w-full">
                <Label htmlFor="name-1">Recipe Name</Label>
                <Textarea
                  id="name-1"
                  name="name"
                  placeholder="Write something"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RecipeDialog;
