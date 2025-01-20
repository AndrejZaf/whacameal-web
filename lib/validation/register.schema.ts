import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string()
        .email({
            message: "emailRequired"
        }),
    email: z.string()
        .email({
            message: "emailRequired"
        }),
    password: z.string()
        .min(1, {
            message: "passwordRequired"
        })
});