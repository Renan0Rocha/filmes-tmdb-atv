import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/api';
import '../styles/home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allMovies, setAllMovies] = useState([]); 

  const handleSearch = async (newPage = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    const data = await searchMovies(query, newPage);
    if (data.results.length === 0) {
      setError('Nenhum filme encontrado.');
    }

    setAllMovies(data.results); 
    setMovies(data.results.slice(0, 10)); 
    setTotalPages(Math.ceil(data.results.length / 10)); 
    setPage(1); 
    setLoading(false);
  };


  const handlePageChange = (newPage) => {
    const startIndex = (newPage - 1) * 10;
    setMovies(allMovies.slice(startIndex, startIndex + 10));
    setPage(newPage);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme"
        />
        <button onClick={() => handleSearch(1)}>Buscar</button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <img 
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
              alt={movie.title} 
            />
            <p><strong>Lançamento:</strong> {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
            <p className="description">{movie.overview.substring(0, 120)}...</p>
            <Link to={`/movie/${movie.id}`} className="details-button">
              Ver Detalhes
            </Link>
          </li>
        ))}
      </ul>

      {/* Paginação */}
      {movies.length > 0 && (
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => handlePageChange(page - 1)}
          >
            ⬅ Página Anterior
          </button>

          <span>Página {page} de {totalPages}</span>

          <button 
            disabled={page >= totalPages} 
            onClick={() => handlePageChange(page + 1)}
          >
            Próxima Página ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
