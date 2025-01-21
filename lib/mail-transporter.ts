import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: +process.env.SMTP_PORT!
});