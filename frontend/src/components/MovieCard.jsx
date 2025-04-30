// MovieCard.jsx
export default function MovieCard({ movie, isFavorite, onToggleFavorite, onViewDetails }) {
  return (
    <div
      onClick={onViewDetails}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{
          width: '100%',
          height: '370px',
          objectFit: 'cover',
          borderRadius: '0.5rem',
        }}
      />
      <div style={{ marginTop: '0.5rem' }}>
        <div
          style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={movie.title}
        >
          {movie.title}
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: '#bbb',
          }}
        >
          ⭐ {movie.rating?.toFixed(1) || 'N/A'}
        </div>
      </div>
    </div>
  );
}
