import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const onDelete = () => {
    props.onDeleteMovie(props.id);
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button className={classes.btn} type="button" onClick={onDelete}>
        Delete Movie
      </button>
    </li>
  );
};

export default Movie;
