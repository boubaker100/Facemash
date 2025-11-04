import React, { Suspense } from 'react'
import FreindRequest from './FreindRequest'
import Birthdays from './Birthdays'
import Ad from '../Ad'
import UserMediaCard from './UserMediaCard'
import UserInfoCard from './UserInfoCard'
import { User } from '@prisma/client'

const RightMenue = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6 '>
      {user ? ( 
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfoCard user={user} />  
            </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <UserMediaCard user={user} />
            </Suspense>
        
        </>
      ) : null}
      <FreindRequest />
      <Birthdays />
      <Ad size="md" />
    </div>
  )
}

export default RightMenue