import { z } from "zod";

export const ResetPasswordSchema = z.object({
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