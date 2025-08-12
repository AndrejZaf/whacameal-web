import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const opensans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Whac A Meal",
    default: "Whac A Meal",
  },
  description: "Find your delicious meal",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${opensans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
