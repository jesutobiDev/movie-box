import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchForMovies } from '../../api-calls/fetchMovies';

export const searchMovies = createAsyncThunk(
  'searchMovies/searchMovies',
  async ({ query, page }) => {
    const response = await searchForMovies(query, page);
    return response;
  }
);

export const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState: {
    results: [],
    query: '',
    currentPage: 1,
    totalPages: 1,
    status: 'loading',
    error: null,
  },
  reducers: {
    resetSearch: (state) => {
      state.results = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.status = 'idle';
    },
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
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetSearch, incrementPage, decrementPage } = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
