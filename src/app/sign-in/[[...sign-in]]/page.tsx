import { SignIn } from '@clerk/nextjs'
import Image from 'next/image';

export default function Page() {

  return (
    <>
     
      <Image    
        src="/Facemash.jpg"
        alt="logo"
        fill
        className="w-auto h-auto object-cover"   

      />  
      
   
      <div className="relative top-28  flex justify-center items-center  ">
      <SignIn />
      </div>
      </>
  );
}