import { useEffect, useState, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getMovieById } from "../api/omdb"
import { useLocalStorage } from "../hooks/useLocalStorage"

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [favorites, setFavorites] = useLocalStorage("favorites", [])
  
  const isFavorite = useMemo(
    () => favorites.includes(id),
    [favorites, id]
  )
  
  function toggleFavorite() {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      return [...prev, id]
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    async function run() {
      setLoading(true)
      setError("")
      try {
        const json = await getMovieById(id, controller.signal)
        if (json.Response === "False") setError(json.Error || "Not found")
        else setMovie(json)
      } catch (e) {
        if (e.name !== "AbortError") setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => controller.abort()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!movie) return null

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt="" />
      <p>
        {movie.Year} ⭐ {movie.imdbRating}
      </p>
      <p>{movie.Genre}</p>
      <p>{movie.Plot}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  )
}

export default MovieDetail