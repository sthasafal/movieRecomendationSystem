import { FaTimes, FaStar, FaHeart, FaRegHeart, FaImdb } from 'react-icons/fa';

function Modal({ movie, isFavorite, onToggleFavorite, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm fade-in">
      <div 
        className="relative bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 rounded-full p-2 transition"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
              <button 
                onClick={() => onToggleFavorite(movie.id)}
                className="text-2xl ml-4"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />
                )}
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-yellow-600 text-white px-2 py-1 rounded mr-3">
                <FaImdb className="mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-300">{movie.releaseDate || 'Release date not available'}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
            <p className="text-gray-300 mb-6">{movie.overview || 'No overview available.'}</p>
            
            <div className="flex flex-wrap gap-2">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
                <FaStar />
                <span>Rate this movie</span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;