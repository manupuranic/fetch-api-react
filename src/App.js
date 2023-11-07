import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRetry(false);
    try {
      const response = await fetch("https://firebase_database_url/movies.json");
      if (!response.ok) {
        throw new Error("something went wrong!....retrying");
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
      setRetry(true);
    }
    setIsLoading(false);
  }, []);

  const onAddMovie = async (movie) => {
    const response = await fetch("https://firebase_database_url/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  const onDeleteMovie = async (id) => {
    await fetch(`https://firebase_database_url/movies/${id}.json`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    fetchMoviesHandler();
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  if (retry) {
    setInterval(() => {
      fetchMoviesHandler();
    }, 5000);
  }

  let content = <p>No movies loaded</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={onDeleteMovie} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <span className="loader"></span>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={onAddMovie} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
