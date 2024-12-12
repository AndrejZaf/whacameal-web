import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-4  bg-[#627AF7] dark:bg-gray-800">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
                <img alt="Whac a meal" src="./whc_logo.svg" />
            </Link>
            <div className="hidden md:flex gap-4 text-white uppercase">
                <Link href="#" className="text-lg py-2 font-semibold hover:underline underline-offset-4" prefetch={false}>
                    Home
                </Link>
                <Link href="#" className="text-lg py-2 font-semibold hover:underline underline-offset-4" prefetch={false}>
                    About
                </Link>
                <Link href="#" className="text-lg py-2 font-semibold hover:underline underline-offset-4" prefetch={false}>
                    Services
                </Link>
                <Link href="#" className="text-lg py-2 font-semibold hover:underline underline-offset-4" prefetch={false}>
                    Portfolio
                </Link>
                <Link href="#" className="text-lg py-2 font-semibold hover:underline underline-offset-4" prefetch={false}>
                    Contact
                </Link>
            </div>
            <div className="hidden md:flex">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid w-[200px] p-4">
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4"
                              prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4"
                              prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4"
                              prefetch={false}>
                            Services
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4"
                              prefetch={false}>
                            Portfolio
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4"
                              prefetch={false}>
                            Contact
                        </Link>
                        <div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
export default Navbar;
