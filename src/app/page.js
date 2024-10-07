'use client';
import React, { useEffect } from 'react';
import PopularMovies from './components/PopularMovies';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from './redux/slices/movieSlice';
import BackdropSlider from './components/BackdropSlider';
import Footer from './components/Footer';
import Loading from './components/Loading';
import NotFound from './not-found';

export default function Home() {
  const { movies, status, error } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <NotFound/>;
  }

  if (status === 'succeeded') {
    const backdropMovies = movies.slice(0, 5);

    return (
      <div>
        <BackdropSlider movies={backdropMovies} />
        <PopularMovies movies={movies} />
        <Footer />
      </div>
    );
  }

}
