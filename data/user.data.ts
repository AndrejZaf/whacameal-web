import { auth } from "@/auth";
import { db, lower } from "@/db";
import { user } from "@/db/schema";
import { User } from "@/db/types";
import { RegisterSchema } from "@/lib/validation/register.schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const findByEmail = async (email: string) => {
  return db.query.user.findFirst({
    where: eq(lower(user.email), email.toLowerCase()),
  });
};

export const findByUsername = async (username: string) => {
  return db.query.user.findFirst({
    where: eq(user.username, username),
  });
};

export const create = async (values: z.infer<typeof RegisterSchema>) => {
  await auth.api.signUpEmail({
    body: {
      name: values.username,
      email: values.email,
      password: values.password,
      username: values.username,
      displayUsername: values.username,
    },
  });
};

export const findById = async (id: string) => {
  return db.query.user.findFirst({
    where: eq(user.id, id),
  });
};

export const update = async (u: User) => {
  await db.update(user).set(u).where(eq(user.id, u.id));
};
