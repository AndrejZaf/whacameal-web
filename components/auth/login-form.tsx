"use client";

import { login } from "@/actions/auth/login.action";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
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
                    setError(data?.error);
                });
        });
    };

    return (
        <Form {...form}>
            {error && <FormError message={error} />}
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"john.doe@example.com"} type="email" disabled={pending} />
                        </FormControl>
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
