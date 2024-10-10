import { configureStore } from '@reduxjs/toolkit';
import { popularMoviesSlice } from './slices/popularMoviesSlice';
import { movieDetailsSlice } from './slices/movieDetailsSlice';
import { searchMoviesSlice } from './slices/searchMoviesSlice';

export const store = configureStore({
  reducer: {
    popularMovies: popularMoviesSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    searchMovies: searchMoviesSlice.reducer,
  },
});


export default store;