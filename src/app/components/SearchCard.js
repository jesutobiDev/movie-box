import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SearchCard = ({movie}) => {
  return (
    <Link href={`/${movie.id}`} className="flex gap-2 py-4 hover:bg-white/10 transition-all duration-300 ease-in-out">
        {/* thumbnail */}
        <div className="w-20 h-20 relative rounded-lg overflow-hidden" >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        <p className="text-white font-medium flex-1">{movie.title}</p>
    </Link>
  )
}

export default SearchCard