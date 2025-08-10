"use client";

import { Recipe, RecipeWithIngredients } from "@/db/types";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Pen, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "../data-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import RecipeDialog from "./recipe-dialog";
import { URLPagination } from "./url-pagination";
import { Button } from "../ui/button";
import { deleteById } from "@/actions/recipe/delete-by-id.action";
import { toast } from "sonner";

const RecipesTable = ({
  initialData,
  totalCount,
  currentPage,
  pageSize: initialPageSize,
}: {
  initialData: Recipe[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / initialPageSize);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const pagination = useMemo(
    () => ({
      pageIndex: currentPage - 1,
      pageSize: initialPageSize,
    }),
    [currentPage, initialPageSize]
  );

  const updateURL = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const setPagination = useCallback(
    (
      updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      updateURL({
        page: newPagination.pageIndex + 1, // Convert back to 1-based indexing for URL
        pageSize:
          newPagination.pageSize !== initialPageSize
            ? newPagination.pageSize
            : undefined,
      });
    },
    [pagination, updateURL, initialPageSize]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page });
    },
    [updateURL]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      updateURL({
        page: 1,
        pageSize: newPageSize !== initialPageSize ? newPageSize : undefined,
      });
    },
    [updateURL, initialPageSize]
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteById(id);
      toast.success("Successfuly deleted the recipe");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting recipe");
    }
  };

  const columns: ColumnDef<Recipe>[] = useMemo(
    () => [
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
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 justify-end">
              <Link href={`/recipes/${row.original.id}`}>
                <SquareArrowOutUpRight className="cursor-pointer h-6 w-6" />
              </Link>
              <Pen
                className="cursor-pointer h-6 w-6"
                onClick={() => {
                  setRecipe(row.original);
                  setOpen(true);
                }}
              />
              <Trash
                className="cursor-pointer h-6 w-6"
                onClick={() => handleDelete(row.original.id)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setRecipe(undefined);
              setOpen(true);
            }}
          >
            Create Recipe
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={initialData}
          setPagination={setPagination}
          totalPageCount={totalPageCount}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
        />
        <URLPagination
          currentPage={currentPage}
          pageSize={initialPageSize}
          totalCount={totalCount}
          totalPageCount={totalPageCount}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
      <RecipeDialog
        open={open}
        setOpen={setOpen}
        recipe={recipe as RecipeWithIngredients}
      />
    </>
  );
};

export default RecipesTable;
