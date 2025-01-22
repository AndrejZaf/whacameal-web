import { db } from "@/db";
import { tokens } from "@/db/schema";
import { and, eq, lt } from "drizzle-orm";

export const create = async (userId: string, type: "FORGOT_PASSWORD" | "VERIFICATION") => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    return db.insert(tokens)
        .values({
            userId: userId,
            type: type,
            expires: expirationDate
        })
        .returning({ id: tokens.id });
};

export const findByIdAndType = async (tokenId: string, type: "FORGOT_PASSWORD" | "VERIFICATION") => {
    return db.query.tokens.findFirst({
        where: and(eq(tokens.id, tokenId), eq(tokens.type, type))
    });
};

export const deleteById = async (tokenId: string) => {
    return db.delete(tokens)
        .where(eq(tokens.id, tokenId));
};

export const clear = async () => {
    await db.delete(tokens)
        .where(lt(tokens.expires, new Date()));
};