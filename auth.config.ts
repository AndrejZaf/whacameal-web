import { LoginSchema } from "@/lib/validation/login.schema";
import { compare } from "bcrypt-ts";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findByEmail } from "./data/user.data";

export default {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await findByEmail(email);
                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await compare(password, user.password);
                    if (passwordMatch) {
                        return user;
                    }
                }

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
            }
            return token;
        }
    }
} satisfies NextAuthConfig;