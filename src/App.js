import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <span class="loader"></span>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies loaded</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
