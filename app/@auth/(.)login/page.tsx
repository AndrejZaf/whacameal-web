"use client";

import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const LoginInterceptor = () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <LoginForm />
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default LoginInterceptor;
