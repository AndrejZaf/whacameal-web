import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const SignupForm = () => {
    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="John Doe"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required placeholder="*********" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="password" type="password" required placeholder="*********" />
            </div>
            <Button type="submit" className="w-full">
                Signup
            </Button>
            <Button variant="outline" className="w-full">
                Signup with Google
            </Button>
        </div>
    );
};
export default SignupForm;
