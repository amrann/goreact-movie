import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function GenreList() {
  const [genres, setGenres] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

	const fetchGenres = async () => {
		try {
			const result = await axios(`http://localhost:4000/genres`);
			await setGenres(result.data.genres);
			setLoaded(true);
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};


  useEffect(() => {
    // // dummy data
    // setGenres([
    //   {id: 1, name: 'Action'},
    //   {id: 2, name: 'Comedy'},
    //   {id: 3, name: 'Drama'},
    //   {id: 4, name: 'Crime'},
    // ])
    fetchGenres();
  }, [])
  
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
        <div className='row'>
          {genres.map((genre, index) => (
            <div className='col-sm-2 mb-3' key={index}>
              <div className='card'>
                <div className='card-body text-center'>
                  <Link to={`/genres/${genre.id}/movies`}>
                    {genre.genre_name}
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

export default GenreList