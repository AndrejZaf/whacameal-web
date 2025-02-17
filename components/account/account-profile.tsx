"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/lib/validation/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AccountProfile = () => {
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    return (
        <div>
            <Form {...form}>
                <div className="space-y-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"john.doe@example.com"} type="email" />
                        </FormControl>
                        <FormDescription>This is your public display name. It can be your real name or a
                            pseudonym.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"john.doe@example.com"} type="email" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button>Update Profile</Button>
                </div>
            </Form>
        </div>
    );
};
export default AccountProfile;
