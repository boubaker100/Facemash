"use client";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";

export const UpdateButton = () => {
  const { pending } = useFormStatus();


  return (
    <button
    
      disabled={pending}
    
      className="bg-blue-500 text-white py-2 rounded-md mt-6 w-full font-medium
     hover:bg-blue-600 disabled:bg-blue-300 transition"
    >
    {pending ? "Saving..." : "Save"}
      
    </button>
  );
};
