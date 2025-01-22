import { db, lower } from "@/db";
import { users } from "@/db/schema/user";
import { User } from "@/db/types";
import { RegisterSchema } from "@/lib/validation/register.schema";
import { genSalt, hash } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const findByEmail = async (email: string) => {
    return db.query.users.findFirst({
        where: eq(lower(users.email), email.toLowerCase())
    });
};

export const findByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username)
    });
};

export const create = async (values: z.infer<typeof RegisterSchema>) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(values.password, salt);
    return db.insert(users)
        .values({
            email: values.email,
            username: values.username,
            password: hashedPassword
        });
};

export const findById = async (id: string) => {
    return db.query.users.findFirst({
        where: eq(users.id, id)
    });
};

export const update = async (user: User) => {
    await db.update(users)
        .set(user)
        .where(eq(users.id, user.id));
};