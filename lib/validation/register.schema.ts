import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string()
        .min(1, { message: "Username is required" }),
    email: z.string()
        .email({ message: "Email is required" }),
    password: z.string()
        .min(1, { message: "Password is required" }),
    confirmPassword: z.string()
        .min(1, { message: "Confirm password is required" })
})
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The password did not match",
                path: ["confirmPassword"]
            });
        }
    });