const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = "https://www.omdbapi.com/"

export async function searchMovies(query, signal) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
    { signal }
  )
  const json = await res.json()
  return json
}

export async function getMovieById(id, signal) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`,
    { signal }
  )
  const json = await res.json()
  return json
}