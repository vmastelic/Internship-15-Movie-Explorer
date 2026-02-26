import MovieCard from "./MovieCard"

function MovieGrid({ movies }) {
  const visible = movies.filter((m) => m.Poster && m.Poster !== "N/A")

  return (
    <div className="movies-grid">
      {visible.map((m) => (
        <div key={m.imdbID}>
          <MovieCard movie={m} />
        </div>
      ))}
    </div>
  )
}

export default MovieGrid