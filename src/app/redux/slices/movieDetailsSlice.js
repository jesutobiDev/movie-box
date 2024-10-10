import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovieById } from '../../api-calls/fetchMovies';

// Thunk to fetch a movie by its ID
export const getMovieById = createAsyncThunk(
  'movieDetails/getMovieById',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await fetchMovieById(movieId);
      // If no movie data is found, reject the promise
      // I did this because the api was returning a response for movie search for ids like 5355j, the api returned a respose matching that for the 5355 part. I guess their system has a way of trimming letters from the payload
      if (movieId != response.id) {
        return rejectWithValue('Movie not found');
      }
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    movie: null,
    status: 'loading',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default movieDetailsSlice.reducer;
