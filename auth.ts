import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { username } from "better-auth/plugins";
import * as schema from "@/db/schema";
import { generateAccountVerificationMail } from "./templates/verify-account.template";
import { transporter } from "./lib/mail-transporter";

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
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
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
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
