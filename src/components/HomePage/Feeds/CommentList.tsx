"use client";

import { addComment } from "@/libs/action";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState, useEffect } from "react";
import CommentInfo from "./CommentInfo";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
  postUserId
}: {
  comments: CommentWithUser[];
  postId: number;
  postUserId: string;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  // 🧠 هنا نحفظ لايكات عشوائية لكل تعليق مرة واحدة
  const [likesMap, setLikesMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const map: Record<number, number> = {};
    comments.forEach((comment) => {
      map[comment.id] = Math.floor(Math.random() * (100000 )) + 10000;
    });
    setLikesMap(map);
  }, [comments]);

  // 🔢 تنسيق الأرقام (مثلاً 1200 → 1.2k)
  function formatNumber(num: number) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  }

  // 🗑️ لحذف التعليق مباشرة من الواجهة
  const handleDelete = (id: number) => {
    setCommentState((prev) => prev.filter((c) => c.id !== id));
  };

  // ➕ إضافة تعليق جديد
  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending ...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdComment = await addComment(desc, postId);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4 mx-2 my-4 ">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={48}
            height={48}
            className="w-8 h-8 object-cover rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-gray-200 rounded-lg text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent focus outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="mx-2 cursor-pointer"
            />
            <Send
              className="gap-2 cursor-pointer text-blue-600 "
              width={16}
              height={16}
            />
          </form>
        </div>
      )}

      <div className="">
        {optimisticComments.map((comment) => (
          <div
            className="flex gap-4 justify-between my-3 bg-gray-200 rounded-xl p-4 mx-2"
            key={comment.id}
          >
            {/* AVATAR */}
            <Link href={`/profile/${comment.user.username}`}>
              <Image
                src={comment.user.avatar || "noAvatar.png"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>

            {/* DESC */}
            <div className="flex flex-col gap-2 flex-1">
              <Link href={`/profile/${comment.user.username}`}>
                <span className="font-medium cursor-pointer">
                  {comment.user.name && comment.user.surname
                    ? comment.user.name + " " + comment.user.surname
                    : comment.user.username}
                </span>
              </Link>
              <p>{comment.desc}</p>

              {/* ❤️ LIKE SECTION */}
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">
                    {formatNumber(likesMap[comment.id] || 0)} Likes
                  </span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>

            {/* ICON */}
            <CommentInfo
              onDelete={() => handleDelete(comment.id)}
              postUserId={postUserId}
              commentUserId={comment.userId}
              commentId={comment.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
