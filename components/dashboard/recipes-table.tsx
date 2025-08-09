"use client";

import { Recipe } from "@/db/types";
import { columns } from "@/utils/recipe.column";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "../data-table";
import { URLPagination } from "./url-pagination";

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

  return (
    <div className="space-y-4">
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
  );
};

export default RecipesTable;
