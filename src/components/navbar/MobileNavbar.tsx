"use client";
import Link from "next/link";
import { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  NewspaperIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import IconPage from "./Icon";


export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="md:hidden  flex justify-between items-center max-w-7xl mx-auto px-6 py-3">
        <IconPage />
        <div className="gap-3 flex ">
          <UserButton />
          {/* Hamburger Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? (
              <XMarkIcon className="h-7 w-7 text-gray-700" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-gray-700" />
            )}
          </button>

        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}   // enter place 
            animate={{ x: 0 }}        // place to
            exit={{ x: "100%" }}     // exit place
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed w-1/2 h-screen right-0 z-10 text-black bg-gray-100 shadow-lg  justify-center flex items-center"
          >
            <div className="flex flex-col space-y-6 mb-28">
              <Link href="/sign-in" className="hover:text-blue-600">Login</Link>
              <Link href="/sign-up" className="hover:text-blue-600">Register</Link>
              <Link href="/logout" className="hover:text-blue-600">Logout</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t shadow-inner z-40">
        <div className="flex justify-around items-center px-4 py-2">
          <div className="flex space-x-6">
            <Link
              href="/"
              className="flex flex-col items-center hover:text-blue-600"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Link>
            <Link
              href="/friends"
              className="flex flex-col items-center hover:text-blue-600"
            >
              <UserGroupIcon className="h-6 w-6" />
              <span className="text-xs">Friends</span>
            </Link>
            <Link
              href="/stories"
              className="flex flex-col items-center hover:text-blue-600"
            >
              <NewspaperIcon className="h-6 w-6" />
              <span className="text-xs">Stories</span>
            </Link>
            <Link
              href="/search"
              className="flex flex-col items-center hover:text-blue-600"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
              <span className="text-xs">Search</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
