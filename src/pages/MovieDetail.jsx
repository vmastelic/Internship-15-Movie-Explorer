import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getMovieById } from "../api/omdb"

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
    </div>
  )
}

export default MovieDetail