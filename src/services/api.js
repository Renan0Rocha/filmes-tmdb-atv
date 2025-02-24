import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const searchMovies = async (query, page = 1) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query, page },
      });
      return response.data; 
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return { results: [], total_pages: 1 };
    }
  };
  
  

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
};

export default api;
