"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
    <div className="flex min-h-screen w-screen overflow-auto !p-0 !m-0">
    
      <div className="relative hidden lg:block w-1/2">
        <div className="absolute inset-0">
          <Image
            src="/Facemash.jpg"
            alt="Background"
            fill
            className=" object-cover object-center min-h-full"
            priority
          />
          {/* opacity layer */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Facemash</h1>
            <p className="text-lg opacity-80">
              Join our community and start connecting with people.
            </p>
          </div>
        </div>
      </div>

      {/* right side  | form*/}
      <div className="flex w-full lg:w-1/2 justify-center items-start bg-white overflow-auto">
        <div className="w-full max-w-md p-8">
          <SignUp
            appearance={{
              elements: {
                rootBox: "flex justify-center w-full",
                card: "shadow-xl rounded-2xl border border-gray-100",
              },
            }}
          />
        </div>
      </div>
    </div>
    </>
  );
}
