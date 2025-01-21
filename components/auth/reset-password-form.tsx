"use client";

import { resetPassword } from "@/actions/auth/reset-password.action";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/lib/validation/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordForm = ({ tokenId }: { tokenId: string }) => {
    const [error, setError] = useState<string | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const [pending, setPending] = useTransition();
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError("");
        startTransition(async () => {
            resetPassword(tokenId, values)
                .then((data) => {
                    if (data?.error) {
                        setError(data?.error);
                    } else {
                        setSuccessMessage("The password has been changed successfully, use the link down below to redirect yourself to the login screen");
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
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"********"} type="password" disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"********"} type="password" disabled={pending} />
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
export default ResetPasswordForm;
