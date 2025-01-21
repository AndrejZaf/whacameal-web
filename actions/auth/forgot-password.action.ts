"use server";

import { create } from "@/data/token.data";
import { findByEmail } from "@/data/user.data";
import { transporter } from "@/lib/mail-transporter";
import { ForgotPasswordSchema } from "@/lib/validation/forgot-password.schema";
import { z } from "zod";

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const user = await findByEmail(values.email);
    if (!user) {
        return { error: "User not found" };
    }

    const token = await create(user.id);
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Reset your password - WAM",
        html: generateMailTemplate(token[0].id, process.env.HOST!)
    };
    await transporter.sendMail(mailOptions);
};

const generateMailTemplate = (tokenId: string, host: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset password - WAM</title>
</head>
<body>
    <div style="text-align: center; font-family: Arial, sans-serif;">
        <img src="${host}/whc_logo_black.svg" alt="Whac a meal">
        <h1 style="font-size: 22px;" class="bg-red-400">Reset password instructions</h1>
        <p style="font-size: 14px;">You are receiving this email because we received a request for resetting the password of your Whac a meal account.
        <br />
        Click the button below to reset your password.</p>
        <a style="margin-top: 10px; background-color: #fba350; text-transform: uppercase; color: white; font-weight: bold; text-decoration: none; padding: 8px 40px; border-radius: 6px; font-size: 14px;" href="${host}/forgot-password/${tokenId}">Reset password</a>
        <p style="font-size: 12px; margin-top: 20px;">If you did not submit this request, please ignore it.</p>
    </div>
</body>
</html>
`;
};