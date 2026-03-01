import MovieCard from "../MovieCard/MovieCard"
import styles from "./MovieGrid.module.css"

function MovieGrid({ movies }) {
  const visible = movies.filter((m) => m.Poster && m.Poster !== "N/A")

  return (
    <div className={styles.grid}>
      {visible.map((m) => (
        <div key={m.imdbID}>
          <MovieCard movie={m} />
        </div>
      ))}
    </div>
  )
}

export default MovieGrid