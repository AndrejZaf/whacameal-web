"use server";

import { auth } from "@/auth";
import { findByEmail } from "@/data/user.data";

export const verificationRequest = async (email: string) => {
  const user = await findByEmail(email);
  if (!user) {
    return { error: "User not found" };
  }

  await auth.api.sendVerificationEmail({
    body: {
      email: user.email,
      callbackURL: `${process.env.HOST}/auth/verify?token=${user.id}`,
    },
  });
};
