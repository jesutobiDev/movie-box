'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularMovies } from './redux/slices/popularMoviesSlice';
import Hero from './components/Hero';
import BackdropSlider from './components/BackdropSlider';
import PopularMovies from './components/PopularMovies';
import Footer from './components/Footer';
import Loading from './components/Loading';
import NotFound from './not-found';

export default function Home() {
  const { movies, currentPage, status } = useSelector((state) => state.popularMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies(currentPage));
  }, [currentPage, dispatch]);

  // Display Loading component while fetching movies
  if (status === 'loading') {
    return <Loading />;
  }

  // Display NotFound component if fetching movies failed
  if (status === 'failed') {
    return <NotFound />;
  }

  // Display the main content if movies were successfully fetched
  if (status === 'succeeded' && movies.length > 0) {
    const backdropMovies = movies.slice(0, 5);
    return (
      <div>
        <Hero />
        <BackdropSlider movies={backdropMovies} />
        <PopularMovies movies={movies} />
        <Footer />
      </div>
    );
  }

  // Display a message if no movies were found
  return <div>No movies found.</div>;
}
