import { useState } from 'react'
import './style/App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/movies' element={<Movies />}/>
      <Route path='/movies/:id' element={<MovieDetail />}/>
      <Route path='/favorites' element={<Favorites />}/>
      <Route path='/not-found' element={<NotFound />}/>
    </Routes>
  )
}

export default App
