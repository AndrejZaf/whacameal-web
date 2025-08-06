"use server";

import { auth } from "@/auth";
import { findByUsername } from "@/data/user.data";

export const verificationRequest = async (username: string) => {
  const user = await findByUsername(username);
  if (!user) {
    return { error: "User not found" };
  }

  await auth.api.sendVerificationEmail({
    body: {
      email: user.email,
      callbackURL: "/",
    },
  });
};
