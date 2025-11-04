"use client";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full md:relative z-50">


      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
}
