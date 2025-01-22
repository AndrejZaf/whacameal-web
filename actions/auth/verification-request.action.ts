"use server";

import { create } from "@/data/token.data";
import { findByEmail } from "@/data/user.data";
import { transporter } from "@/lib/mail-transporter";
import { generateAccountVerificationMail } from "@/templates/verify-account.template";

export const verificationRequest = async (email: string) => {
    const user = await findByEmail(email);
    if (!user) {
        return { error: "User not found" };
    }

    const token = await create(user.id, "VERIFICATION");
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Verify your email - WAM",
        html: generateAccountVerificationMail(token[0].id, process.env.HOST!)
    };
    await transporter.sendMail(mailOptions);
};