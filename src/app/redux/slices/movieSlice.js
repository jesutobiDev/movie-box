import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, fetchMovieById, searchForMovies } from '../../api-calls/fetchMovies';

// Thunk to fetch popular movies
export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (page = 1) => {
    const response = await fetchPopularMovies(page);
    return response;
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

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }) => {
    const response = await searchForMovies(query, page);
    return response;
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movie: null,
    searchResults: [],
    currentPage: 1,
    totalPages: 1,
    searchStatus: 'idle',
    status: 'idle',
    error: null,
  },
  reducers: {
    resetSearch: (state) => {
      state.searchResults = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.searchStatus = 'idle';
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    decrementPage: (state) => {
      state.currentPage -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular movies
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Movie by ID
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
      })
      
      // Search for movies
      .addCase(searchMovies.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetSearch, incrementPage, decrementPage } = movieSlice.actions;

export default movieSlice.reducer;
