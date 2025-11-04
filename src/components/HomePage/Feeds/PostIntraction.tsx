"use client";

import { switchLike } from "@/libs/action";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const  [RandomLikes,setRandomLikes]=useState<number >(0);
   const  [RandomShare,setRandomShare]=useState<number >(0);

  useEffect(() => {
    const randomLikes = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
    setRandomLikes(randomLikes);
  }, []);
   useEffect(() => {
    const randomshare = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
    setRandomShare(randomshare);
  }, []);
  function formatNumber(num:number) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {
       throw new Error("Error liking post");
    }
  };
  return (
    <div className="flex mt-2 items-center justify-between text-sm ">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-gray-100 px-4  py-2 rounded-md">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                width={16}
                height={16}
                alt=""
                className="cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {formatNumber(optimisticLike.likeCount+ RandomLikes)}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-md">
          <Image
            src="/comment.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber}<span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 bg-gray-100 px-4  py-2 rounded-md">
          <Image
            src="/share.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline">{formatNumber(RandomShare)} Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;