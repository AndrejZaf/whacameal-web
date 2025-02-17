"use server";

import { deleteById, findByIdAndType } from "@/data/token.data";
import { findById, update } from "@/data/user.data";
import { ResetPasswordSchema } from "@/lib/validation/reset-password.schema";
import { genSalt, hash } from "bcrypt-ts";
import { z } from "zod";

export const resetPassword = async (tokenId: string, values: z.infer<typeof ResetPasswordSchema>) => {
    if (values.password !== values.confirmPassword) {
        return { error: "Passwords dont match" };
    }

    const token = await findByIdAndType(tokenId, "FORGOT_PASSWORD");
    if (!token) {
        return { error: "Invalid password reset token, please request a new one" };
    }

    if (token.expires < new Date()) {
        return { error: "Expired password reset token, please request a new one" };
    }

    const user = await findById(token.userId);
    if (!user) {
        return { error: "Invalid user" };
    }

    const salt = await genSalt(10);
    user.password = await hash(values.password, salt);
    await update(user);
    await deleteById(tokenId);
};