"use server";

import { auth } from "@/auth";
import { findByUsername } from "@/data/user.data";
import { LoginSchema } from "@/lib/validation/login.schema";
import { redirect } from "next/navigation";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;
  const existingUser = await findByUsername(username);
  if (!existingUser) {
    return { error: "Something went wrong!" };
  }

  try {
    await auth.api.signInUsername({
      body: {
        username,
        password,
      },
    });
  } catch (error) {
    if (error.body.code === "EMAIL_NOT_VERIFIED") {
      return {
        error:
          "Email is not verified, please request a new verification email.",
        verification: true,
      };
    }
    return { error: "Something went wrong!" };
  }
};
