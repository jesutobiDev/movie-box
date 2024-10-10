'use client';
import React, { useEffect } from 'react';
import PopularMovies from './components/PopularMovies';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from './redux/slices/movieSlice';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Loading from './components/Loading';
import NotFound from './not-found';
import BackdropSlider from './components/BackdropSlider';

export default function Home() {
  const { movies, currentPage, status } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(currentPage));
}, [currentPage, dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <NotFound/>;
  }

  if (status === 'succeeded') {
    const backdropMovies = movies.slice(0, 5);

    return (
      <div className="">
        <Hero />
        <BackdropSlider movies={backdropMovies} />
        <PopularMovies movies={movies} />
        <Footer />
      </div>
    );
  }

}
