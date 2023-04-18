import React, { useState, useEffect } from "react";
import "./App.css";
import logo from'./logo.svg';
import MovieCard from "./MovieCard";
import no_Found from './no_found.png'
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Movie Platform</h1>
      <div className="search">
        <input placeholder="Search for Movies" 
        value={searchTerm}
        onChange={(e)=> setSearchTerm (e.target.value)}
          />
        <img src={logo}
         alt="search" 
        onClick={()=>searchMovies(searchTerm)}/>
      </div>
      {movies?.length>0
        ?(
          <div className="container">
          {movies.map((movie)=>(
            <MovieCard movie={movie}/>
          ))}
          </div>
        ):(
          <div className="empty">
            <img src={no_Found} alt="movies not found" className="movies_not_found"/>
            <h1 className=""> Movies Not Found</h1>
          </div>
        )
      }
    </div>
  );
};

export default App;