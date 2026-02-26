function MovieCard({ movie }) {
  return (
    <div key={movie.id} className="movie-card">
      <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
      <p>{movie.Title}</p>
      <p>{movie.Year} {movie.Rating}</p>
    </div>
  )
}

export default MovieCard