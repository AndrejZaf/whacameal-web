import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { username } from "better-auth/plugins";
import * as schema from "@/db/schema";
import { generateAccountVerificationMail } from "./templates/verify-account.template";
import { transporter } from "./lib/mail-transporter";
import { generateForgotPasswordMailTemplate } from "./templates/forgot-password.template";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.ENABLE_EMAIL_SENDING === "true",
    sendResetPassword: async ({ user, token }) => {
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Reset your password - WAM",
        html: generateForgotPasswordMailTemplate(token, process.env.HOST!),
      };
      await transporter.sendMail(mailOptions);
    },
  },
  emailVerification: {
    sendOnSignUp: process.env.ENABLE_EMAIL_SENDING === "true",
    sendVerificationEmail: async ({ user, token }) => {
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Verify your email - WAM",
        html: generateAccountVerificationMail(token, process.env.HOST!),
      };
      await transporter.sendMail(mailOptions);
    },
  },
  socialProviders: {
    google: {
      enabled: process.env.ENABLE_GMAIL_OAUTH2 === "true",
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
