import axios from 'axios';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${baseUrl}movie/popular`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: page,
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

export const searchForMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${baseUrl}search/movie`, {
      params: {
        api_key: apiKey,
        query: query,
        language: 'en-US',
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for movies:", error);
    throw error;
  }
};

