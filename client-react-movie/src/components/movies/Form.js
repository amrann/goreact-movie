import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const MovieForm = () => {
	const { register, handleSubmit, setValue } = useForm();
	const { thisId } = useParams(); // param thisId disesuaikan dengan param pada route
	const isAddMode = !thisId;
	const fields = [
		'id',
		'title',
		'description',
		'runtime',
		'release_date',
		'runtime',
		'rating',
		'mpaa_rating',
		'genres',
	];

	const fetchMovie = async (id) => {
		try {
			const result = await axios(`http://localhost:4000/movie/${id}`);
			/*
			ID yg didapatkan pada const result masih bertipe number, sedangkan tipe data yg kita set pada
			MoviePayload berupa string, sehingga harus dikonvert ke string terlebih dahulu
			*/
			result.data.movie.id = result.data.movie.id.toString();
			result.data.movie.release_date = new Date(result.data.movie.release_date)
				.toISOString()
				.split('T')[0]; // penyesuaian format Date
			fields.forEach((field) => setValue(field, result.data.movie[field]));
		} catch (err) {
			console.log(err.response.data);
		}
	};

	useEffect(() => {
		if (!isAddMode) {
			fetchMovie(thisId);
		}
	}, [isAddMode]);

	const onSubmit = async (data) => {
		if (isAddMode) {
			const result = await axios.post('http://localhost:4000/admin/movie/add', JSON.stringify(data));
			console.log("result add data => "+result.data)
		} else {
			const result = await axios.post('http://localhost:4000/admin/movie/edit', JSON.stringify(data));
			console.log("result edit data => "+result.data)
		}
	};

	return (
		<>
			<h2>Movie Form</h2>
			<hr />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Title
					</label>
					<input
						type='text'
						className='form-control'
						id='title'
						name='title'
						{...register('title', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Release Date
					</label>
					<input
						type='date'
						className='form-control'
						id='release_date'
						name='release_date'
						{...register('release_date', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Runtime
					</label>
					<input
						type='number'
						className='form-control'
						id='runtime'
						name='runtime'
						{...register('runtime', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>MPAA Rating</label>
					<select
						name='mpaa_rating'
						id='mpaa_rating'
						className='form-control'
						{...register('mpaa_rating', { required: true })}
					>
						<option value='G' className='form-select'>G</option>
						<option value='PG' className='form-select'>PG</option>
						<option value='PG13' className='form-select'>PG13</option>
						<option value='R' className='form-select'>R</option>
						<option value='NC17' className='form-select'>NC17</option>
					</select>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Rating
					</label>
					<input
						type='number'
						className='form-control'
						id='rating'
						name='rating'
						{...register('rating', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Description
					</label>
					<textarea
						rows={3}
						className='form-control'
						id='description'
						name='description'
						{...register('description', { required: true })}
					/>
				</div>
				<hr />
				<button className='btn btn-primary mb-4' type='submit'>
					Save
				</button>
			</form>
		</>
	);
};

export default MovieForm;