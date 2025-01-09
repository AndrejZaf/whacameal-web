import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string()
        .email({
            message: "emailRequired"
        }),
    password: z.string()
        .min(1, {
            message: "passwordRequired"
        })
});