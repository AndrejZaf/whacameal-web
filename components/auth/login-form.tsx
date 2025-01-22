"use client";

import { login } from "@/actions/auth/login.action";
import { verificationRequest } from "@/actions/auth/verification-request.action";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/validation/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
    const [pending, setPending] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const [verificationError, setVerificationError] = useState<boolean | undefined>();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        startTransition(async () => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        setVerificationError(data?.verification);
                        setError(data?.error);
                    }
                });
        });
    };

    const requestEmailVerification = async () => {
        setError("");
        await verificationRequest(form.getValues().email);
        setSuccessMessage("A verification email has been sent, please check your inbox.");
    };

    if (successMessage) {
        return <FormSuccess message={successMessage} />;
    }

    return (
        <Form {...form}>
            {error && <FormError message={error} />}
            {verificationError &&
                <Button onClick={requestEmailVerification} variant="secondary" className="w-full">
                    Request verification email
                </Button>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"john.doe@example.com"} type="email" disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <FormControl>
                            <Input {...field} placeholder="********" type="password" disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={pending}>
                    Login
                </Button>
                <Button variant="outline" className="w-full" disabled={pending}>
                    Login with Google
                </Button>
            </form>
        </Form>
    );
};
export default LoginForm;
