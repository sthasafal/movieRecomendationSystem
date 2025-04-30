import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Modal from '../components/Modal';
import { FaSearch, FaSignOutAlt, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';

const API_KEY = '862fa7e3a987582144758e1d69614d71';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    
    // Load trending movies on first render
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      
      const formatted = (data.results || []).slice(0, 10).map((m) => ({
        id: m.id,
        title: m.title,
        posterUrl: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image',
        rating: m.vote_average,
        overview: m.overview,
        releaseDate: m.release_date,
      }));
      
      setTrendingMovies(formatted);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();

      const formatted = (data.results || []).map((m) => ({
        id: m.id,
        title: m.title,
        posterUrl: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image',
        rating: m.vote_average,
        overview: m.overview,
        releaseDate: m.release_date,
      }));

      setMovies(formatted);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  const toggleFavorite = (movieId) => {
    let updatedFavorites;
    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter(id => id !== movieId);
    } else {
      updatedFavorites = [...favorites, movieId];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="dashboard">
      {/* top nav */}
      <nav className="navbar">
        <div className="logo">CineMatch</div>
        <form
    onSubmit={e => {
      e.preventDefault();
      handleSearch(e);
    }}
    style={{ flex: 1, display: 'flex', margin: '0 1rem' }}
  >
    <input
      type="text"
      placeholder="Search for movies..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      style={{ flex: 1 }}
    />
    <button
      type="submit"
      style={{
        background: 'var(--primary)',
        border: 'none',
        padding: '0 1rem',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      🔍
    </button>
  </form>

  <button onClick={handleLogout}>Logout</button>
</nav>

      {/* push page content below the nav bar */}
      <div className="main-content">
        {/* Trending row */}
        <div className="section">
          <h2><span className="icon">★</span>Trending This Week</h2>
          <div className="movie-grid">
            {trendingMovies.map(m => (
              <MovieCard
                key={m.id}
                movie={m}
                isFavorite={favorites.includes(m.id)}
                onToggleFavorite={() => toggleFavorite(m.id)}
                onViewDetails={() => {
                  setSelectedMovie(m);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Search results row (only if you’ve searched) */}
        {movies.length > 0 && (
          <div className="section">
            <h2><span className="icon">🔍</span>Search Results</h2>
            <div className="movie-grid">
              {movies.map(m => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  isFavorite={favorites.includes(m.id)}
                  onToggleFavorite={() => toggleFavorite(m.id)}
                  onViewDetails={() => {
                    setSelectedMovie(m);
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* modal */}
      {showModal && selectedMovie && (
        <Modal 
          movie={selectedMovie}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={() => toggleFavorite(selectedMovie.id)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
export default Dashboard;