import AuthSidebar from "@/components/auth-sidebar";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import OrDivider from "@/components/or-divider";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
    return (
        <div
            className="container relative h-screen flex-col items-center justify-center mx-auto md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <AuthSidebar />
            <div className="flex justify-center align-middle lg:p-8 h-screen">
                <div className="mx-auto flex flex-col justify-center space-y-6 max-w-sm">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Forgot your password?
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below and we will send you an email to reset your password
                        </p>
                    </div>
                    <ForgotPasswordForm />
                    <OrDivider />
                    <div className="mt-4 text-center text-sm">
                        <Link href="/login" className="underline">
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
