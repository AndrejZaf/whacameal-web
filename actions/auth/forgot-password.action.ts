"use server";

import { create } from "@/data/token.data";
import { findByEmail } from "@/data/user.data";
import { transporter } from "@/lib/mail-transporter";
import { ForgotPasswordSchema } from "@/lib/validation/forgot-password.schema";
import { generateForgotPasswordMailTemplate } from "@/templates/forgot-password.template";
import { z } from "zod";

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const user = await findByEmail(values.email);
    if (!user) {
        return { error: "User not found" };
    }

    const token = await create(user.id, "FORGOT_PASSWORD");
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Reset your password - WAM",
        html: generateForgotPasswordMailTemplate(token[0].id, process.env.HOST!)
    };
    await transporter.sendMail(mailOptions);
};