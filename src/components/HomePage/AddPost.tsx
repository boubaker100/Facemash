"use client";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/libs/action";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex p-4 bg-white shadow-md rounded-lg gap-4 text-sm">
      {/* AVATAR */}
      <Image
        src={user.imageUrl || "/noAvatar.png"}
        alt="user avatar"
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />

      {/* MAIN SECTION */}
      <div className="flex flex-col flex-1 w-full">
        {/* FORM */}
        <form action={(formData) => addPost(formData, img?.secure_url || "")} className="flex flex-col flex-1">
          {/* textarea */}
          <textarea
            className="p-4 w-full flex-1 rounded-xl border border-gray-300 bg-slate-200 resize-none"
            placeholder="What`s on your mind?"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          {/* ====== الصف الأفقي (زر + خيارات النشر) ====== */}
          <div className="flex items-center justify-between mt-3">
            {/* الخيارات */}
            <div className="flex items-center gap-4">

              <CldUploadWidget
                uploadPreset="handbook"
       
    
                onSuccess={(result: CloudinaryUploadWidgetResults, { widget }) => {
                  console.log("seccess upload picture ", result.info);
                  setImg(result.info);
                  widget.close();
                }}
              >
                {({ open }) => (
                  <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => open?.()}
                  >
                    <Image

                      src="/addimage.png"
                      alt="add image"
                      width={20}
                      height={20}
                      className="w-5 h-5 object-cover"
                    />
                    Photo
                  </div>
                )}
              </CldUploadWidget>

              <div className="flex gap-2 items-center cursor-pointer">
                <Image
                  src="/addvideo.png"
                  alt="add video"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-cover"
                />
                Video
              </div>

              <div className=" flex gap-2 items-center cursor-pointer">
                <Image
                  src="/addevent.png"
                  alt="add event"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-cover"
                />
                Event
              </div>

              <div className="hidden md:flex  gap-2 items-center cursor-pointer">
                <Image
                  src="/poll.png"
                  alt="add poll"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-cover"
                />
                Poll
              </div>
            </div>

            {/* زر الحفظ */}
            <AddPostButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
