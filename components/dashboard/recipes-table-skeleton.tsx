"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const RecipesTableSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Skeleton className="h-8" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
};

export default RecipesTableSkeleton;
