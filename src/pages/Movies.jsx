import { useEffect, useRef, useState } from "react"
import "../style/Movies.css"
import { searchMovies } from "../api/omdb";
import SearchBar from "../components/Searchbar.jsx";
import SortSelect from "../components/SortSelect.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

function Movies() {
  const [input, setInput] = useState("")
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

    const trimmed = input.trim()
    if (!trimmed) {
      clearTimeout(debouncedRef.current)
      setQuery("")
      setMovies([])
      setError("")
      return
    }
    clearTimeout(debouncedRef.current)
    debouncedRef.current = setTimeout(() => {
      setQuery(trimmed)
    }, 200)

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

      <SearchBar
        inputRef={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      {/* <SortSelect
        sortBy={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      /> */}
      
      {!query && <p>Type in film title.</p>}
      {loading && <p>Loading movies...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found for this query.</p>
      )}

      <MovieGrid movies={movies} />
    </div>
  )

}

export default Movies;