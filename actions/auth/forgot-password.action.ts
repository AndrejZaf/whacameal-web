"use server";

import { auth } from "@/auth";
import { findByEmail } from "@/data/user.data";
import { ForgotPasswordSchema } from "@/lib/validation/forgot-password.schema";
import { z } from "zod";

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const user = await findByEmail(values.email);
  if (!user) {
    return { error: "User not found" };
  }

  await auth.api.requestPasswordReset({
    body: {
      email: user.email,
      redirectTo: `${process.env.HOST}/forgot-password`,
    },
  });
};
