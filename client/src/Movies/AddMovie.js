import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddMovie(props) {
  const [movie, setMovie] = useState({});
  const [stars, setStars] = useState([]);

  const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleChangeArr = e => setStars([...stars, e.target.value]);

  useEffect(() => setMovie({ ...movie, stars: stars }), [stars]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then(res => {
        console.log("jp: AddMovies.js line 20", res);
        props.setMovies(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='form'>
      <h2>Add Movie!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='title'
            onChange={handleChange}
            placeholder='Title'
            value={movie.title}
          />
        </label>
        <label>
          Director:
          <input
            type='text'
            name='director'
            onChange={handleChange}
            placeholder='Director'
            value={movie.director}
          />
        </label>
        <label>
          Metascore:
          <input
            type='text'
            name='metascore'
            onChange={handleChange}
            placeholder='Metascore'
            value={movie.metascore}
          />
        </label>
        <label>
          First Star:
          <input
            type='text'
            name='firststar'
            onChange={handleChangeArr}
            placeholder='First Actor/Actress'
          />
        </label>
        <label>
          Second Star:
          <input
            type='text'
            name='secondstar'
            onChange={handleChangeArr}
            placeholder='Second Actor/Actress'
          />
        </label>
        <label>
          Third Star:
          <input
            type='text'
            name='thirdstar'
            onChange={handleChangeArr}
            placeholder='First Actor/Actress'
          />
        </label>
        <button className='button'>Add Movie</button>
      </form>
    </div>
  );
}