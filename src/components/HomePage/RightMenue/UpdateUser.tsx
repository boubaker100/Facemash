"use client"
import { updateProfile } from "@/libs/action";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
 import React, { useActionState, useState } from 'react';
import { UpdateButton } from "./UpdateButton";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover ,setCover] =useState<any>(false);
  const router = useRouter();

   const handleClose=()=>{
    setOpen(false);
    state.success && router.refresh();
   } 
  
  const [state, formAction] = useActionState(updateProfile,
     {  success: false,  error:false });

   if (!user) return null;

  return (
    <div>
      {/* زر فتح النافذة */}
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>

      {/* المودال */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
          <form 
          action={(formData) =>
           formAction({formData, cover: cover?.secure_url || "" })
          } 
           className="p-8 bg-white rounded-2xl w-[95%] md:w-2/3 xl:w-1/2 shadow-lg">

            {/* الرأس */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-gray-600 text-lg">
                Update Your Information
              </span>
              <div
                className="cursor-pointer text-gray-700 hover:text-red-500 text-2xl"
                onClick={handleClose}
              >
                ✕
              </div>
            </div>

            {/* الحقول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={user.name || "First Name"}
                className="border p-2 rounded-md focus:outline-blue-500"
                name="name"
              />
              <input
                type="text"
                placeholder={user.surname || "Last Name"}
                className="border p-2 rounded-md focus:outline-blue-500"
                name="surname"
              />
              <input
                type="text"
                placeholder={user.city || "City"}
                className="border p-2 rounded-md focus:outline-blue-500"
                name="city"
              />
              <input
                type="text"
                placeholder={user.work || "Work"}
                className="border p-2 rounded-md focus:outline-blue-500"
                name="work"
              />
              <input
                type="text"
                placeholder={user.school || "School"}
                className="border p-2 rounded-md focus:outline-blue-500"
                name="school"
              />
              <input
                type="text"
                placeholder={user.website || "Website"}
                className="border p-2 rounded-md focus:outline-blue-500"
                name="website"
              />
            </div>

            {/* الوصف */}
            <textarea
              placeholder={user.description || "Description"}
              className="border p-2 rounded-md focus:outline-blue-500 w-full mt-4 h-24"
              name="description"
            ></textarea>

            {/* الصور */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* صورة البروفايل */}
              <div className=" flex-col gap-2">
                <label className="text-gray-500">Profile Image</label>
                <div className='flex-col items-center gap-3'>

                  <input type="file" className="border p-2 rounded-md focus:outline-blue-500" />
                  <Image src={user.avatar || "/noAvatar.png"} alt="" width={64} height={64} className="w-16 h-16 object-cover rounded-ful0l mt-3" />
                </div>
              </div>

              {/* صورة الغلاف */}
              <CldUploadWidget uploadPreset="handbook" onSuccess={(res) => setCover(res.info)}>
                {({ open }) => {
                  return (
                    <div className="flex-col gap-2  " onClick={() => open?.()}>
                      <label className="text-gray-500 ">Cover Picture</label>
                      <div className='flex-col items-center gap-3 mt-5'>
                        <button className="underline text-gray-500 focus:text-blue-500">Change</button>
                        <Image src={user.cover || "/noCover.png"} alt="" width={96} height={64} className=' cursor-pointer w-24 h-16 object-cover rounded-md mt-1' />
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>

            </div>

            {/* زر الحفظ */}
            <UpdateButton /> 
            

            {state.success && <p className="text-green-500 mt-2">Profile has been updated successfully</p>}
            {state.error && <p className="text-red-500 mt-2">Somthing went wrong ! </p>}
        
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
