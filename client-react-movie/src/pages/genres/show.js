import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ShowMovieGenre = () => {
  let { thisId } = useParams();
	const [movies, setMovies] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
		const fetchMovies = async () => {
			try {
				const result = await axios(`http://localhost:4000/genre/${thisId}/movies`);
				await setMovies(result.data.movies);
				setLoaded(true);
			} catch (err) {
				setErrorMessage(err.response.data);
			}
		};
		fetchMovies();
	}, [thisId]); // ketika ada perubahan pada thisId, maka useEffect akan dijalankan lagi

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
          <ul>
            {Array.isArray(movies) ? (
              movies.map((movie, index) => (
                <li key={index}>
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </li>
              ))
            ) : (
              <p>Oops... There's no movies data.</p>
            )}
          </ul>
        </>
      )}
		</>
  )
}

export default ShowMovieGenre