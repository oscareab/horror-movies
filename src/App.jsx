import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Stats from './pages/Stats';
import Explore from './pages/Explore';
import Search from './pages/Search';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/stats' element={<Stats/>} />
          <Route path='/explore' element={<Explore/>} />
          <Route path='/search/:query' element={<Search/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
