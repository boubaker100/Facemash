import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/navbar/Navbar";
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';

const inter = localFont({
  src: './fonts/Inter-VariableFont-opsz-wght.ttf',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Facemash",
  description: "Social media app built with Next.js"

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="w-full bg-gray-200 md:px-4 lg:px-4 xl:px-8 2xl:px-16 ">
            {children}
            <Analytics />
          </div>
        </ClerkProvider>
      </body >
    </html>

  );
}