import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
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
      <div className='row'>
				<div className='col-12'>
          <div className='btn btn-sm btn-primary'>
					  Add
          </div>
				</div>
			</div>
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
					<div className='row'>
						<div className='col-12'>
							<table className='table'>
								<thead>
									<tr>
										<td>No</td>
										<td>Name</td>
										<td></td>
									</tr>
								</thead>
								<tbody>
									{movies.map((movie, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>
												<Link to={`/movie/${movie.id}`}>{movie.title}</Link>
											</td>
											<td>
												<div className='btn-group'>
													<button
														className='btn btn-secondary btn-sm dropdown-toggle'
														type='button'
														data-bs-toggle='dropdown'
														aria-expanded='false'
													>
														Action
													</button>
													<ul className='dropdown-menu'>
														<li>
															<span className='dropdown-item'>
																Edit
															</span>
														</li>
														<li>
															<span className='dropdown-item'>
																Delete
															</span>
														</li>
													</ul>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</>
      )}
    </>
  )
};

export default MovieTable;