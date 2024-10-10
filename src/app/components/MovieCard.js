import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getYear } from '../utilities/dateFormatter';


const MovieCard = ({movie}) => {
  return (
    <Link href={`/${movie.id}`} className="hover:scale-105 transition-all duration-300 ease-in-out max-w-[300px] mx-auto w-full rounded-lg overflow-hidden" >
        {/* Thumbnail */}
        <div className="w-full h-[400px] lg:h-[320px] relative rounded-lg overflow-hidden" >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="mt-2 space-y-2">
          <p className="opacity-50 text-sm font-medium" >{getYear(movie.release_date)}</p>
          <p className="text-lg font-semibold">{movie.title}</p>
        </div>
    </Link>
  )
}

export default MovieCard