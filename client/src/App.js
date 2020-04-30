import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovies"
import AddMovie from "./Movies/AddMovie"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies") 
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // useEffect(() => {
  //   getMovieList();
  // }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">
        <div className="button">Add Movie</div>
      </Link>

      <Route 
        exact path="/" 
        render={props => {
          return <MovieList {...props} movies={movies} />
        }}
         />

      <Route
        path="/movies/:id"
        render={props => {
          return ( <Movie 
          {...props} 
          addToSavedList={addToSavedList}
          setMovies={setMovies}
          movies={movies}
          />
          );
        }}
      />
      <Route
        path='/update-movie/:id'
        render={props => {
          return (
            <UpdateMovie {...props} movies={movies} setMovies={setMovies} />
          );
        }}
      />
      <Route 
        path="/add-movie"
        render={props => {
          return <AddMovie {...props} setMovies={setMovies} />;
        }}
      />
    </>
  );
};

export default App;