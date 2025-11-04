import { NewspaperIcon } from '@heroicons/react/24/outline'
import React from 'react'

const IconPage = () => {
  return (
   <div>
        <div className="flex items-center space-x-2">
        <NewspaperIcon className="h-8 w-8 text-blue-600" />
        <span className="font-bold text-xl">Facemash</span>
      </div>
   </div>
  )
}

export default IconPage