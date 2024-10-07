import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen absolute top-0 left-0 flex-col space-y-5">
        <p className="text-9xl font-semibold">404</p>
        <p className="font-medium text-xl italic opacity-50">Resource not found</p>
        <Link href="/" className=" px-4 py-2 bg-black text-white">Go back home</Link>
    </div>
  )
}

export default NotFound