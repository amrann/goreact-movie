
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Menu from './components/Menu';
import Home from './pages/home';
import Movies from './pages/movies';
import Genres from './pages/genres';
import Admin from './pages/admin';
import ShowMovie from './pages/movies/show';
import ShowMovieGenre from './pages/genres/show';
import MovieForm from './components/movies/Form';

function App() {
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <h1 className='mt-3'>Go-React Movie Project!</h1>
          <hr className='mb-3' />
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <Menu />
          </div>
          <div className='col-sm-10'>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* Penggunaan attribut 'exact' dapat memastikan link yang diakses tidak tertukar dengan /movies */}
              <Route exact path='/movie/:thisId' element={<ShowMovie />} />
              <Route path='/movies/' element={<Movies />} />
              <Route path='/genres' element={<Genres />} />
              <Route exact path='/genres/:thisId/movies' element={<ShowMovieGenre />} />
              <Route path='/admin' element={<Admin />} />
              <Route exact path='/admin/movie/create' element={<MovieForm />}/>
              <Route exact path='/admin/movie/:thisId/edit' element={<MovieForm />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
