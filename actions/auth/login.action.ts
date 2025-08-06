"use server";

import { auth } from "@/auth";
import { findByEmail } from "@/data/user.data";
import { LoginSchema } from "@/lib/validation/login.schema";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await findByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    return {
      error:
        "Email is not verified, click on the button below to request verification email.",
      verification: true,
    };
  }

  try {
    await auth.api.signInUsername({
      body: {
        username: email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials" };
      } else {
        return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
