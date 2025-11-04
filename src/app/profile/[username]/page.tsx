import Feed from '@/components/HomePage/Feeds/Feed'
import LeftMenue from '@/components/HomePage/LeftMenue/LeftMenue'

import RightMenue from '@/components/HomePage/RightMenue/RightMenue'
import prisma from '@/libs/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'
import { notFound } from "next/navigation"


const ProfilePage = async ({ params }: { params: { username: string } }) => {

  const { username } = await params;

  if (!username) {
    notFound();
  }

  const user = await prisma.user.findFirst({
    where: {
    username,
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        }
      }
    }
  })
  if(!user){
    return null;
  }
  
  const { userId: currentUserId } = await auth();
  
  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user?.id,
        blockedId: currentUserId,

      }
    })

   
    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }




  return (
    <div className='flex bg-gray-300 gap-6 top-32'>
      <div className='mt-6 hidden xl:block w-[30%] bg-white p-4 rounded shadow'>
        <LeftMenue type='profile' />
        </div>
      <div className='w-full  lg:w[60%] xl:w[50%] bg-gray-300 p-4 rounded shadow'>
        <div className='flex flex-col gap-6 '>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative overflow-visible">
              <Image
                src={user?.cover || "https://images.unsplash.com/photo-1692302792267-bf29b5ea87d1?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt="profile cover"
                fill
                unoptimized
                className="rounded-md object-cover"
              />
              <Image
                src={user?.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {(user?.name && user.surname) ? user.name + " " + user.surname : user?.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user?._count?.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user?._count?.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user?._count?.following}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed username={user.username}/>
        </div>
      </div>
      <div className='hidden lg:block w-[50%] mt-6'><RightMenue user={user} /></div>

    </div>
  )
}

export default ProfilePage