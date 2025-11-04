
import { auth } from '@clerk/nextjs/server';
import prisma from '@/libs/client';
import Posts from './post';
import Comments from './Comments';
import { SignIn } from '@clerk/nextjs';


export const dynamic = "force-dynamic";

const Feed = async ({ username }: { username?: string }) => {

  const { userId: currentUserId } = await auth();



  let posts: any[] = [];
  // profile
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: { username: username }
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true
          },
        },
        _count: {
          select: {
            comments: true
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  //home page
if (!username) {
  posts = await prisma.post.findMany({
    include: {
      user: true,
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


  return (
   <>
{!currentUserId && (
  <div className="text-gray-800 bg-white p-5 flex items-center justify-center mb-3">
   Please Login to posts and comment or add friends !
  </div>
)}    <div className='p-2 bg-white shadow-md rounded-lg gap-4 text-sm justify-between overflow-visible'>
      {posts.length ? (posts.map(post => (
        <div key={post.id}>
          <Posts post={post} />
          <Comments postUserId={post.user.id} postId={post.id} />
        </div>)
      )) : <div className="text-gray-600 items-center justify-center">No Post To Show ! </div>}


 
    </div>

</>
  )

}

export default Feed