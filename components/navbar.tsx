"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { BadgeCheck, LogOut, MenuIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const navigation = [
    {
        href: "/home",
        label: "Home"
    },
    {
        href: "/recipes",
        label: "Recipes"
    },
    {
        href: "/explore",
        label: "Explore"
    },
    {
        href: "/dashboard",
        label: "Dashboard"
    }
];

const Navbar = () => {
    const session = useSession();
    return (
        <div className="flex items-center justify-between px-4 py-2 md:py-0 bg-[#627AF7] dark:bg-gray-800">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden bg-[#627AF7]">
                        <MenuIcon className="text-white h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-[#627AF7]" side="left">
                    <VisuallyHidden>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                    </VisuallyHidden>
                    <div className="grid p-4">
                        {navigation.map((item) =>
                            <Link key={item.label} href={item.href}
                                  className="transition-all delay-75 text-white uppercase text-lg py-2 font-semibold border-b-4 border-transparent hover:border-white">
                                <div>
                                    {item.label}
                                </div>
                            </Link>)}
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
                <img alt="Whac a meal" src="./whc_logo.svg" />
            </Link>
            <div className="hidden md:flex gap-4">
                {navigation.map((item) =>
                    <Link key={item.label} href={item.href}
                          className="transition-all delay-75 text-white uppercase text-lg py-2 font-semibold border-b-4 border-transparent hover:border-white">
                        <div>
                            {item.label}
                        </div>
                    </Link>)}
            </div>
            <div className="flex">
                {session.data?.user ? <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side="bottom"
                            align="end"
                            sideOffset={4}>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> :
                    <Link href="/login">
                        <Button variant="default">Login</Button>
                    </Link>
                }
            </div>
        </div>
    );
};
export default Navbar;
