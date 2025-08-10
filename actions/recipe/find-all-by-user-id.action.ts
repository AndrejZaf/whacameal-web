import { db } from "@/db";
import { recipe } from "@/db/schema";
import { and, count, eq, ilike } from "drizzle-orm";

export const findAllByUserId = async (
  userId: string,
  size: number,
  page: number,
  searchQuery: string
) => {
  const offset = (page - 1) * size;
  const data = await db.query.recipe.findMany({
    where: and(
      eq(recipe.userId, userId),
      ilike(recipe.name, `%${searchQuery}%`)
    ),
    with: { ingredients: true },
    offset: offset,
    limit: size,
  });
  const totalCount = await db
    .select({ count: count() })
    .from(recipe)
    .where(
      and(eq(recipe.userId, userId), ilike(recipe.name, `%${searchQuery}%`))
    )
    .then((res) => res[0].count);
  return {
    data,
    totalCount,
  };
};
