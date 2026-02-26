import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <h1>Home</h1>

      <h3>This app allows you to search and filter movies</h3>

      <div>
        <Link to="/movies">
          <button>Movies</button>
        </Link>

        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      </div>
    </div>
  )
}

export default Home