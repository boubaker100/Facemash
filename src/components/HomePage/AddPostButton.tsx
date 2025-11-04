"use client";

import { useFormStatus } from "react-dom";

const AddPostButton = () => {
 const{pending}=useFormStatus();
 return(
    <button disabled={pending} className=" bg-slate-800 text-white px-2 py-0.5 rounded-md text-xs  disabled:bg-slate-300 transition">
    {pending ? "Adding..." : "Add Post"}
    </button>
 )
}
export default AddPostButton