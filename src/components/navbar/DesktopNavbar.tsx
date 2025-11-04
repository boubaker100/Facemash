"use client";
import Link from "next/link";
import { UserIcon, HomeIcon, UserGroupIcon, NewspaperIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import IconPage from "./Icon";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { UserCircle, Bell, MessageCircleMore } from "lucide-react";

export default function DesktopNavbar() {
  return (
    <div className="hidden md:flex justify-around items-center max-w-7xl mx-auto px-6 py-3">
      {/* Left */}
      <IconPage />

      {/* Center */}
      <div className="flex space-x-6">
        <Link href="/" className="flex items-center space-x-1 hover:text-blue-600">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link href="/friends" className="flex items-center space-x-1 hover:text-blue-600">
          <UserGroupIcon className="h-5 w-5" />
          <span>Friends</span>
        </Link>
        <Link href="/stories" className="flex items-center space-x-1 hover:text-blue-600">
          <NewspaperIcon className="h-5 w-5" />
          <span>Stories</span>
        </Link>
        <div className="hidden rounded-full xl:flex bg-slate-100 p-2 items-center ">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none" />
        </div>

      </div>

      {/* Right */}


      <ClerkLoading>
        <div
          className="float-right right-4 inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-blue-200 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="flex space-x-4">
          <SignedOut>
            <div className="cursor-pointer flex ">
              <UserCircle className="w-5 relative " />
              <Link href="/sign-in" className="hover:text-blue-600">Login/</Link>
              <Link href="/sign-up" className="hover:text-blue-600">Register</Link>
            </div>

          </SignedOut>

          <SignedIn>

            <div className="cursor-pointer justify-center  items-center flex space-x-6 ">
              <Link href="/groups">  <UserGroupIcon className="h-6 w-6  hover:text-blue-600" /></Link>
              <MessageCircleMore className="h-5 w-5 hover:text-blue-600" />
              <Bell className="h-5 w-5 hover:text-blu5-600" />
              <UserButton />

            </div>

          </SignedIn>
        </div>
      </ClerkLoaded>





    </div>
  );
}
