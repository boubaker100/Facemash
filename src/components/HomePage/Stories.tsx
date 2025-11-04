"use client";
import { dataPhoto } from "@/data/dataPhoto";
import Image from "next/image";
import React, { useRef } from "react";



const Stories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="mt-12 md:mt-0 relative w-full bg-white p-2 rounded-md">
      {/* أزرار التمرير */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ◀
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ▶
      </button>



      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >

        <div className="flex gap-4 w-max p-2">

          {/* ستوري الإضافة الجديد */}
          <div className="relative mb-14 h-[220px] w-[150px] rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1676586000469-f849c9a06c42?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Add Story"
              fill
              className="object-cover"
            />
            <span className="absolute top-1/3 text-4xl overflow-hidden text-center font-bold text-white">+</span>
            <span className="absolute bottom-1/3 text-lg text-white font-medium">
              Add Story
            </span>
          </div>

          {dataPhoto.map((story, i) => (

            <div
              key={i}
              className="relative h-[220px] w-[150px] rounded-lg overflow-hidden"
            >
              <Image
                src={story.img}
                alt={story.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 right-3 z-10 text-white text-md">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
