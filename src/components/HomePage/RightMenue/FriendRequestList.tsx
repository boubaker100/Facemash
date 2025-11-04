"use client";
import Link from "next/link";
import { acceptFollowRequest, declineFollowRequest } from "@/libs/action";

import Image from "next/image";
import { useOptimistic, useState } from "react";
import { FollowRequest, User } from "@prisma/client";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {

  const [requestState, setRequestState] = useState(requests);
  
const accept = async (requestId: number, senderId: string) => {
    
    removeOptimisticRequest(requestId);   

try { 
      setRequestState((prev) => prev.filter((request) => request.id !== requestId));
      await acceptFollowRequest(senderId); 
} catch (error) {
  
  throw new Error("Failed to accept request"); 
}
}
const decline = async (requestId: number, senderId: string) => {
    
    removeOptimisticRequest(requestId);
try {
      setRequestState((prev) => prev.filter((request) => request.id !== requestId));
      await declineFollowRequest(senderId);

} catch (error) {
  throw new Error("Failed to decline request");
}
}

  const[ optimisticRequests,removeOptimisticRequest ]= useOptimistic(
    requestState, 
    (state, value: number ) => 
    state.filter((request) => request.id !== value)
  );




  return (
    <div>
      {optimisticRequests.map((request) => (
        <div className="flex items-center justify-between my-2" key={request.id}>
         <Link href={`/profile/${request?.sender?.username}`}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-center object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          </Link>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;