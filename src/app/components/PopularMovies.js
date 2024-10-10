import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPage, decrementPage, getPopularMovies } from '../redux/slices/popularMoviesSlice'; // Updated import
import MovieCard from './MovieCard';
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import Loading from './Loading';

const PopularMovies = ({movies}) => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, status } = useSelector((state) => state.popularMovies);

  // useEffect(() => {
  //   dispatch(getPopularMovies(currentPage));
  // }, [currentPage, dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="px-5 lg:px-10 py-10">
      <p className="mb-5 text-2xl font-semibold">Popular Movies</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-5 mt-5 lg:mt-20">
        <button
          disabled={currentPage === 1}
          onClick={() => dispatch(decrementPage())}
          className="px-4 py-2 border border-black text-black"
        >
          <PiCaretLeftBold className="text-black text-2xl" />
        </button>
        <p className="text-black text-2xl">{currentPage}</p>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => dispatch(incrementPage())}
          className="px-4 py-2 border border-black text-black"
        >
          <PiCaretRightBold className="text-black text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
