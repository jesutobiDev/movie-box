import axios from 'axios';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseUrl}movie/popular`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1,
        region: 'AE',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};



export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${baseUrl}movie/${movieId}`, {
      params: {
        api_key: apiKey,
        external_source: 'imdb_id',
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details by IMDb ID:", error);
    throw error;
  }
};
