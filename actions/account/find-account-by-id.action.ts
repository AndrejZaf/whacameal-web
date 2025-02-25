"use server";

import { findById } from "@/data/user.data";

export const findAccountById = async (id: string) => {
    return findById(id);
};