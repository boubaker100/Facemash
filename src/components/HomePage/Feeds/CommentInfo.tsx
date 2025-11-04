"use client";
import { deleteComment } from "@/libs/action";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useTransition,useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const CommentInfo = ({
  commentId,
  commentUserId,
  postUserId,
  onDelete,
 
}: {
  commentId: number;
  commentUserId: string;
  postUserId: string;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const { userId: currentUserId } = useAuth();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();

  

  if (!currentUserId) return null;

  const deleteCommentWithId = deleteComment.bind(
    null,
    commentId,
    commentUserId,
    postUserId,
    path
  );

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteCommentWithId();
      onDelete();
    });
  };

  return (
    <div className="relative overflow-visible z-50">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute justify-center items-center top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-50">
          <span className="cursor-pointer">edit</span>

          {(commentUserId === currentUserId || postUserId === currentUserId) && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-red-500 disabled:opacity-50"
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentInfo;
