"use client";

import LoginForm from "@/components/auth/login-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginInterceptor = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog open={open} onOpenChange={(value) => {
            router.back();
            setOpen(value);
        }}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <LoginForm />
            </DialogContent>
        </Dialog>
    );
};
export default LoginInterceptor;
