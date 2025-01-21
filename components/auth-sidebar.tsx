import Link from "next/link";
import React from "react";

const AuthSidebar = () => {
    return (
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-[url('/cover.webp')] bg-cover" />
            <div className="relative z-20 flex items-center text-lg font-medium">
                <Link href="/" className="flex items-center gap-2">
                    <img alt="Whac a meal" src="../whc_logo.svg" />
                </Link>
            </div>
            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-lg">
                        &ldquo;Chefs are nutters. They're all self-obsessed, delicate, dainty, insecure little souls and
                        absolute psychopaths. Every last one of them.
                        .&rdquo;
                    </p>
                    <footer className="text-sm">Gordon Ramsay</footer>
                </blockquote>
            </div>
        </div>
    );
};
export default AuthSidebar;
