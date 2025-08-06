"use server";

import { auth } from "@/auth";
import { ResetPasswordSchema } from "@/lib/validation/reset-password.schema";
import { z } from "zod";

export const resetPassword = async (
  token: string,
  values: z.infer<typeof ResetPasswordSchema>
) => {
  if (values.password !== values.confirmPassword) {
    return { error: "Passwords dont match" };
  }

  await auth.api.resetPassword({
    body: {
      token,
      newPassword: values.password,
    },
  });
};
