"use server";

import { clear } from "@/data/token.data";

export const clearTokens = async () => {
    await clear();
};