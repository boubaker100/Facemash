import { dataPhoto } from "@/data/dataPhoto";
import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
    const { userId } = await auth();
    console.log("User ID:", userId);
    // Log the user ID to verify it's being retrieved correctly
    if (!userId) {
        return null; // or a loading state, or a prompt to log in
    }
    const user = await prisma.user.findFirst({
        where: { id: userId },
        include: {
            _count: {
                select: {
                    followers: true,

                }
            }
        }
    },
    );
    console.log("User Data:", user);



    return (
        <div className="bg-white p-5 rounded-lg shadow-md text-sm flex flex-col gap-6">
            <div className="overflow-visible h-20 relative">
                <Image
                    src={"https://images.unsplash.com/photo-1692302792267-bf29b5ea87d1?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="cover"
                    fill
                    unoptimized
                    className="rounded-md object-cover"
                />
                <Image
                    src={user?.avatar || "/noAvatar"}
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
                />
            </div>
            <div className="h-24 overflow-visible flex flex-col gap-2 items-center">
                <span className="font-semibold overflow-hidden">
                    {(user?.name && user.surname) ? user.name + " " + user.surname : user?.username}
                </span>
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        {dataPhoto.slice(0, 4).map((folow, index) =>
                            <Image
                                key={index}
                                src={folow.img}
                                alt=""
                                width={12}
                                height={12}
                                className="rounded-full object-cover w-3 h-3"
                            />
                        )}
                        <span className="flex text-xs text-gray-500">
                            +
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">
                        {user?._count.followers} Followers
                    </span>
                </div>
                <Link href={`/profile/${user?.username}`}>
                   
                  <button  className=" overflow-visible bg-blue-500 text-white text-xs p-2 rounded-md">
                        My Profile
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;