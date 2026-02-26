function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
    </div>
  )
}

export default MovieCard