import { useEffect, useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { getMovieById } from "../../api/omdb"
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage("favorites", [])
  const [movies, setMovies] = useState([])
  const navigate = useNavigate();
  

  useEffect(() => {
    const controller = new AbortController()

    async function run() {
      const results = await Promise.all(
        favoriteIds.map((id) => getMovieById(id, controller.signal))
      )
      setMovies(results.filter((m) => m && m.Response !== "False"))
    }

    run()
    return () => controller.abort()
  }, [favoriteIds])

  function remove(id) {
    setFavoriteIds((prev) => prev.filter((x) => x !== id))
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Favorites</h1>

      {favoriteIds.length === 0 && <p>No favorites yet.</p>}

      {movies.map((m) => (
        <div key={m.imdbID}>
          <img src={m.Poster} alt="poster" />
          <p>{m.Title} ({m.Year})</p>
          <button onClick={() => remove(m.imdbID)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default Favorites