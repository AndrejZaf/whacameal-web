"use server";

import { findById, update } from "@/data/user.data";
import { revalidatePath } from "next/cache";

export const uploadImage = async (userId: string, image: string) => {

    const user = await findById(userId);
    if (!user) {
        return { error: "Invalid user" };
    }

    user.image = image;
    await update(user);
    revalidatePath("/");
};