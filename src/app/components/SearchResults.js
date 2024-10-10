import React from 'react'
import SearchCard from './SearchCard'

const SearchResults = ({ results }) => {
    return (
        <div className="bg-transparent border-[1.4px] px-4 rounded-lg ml-auto  overflow-y-auto max-h-[340px] md:max-h-[400px] lg:max-h-[400px] divide-y-2">
                {results.map((movie) => (
                    <SearchCard key={movie.id} movie={movie} />
                ))}
        </div>
    );
};

export default SearchResults;