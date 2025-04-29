import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Modal from '../components/Modal';

const API_KEY = '862fa7e3a987582144758e1d69614d71';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Movie Recommender</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto mb-10">
        <input
          type="text"
          className="flex-grow p-3 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-blue-500 font-semibold">Loading…</p>}
      {!loading && movies.length === 0 && (
        <p className="text-center text-gray-500">No movies found. Try another search!</p>
      )}

      <div className="flex flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onViewDetails={(movie) => {
              setSelectedMovie(movie);
              setShowModal(true);
            }}
          />
        ))}
      </div>

      {showModal && selectedMovie && (
        <Modal movie={selectedMovie} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Dashboard;
