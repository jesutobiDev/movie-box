import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, fetchMovieById } from '../../api-calls/fetchMovies';

// Thunk to fetch popular movies
export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async () => {
    const response = await fetchPopularMovies();
    return response.results;
  }
);

// Thunk to fetch a movie by its ID
export const getMovieById = createAsyncThunk(
  'movies/getMovieById',
  async (movieId) => {
    const response = await fetchMovieById(movieId);
    return response;
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movie: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
