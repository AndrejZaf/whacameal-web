import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export const findByEmail = (email: string) => {
    return db.query.users.findFirst({
        where: eq(users.email, email)
    });
};