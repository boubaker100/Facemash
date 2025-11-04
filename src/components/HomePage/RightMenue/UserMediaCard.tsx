
import Image from "next/image";
import Link from "next/link";
import { dataPhoto } from "@/data/dataPhoto";
import prisma from "@/libs/client";
import { User } from "@prisma/client";

const UserMediaCard = async ({ user }: { user?: User }) => {


  const postWithMedia = await prisma.post.findMany({
    where: {
      userId: user?.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc"
    },

  });

  if (!postWithMedia) return null;

  return (
    <div className="p-4 bg-white w-full rounded-lg shadow-md text-sm flex flex-col ">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 mb-2">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-1  flex-wrap">


        {postWithMedia.length === 0 ? dataPhoto.map((post) => (
          <div className="relative w-24 h-24" key={post.name} >
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )) :

          postWithMedia.map((post) => (
            <div className="relative w-24 h-24"  key={post.id} >
              <Image
                src={post.img!}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))

        }
      </div>
    </div>
  );
};

export default UserMediaCard;