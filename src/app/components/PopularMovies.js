import React, { useEffect } from 'react'
import MovieCard from './MovieCard'


const PopularMovies = ({movies}) => {
    return (
        <div className="px-10 mt-[600px]">
            <p className="mb-5 text-2xl font-semibold" >Popular Movies</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10" >
                {
                    movies.length > 0 && movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default PopularMovies