import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies } from '../../api-calls/fetchMovies';

// Thunk to fetch popular movies
export const getPopularMovies = createAsyncThunk(
  'popularMovies/getPopularMovies',
  async (page = 1) => {
    const response = await fetchPopularMovies(page);
    return response;
  }
);

export const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    status: 'loading',
    error: null,
  },
  reducers: {
    incrementPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    decrementPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementPage, decrementPage } = popularMoviesSlice.actions;

export default popularMoviesSlice.reducer;
