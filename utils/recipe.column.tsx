import { Recipe } from "@/db/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="h-16 w-16"
        />
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
  },
  {
    accessorKey: "servings",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Servings" />
    ),
    enableSorting: false,
  },
];
