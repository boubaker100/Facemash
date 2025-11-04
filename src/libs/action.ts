"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import z from "zod";
import { revalidatePath } from "next/cache";



export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } =await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (
  prevState: {success:boolean; error:boolean},
  payload: {formData: FormData, cover : string}) => {
  const { formData , cover} = payload;

  const fields=  Object.fromEntries(formData);
    const { userId: currentUserId } = await auth();
    if (!currentUserId)     return {success:false, error:true} ;

  

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => value !== "") 
  );
  
  const profile =z.object({
    name:z.string().max(30).optional(),
    surname:z.string().max(30).optional(),
    city:z.string().max(30).optional(),
    description:z.string().max(160).optional(),
    website:z.string().max(50).optional(),
    work:z.string().max(50).optional(),
    school:z.string().max(50).optional(),
    cover:z.string().max(100).optional(),
    avatar:z.string().max(100).optional(),
  });

  const validatedFields = profile.safeParse({cover, ...filteredFields});

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {success:false, error:true} ;
  }
try {
      await prisma.user.update({
      where: { id: currentUserId },
      data:validatedFields.data,
    });
        return {success:true, error:false} ;
} catch (error) {
  return {success:false, error:true} ;
}
 
 
};
export const switchLike = async (postId: number) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }


  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        postId: postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create
      ({
        data: {
          userId: currentUserId,
          postId: postId,
        },
      });
    }
    
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }

} 

export const addComment = async (desc: string, postId: number) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }


  try {
    const createdComment = await prisma.comment.create({
      data: {
        userId: currentUserId,
        postId: postId,
        desc,
      },
      include: {
        user: true,
      }
    });
    return createdComment;

  } catch (err) {
    throw new Error("somthing went wrong !")
}
}

export const addPost = async(formData: FormData ,  img: string )=>{

  const desc = formData.get("desc")as string;

  const validatedDesc = z.string().min(3).max(160).safeParse(desc); 
  if(!validatedDesc.success){
     
  }
  const { userId: currentUser } = await auth();

  if (!currentUser) {
    throw new Error("User is not Authenticated!!");
  }
 
  try {
     await prisma.post.create({
      data: {
        userId: currentUser,
        desc,
        img,
      },
     
    });
    revalidatePath("/");
  } catch (error) {
    
  }
}
export const deletePost = async(postId: number) => {
  const { userId: currentUserId } = await auth();
    if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }
  try {
    await prisma.post.delete({
      where:{
        id:postId,
        userId:currentUserId
      } 
        

    })
    revalidatePath("/");
    
  } catch (error) {
    console.log(error)
    
  }

}
export const deleteComment = async(commentId: number, commentUserId: string,postUserId:string,path: string) => {
  const { userId: currentUserId } = await auth();
    if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }
  try {
 
    if (commentUserId !== currentUserId && postUserId !== currentUserId )
       {
        throw new Error("User is not Authenticated!!");
       }

await prisma.comment.delete({
   where: { id: commentId },

    })
    revalidatePath(path);
    
  } catch (error) {
    console.log(error)
    
  }

}