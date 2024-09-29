import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = () => {
  const [movies, setMovies] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /* 
  useEffect ini akan bekerja ketika component "List" dipanggil, dengan cttn tidak ada parameter pada param kedua
  dari useEffect ini 
  */
  useEffect(() => {
    // // dummy data
    // setMovies([
    //   {id: 1, title: 'Spongebob', runtime: 145},
    //   {id: 2, title: 'Spongebob #2', runtime: 145},
    //   {id: 3, title: 'Spongebob #3', runtime: 145}
    // ]);

    // using axios
    const fetchMovies = async () => {
      try {
        const result = await axios(`http://localhost:4000/movies`);
        await setMovies(result.data.movies);
        setLoaded(true);
      } catch (error) {
        setErrorMessage(error.response.data);
      }
		};
		fetchMovies();
  }, []);
  
  return (
    <>
      {!loaded ? (
        (() => {
          if (errorMessage) {
						return (
							<div className='row'>
								<p>Oops... {errorMessage}</p>
							</div>
						);
					} else {
						return (
							<div className='row'>
								<p>Loading...</p>
							</div>
						);
					}
        })()
			) : (
        <div className="row">
          {movies.map((movie, index) => (
            <div className="col-sm-4 mb-2" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                  <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default List