"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  useEffect(() => {}, []);
  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={160} height={160} />
        </Link>
        <ul className="hidden md:flex gap-10">
          <Link href="/">
            <li
              className={`hover:text-primary font-medium cursor-pointer text-sm ${
                path === "/" && "text-primary"
              }`}
            >
              For Sell
            </li>
          </Link>
          <Link href="/rent">
            <li
              className={`hover:text-primary font-medium cursor-pointer text-sm ${
                path === "/rent" && "text-primary"
              }`}
            >
              For Rent
            </li>
          </Link>
          <Link href="/agent-finder">
            <li
              className={`hover:text-primary font-medium cursor-pointer text-sm ${
                path === "/agent-finder" && "text-primary"
              }`}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <Link href={"/add-new-listing"} className="hidden md:block">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" /> Post Your Ad
          </Button>
        </Link>
        <Link href={"/add-new-listing"} className="md:hidden">
          <Button className="h-15 w-12">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={user?.imageUrl}
                alt="profile"
                className="rounded-full"
                width={35}
                height={35}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/user#/my-listing"}>My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
