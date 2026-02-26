import { useEffect, useRef, useState } from "react"
import "../style/Movies.css"
import { searchMovies } from "../api/omdb";

function Movies() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("") 

  const debouncedRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    clearTimeout(debouncedRef.current)
    debouncedRef.current = setTimeout(() => {
      setQuery(input.trim())
    }, 300)

    return () => clearTimeout(debouncedRef.current);
  }, [input])

  useEffect(() => {
    if(!query){
      setMovies([]);
      setError("")
      return;
    }

    const controller = new AbortController();

    async function run(){
      setLoading(true)
      setError("")
      try{
        const json = await searchMovies(query, controller.signal)

        if(json.Response === "False"){
          setMovies([]);
          setError(json.Error || "No movies found.")
        }else{
          setMovies(json.Search || []);
        }
      }catch (e){
        if(e.name !== "AbortError")
          setError("Sth went wrong, try again later")
        }finally{
         setLoading(false)
        } 
    }
    run()
    return () => controller.abort()

  }, [query])

  return (
    <div>
      <h1 className="movies-title">Movies</h1>

      <input
        ref = {inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
      />
      
      {!query && <p>Type in film title.</p>}
      {loading && <p>Loading movies...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found for this query.</p>
      )}

      <div className="movies-grid">
        {movies.map((m) => (
          <div key={m.imdbID} className="movie-card">
            {m.Poster && m.Poster !== "N/A" ? (
              <img src={m.Poster} alt={m.Title} style={{width: "100%"}}/>
            ) : (
              <div style={{width: "100%", aspectRatio: "2/3"}}>No poster</div>
            )}
            <p>{m.Title}</p>
            <p>{m.Year}</p>
          </div>
        ))}
      </div>
    </div>
  )

}

export default Movies;