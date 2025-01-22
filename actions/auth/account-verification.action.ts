"use server";

import { deleteById, findByIdAndType } from "@/data/token.data";
import { findById, update } from "@/data/user.data";

export const accountVerification = async (tokenId: string) => {
    const token = await findByIdAndType(tokenId, "VERIFICATION");
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

    user.emailVerified = new Date();
    await update(user);
    await deleteById(tokenId);
};