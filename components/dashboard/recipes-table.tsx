"use client";

import { findAllByUserId } from "@/actions/recipe/find-all-by-user-id.action";
import { authClient } from "@/lib/auth-client";
import { DataTable } from "../data-table";
import { useEffect } from "react";

const RecipesTable = () => {
  const { data } = authClient.useSession();

  //   return <DataTable data={} columns={[]} />;
  return null;
};

export default RecipesTable;
