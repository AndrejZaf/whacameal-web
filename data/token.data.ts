import { db } from "@/db";
import { tokens } from "@/db/schema";

export const create = async (userId: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    return db.insert(tokens)
        .values({
            userId: userId,
            type: "FORGOT_PASSWORD",
            expires: expirationDate
        })
        .returning({ id: tokens.id });
};