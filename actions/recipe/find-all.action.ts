"use server";

import { db } from "@/db";
import { recipe } from "@/db/schema";

export const findAll = async (limit: number, offset: number) => {
  return await db.select().from(recipe).limit(limit).offset(offset);
};
