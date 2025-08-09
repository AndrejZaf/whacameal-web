import { Recipe } from "@/db/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "courseType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      const courseType = row.getValue("courseType") as string;
      return (
        <div className="capitalize">
          {courseType.toLowerCase().replace("_", " ")}
        </div>
      );
    },
  },
  {
    accessorKey: "recipeType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const recipeType = row.getValue("recipeType") as string;
      return (
        <div className="capitalize">
          {recipeType.toLowerCase().replace("_", " ")}
        </div>
      );
    },
  },
  {
    accessorKey: "prepTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prep Time" />
    ),
    cell: ({ row }) => {
      const prepTime = row.getValue("prepTime") as number;
      return <div>{prepTime} min</div>;
    },
  },
  {
    accessorKey: "cookTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cook Time" />
    ),
    cell: ({ row }) => {
      const cookTime = row.getValue("cookTime") as number;
      return <div>{cookTime} min</div>;
    },
  },
  {
    accessorKey: "servings",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Servings" />
    ),
  },
];
