"use server";

import { db } from "@/db";
import { recipe } from "@/db/schema";

export const findAll = async (page: number, size: number) => {
  const offset = (page - 1) * size;
  return await db.select().from(recipe).limit(size).offset(offset);
};
