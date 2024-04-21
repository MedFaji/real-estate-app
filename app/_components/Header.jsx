"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  useEffect(() => {}, []);
  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Image src="/logo.svg" alt="Logo" width={160} height={160} />
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
          <Link href="/forrent">
            <li
              className={`hover:text-primary font-medium cursor-pointer text-sm ${
                path === "/forrent" && "text-primary"
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
      <div className="flex gap-4 items-center">
        <Link href={"/add-new-listing"}>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" /> Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton />
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
