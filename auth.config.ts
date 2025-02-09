import { LoginSchema } from "@/lib/validation/login.schema";
import { compare } from "bcrypt-ts";
import type { NextAuthConfig } from "next-auth";
import { type DefaultSession, type DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findByEmail } from "./data/user.data";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            username: string;
        };
    }

    interface DefaultUser {
        username: string;
    }
}

export default {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
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
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.username = token.username as string;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.username = (user as DefaultUser).username;
            }
            return token;
        },
    },
} satisfies NextAuthConfig;