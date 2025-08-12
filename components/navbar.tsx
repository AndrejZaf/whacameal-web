"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { BadgeCheck, LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface NavigationItem {
  href: string;
  label: string;
  hidden?: boolean;
}

const Navbar = () => {
  const { data } = authClient.useSession();
  const router = useRouter();
  const navigation: NavigationItem[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      hidden: !data?.user,
    },
    {
      href: "/explore",
      label: "Explore",
    },
    {
      href: "/ai-chef",
      label: "AI Chef",
    },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 md:py-0 bg-[#627AF7] dark:bg-gray-800">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bg-[#627AF7]"
          >
            <MenuIcon className="text-white h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#627AF7]" side="left">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <div className="grid p-4">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-all delay-75 text-white uppercase text-lg py-2 font-semibold border-b-4 border-transparent hover:border-white"
              >
                <div>{item.label}</div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2">
        <img alt="Whac a meal" src="/whc_logo.svg" />
      </Link>
      <div className="hidden md:flex gap-4">
        {navigation
          .filter((item) => !item.hidden)
          .map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-all delay-75 text-white uppercase text-lg py-2 font-semibold border-b-4 border-transparent hover:border-white"
            >
              <div>{item.label}</div>
            </Link>
          ))}
      </div>
      <div className="flex">
        {data && data.user ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={data.user.image ?? "https://github.com/shadcn.png"}
                  alt="User profile image"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem>
                <Link href="/account">
                  <div className="flex text-sm gap-2 items-center justify-start">
                    <BadgeCheck size={16} />
                    Account
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  authClient.signOut();
                  router.push("/");
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
