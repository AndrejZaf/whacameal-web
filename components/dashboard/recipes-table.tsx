"use client";

import { Recipe, RecipeWithIngredients } from "@/db/types";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Pen, Search, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { DataTable } from "../data-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import RecipeDialog from "./recipe-dialog";
import { URLPagination } from "./url-pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteById } from "@/actions/recipe/delete-by-id.action";
import { toast } from "sonner";

const RecipesTable = ({
  initialData,
  totalCount,
  currentPage,
  pageSize: initialPageSize,
  searchQuery = "",
}: {
  initialData: Recipe[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  searchQuery?: string;
}) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchQuery);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

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

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    if (debouncedSearchValue !== currentQuery) {
      updateURL({
        query: debouncedSearchValue || undefined,
        page: 1,
      });
    }
  }, [debouncedSearchValue, searchParams, updateURL]);

  const setPagination = useCallback(
    (
      updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      updateURL({
        page: newPagination.pageIndex + 1,
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
                <SquareArrowOutUpRight className="cursor-pointer h-5 w-5" />
              </Link>
              <Pen
                className="cursor-pointer h-5 w-5"
                onClick={() => {
                  setRecipe(row.original);
                  setOpen(true);
                }}
              />
              <Trash
                className="cursor-pointer h-5 w-5"
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
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
            />
          </div>
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
