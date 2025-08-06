"use client";

import { verificationRequest } from "@/actions/auth/verification-request.action";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "@/lib/validation/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [verificationError, setVerificationError] = useState<
    boolean | undefined
  >();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    const data = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });
    if (data.error?.code) {
      if (data.error.code === "EMAIL_NOT_VERIFIED") {
        setVerificationError(true);
      }
      setError(data.error.message);
    }
  };

  const requestEmailVerification = async () => {
    setError("");
    await verificationRequest(form.getValues().email);
    setSuccessMessage(
      "A verification email has been sent, please check your inbox."
    );
  };

  if (successMessage) {
    return <FormSuccess message={successMessage} />;
  }

  return (
    <Form {...form}>
      {error && <FormError message={error} />}
      {verificationError && (
        <Button
          onClick={requestEmailVerification}
          variant="secondary"
          className="w-full"
        >
          Request verification email
        </Button>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={"john.doe@example.com"}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input {...field} placeholder="********" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
