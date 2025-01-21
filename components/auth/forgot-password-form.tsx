"use client";

import { forgotPassword } from "@/actions/auth/forgot-password.action";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/lib/validation/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPasswordForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const [pending, setPending] = useTransition();
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
        setError("");
        startTransition(async () => {
            forgotPassword(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data?.error);
                    } else {
                        setSuccessMessage("An email has been sent, please check your inbox");
                    }
                });
        });
    };

    if (successMessage) {
        return <FormSuccess message={successMessage} />;
    }

    return (
        <Form {...form}>
            {error && <FormError message={error} />}
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"john.doe@mail.com"} type="email" disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={pending}>
                    Reset password
                </Button>
            </form>
        </Form>
    );
};
export default ForgotPasswordForm;
