import { db } from "@/db";
import { recipe } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export const findAllByUserId = async (
  userId: string,
  size: number,
  page: number
) => {
  const offset = (page - 1) * size;
  const data = await db
    .select()
    .from(recipe)
    .where(eq(recipe.userId, userId))
    .limit(size)
    .offset(offset);
  const totalCount = await db
    .select({ count: count() })
    .from(recipe)
    .where(eq(recipe.userId, userId))
    .then((res) => res[0].count);
  return {
    data,
    totalCount,
  };
};
