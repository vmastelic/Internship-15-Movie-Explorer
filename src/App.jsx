import styles from './App.module.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Movies from './pages/Movies/Movies'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Favorites from './pages/Favorites/Favorites'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <div className={styles.root}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/movies/:id' element={<MovieDetail />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='/not-found' element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
