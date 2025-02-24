import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import '../styles/movieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(movieId);
      if (!data) {
        setError('Filme não encontrado.');
      } else {
        setMovie(data);
      }
      setLoading(false);
    };
    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p>Filme não encontrado.</p>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Avaliação: {movie.vote_average} / 10</p>
      <Link to="/">Voltar</Link>
    </div>
  );
};

export default MovieDetails;
