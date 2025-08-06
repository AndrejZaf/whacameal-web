"use server";

import { create, findByEmail, findByUsername } from "@/data/user.data";
import { RegisterSchema } from "@/lib/validation/register.schema";
import { z } from "zod";

export const signup = async (values: z.infer<typeof RegisterSchema>) => {
  if (values.password !== values.confirmPassword) {
    return { error: "Passwords dont match" };
  }

  const userByEmail = await findByEmail(values.email);
  if (userByEmail) {
    return { error: `User with email ${values.email} already exists` };
  }

  const userByUsername = await findByUsername(values.username);
  if (userByUsername) {
    return { error: `User with username ${values.username} already exists` };
  }

  try {
    await create(values);
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Password is too short." };
  }
};
