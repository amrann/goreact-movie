import React, { useEffect, useState } from 'react'
import Detail from '../../components/movies/Detail'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowMovie = () => {
  let { thisId } = useParams();
	const [movie, setMovie] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
		const fetchMovies = async () => {
			try {
				const result = await axios(`http://localhost:4000/movie/${thisId}`);
        console.log("data movie => "+result.data.movie);
				await setMovie(result.data.movie);
				setLoaded(true);
			} catch (err) {
				setErrorMessage(err.response.data);
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
        <>
          {/* <pre> {JSON.stringify(movie)} </pre> */}
          <Detail movie={movie} />
        </>
      )}
		</>
  )
}

export default ShowMovie