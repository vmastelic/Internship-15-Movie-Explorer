import { Link } from "react-router-dom"

function MovieCard({ movie }) {
  return (
    <Link
      className="movie-card"
      to={`/movies/${movie.imdbID}`}
      >
      <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
    </Link>
  )
}

export default MovieCard