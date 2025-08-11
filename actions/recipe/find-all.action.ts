"use server";

import { db } from "@/db";
import { recipe } from "@/db/schema";
import { count, ilike } from "drizzle-orm";

export const findAll = async (
  size: number,
  page: number,
  searchQuery: string
) => {
  const offset = (page - 1) * size;
  const data = await db.query.recipe.findMany({
    where: ilike(recipe.name, `%${searchQuery}%`),
    offset: offset,
    limit: size,
  });
  const totalCount = await db
    .select({ count: count() })
    .from(recipe)
    .where(ilike(recipe.name, `%${searchQuery}%`))
    .then((res) => res[0].count);
  return {
    data,
    totalCount,
  };
};
