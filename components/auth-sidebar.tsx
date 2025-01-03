import React from "react";

const AuthSidebar = () => {
    return (
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
                <img alt="Whac a meal" src="./whc_logo.svg" />
            </div>
            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-lg">
                        &ldquo;This library has saved me countless hours of work and
                        helped me deliver stunning designs to my clients faster than
                        ever before.&rdquo;
                    </p>
                    <footer className="text-sm">Sofia Davis</footer>
                </blockquote>
            </div>
        </div>
    );
};
export default AuthSidebar;
