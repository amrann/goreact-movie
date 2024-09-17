import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const List = () => {
  const [movies, setMovies] = useState([])

  /* 
  useEffect ini akan bekerja ketika component "List" dipanggil, dengan cttn tidak ada parameter pada param kedua
  dari useEffect ini 
  */
  useEffect(() => {
    setMovies([
      {id: 1, title: 'Spongebob', runtime: 145},
      {id: 2, title: 'Spongebob #2', runtime: 145},
      {id: 3, title: 'Spongebob #3', runtime: 145}
    ]);
  }, [])
  

  return (
    <div className="row">
      {movies.map((movie, index) => (
        <div className="col-sm-4 mb-2" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
              {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
              <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List