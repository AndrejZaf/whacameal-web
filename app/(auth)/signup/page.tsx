import AuthSidebar from "@/components/auth-sidebar";
import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="container relative h-screen flex-col items-center justify-center mx-auto md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthSidebar />
      <div className="flex justify-center align-middle lg:p-8 h-screen">
        <div className="mx-auto flex flex-col justify-center space-y-6 max-w-sm">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <SignupForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log In
            </Link>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
