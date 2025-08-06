"use server";

import { findById, update } from "@/data/user.data";
import { ResetPasswordSchema } from "@/lib/validation/reset-password.schema";
import { z } from "zod";

export const resetPassword = async (
  tokenId: string,
  values: z.infer<typeof ResetPasswordSchema>
) => {
  if (values.password !== values.confirmPassword) {
    return { error: "Passwords dont match" };
  }

  const user = await findById(token.userId);
  if (!user) {
    return { error: "Invalid user" };
  }

  //   const salt = await genSalt(10);
  //   user.password = await hash(values.password, salt);
  await update(user);
};
