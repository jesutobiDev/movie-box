import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import tv from "../../../public/tv.svg"

const Header = () => {
  return (
    <div className = "flex justify-between bg-white/20 backdrop-blur-lg items-center shadow-xl px-5 py-3 sticky top-0 left-0 z-10" >
        {/* logo */}
        <Link href="/" className="flex items-center gap-2 h-auto w-auto">
            <Image src={tv} alt="logo" width={50} height={50} />
            <p  className="text-lg font-medium">Movie Box</p>
        </Link>
    </div>
  )
}

export default Header