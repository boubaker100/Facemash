
import prisma from '@/libs/client'
import CommentList from './CommentList'

const Comments =async ({postId ,postUserId}:{postId:number,postUserId:string}) => {
 

  const Comments= await prisma.comment.findMany({
    where:{postId,},
    include:{user:true},
  })
   
    return (
        <div >
            <CommentList postUserId={postUserId} key={postId} comments={Comments} postId={postId}/>
        </div >
    
    )
}

export default Comments