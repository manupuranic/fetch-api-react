import React from "react";
import "./AddMovie.module.css";
import { useState } from "react";

const AddMovie = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const onInputChange = (event) => {
    const updatedForm = { ...formData };
    updatedForm[event.target.name] = event.target.value;
    setFormData(updatedForm);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    props.onAddMovie(formData);
    setFormData({
      title: "",
      openingText: "",
      releaseDate: "",
    });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label>Title</label>
      <input
        type="text"
        name="title"
        onChange={onInputChange}
        value={formData.title}
      />
      <label>Opening Text</label>
      <textarea
        rows={5}
        cols={25}
        name="openingText"
        onChange={onInputChange}
        value={formData.openingText}
      />
      <label>Release Date</label>
      <input
        type="date"
        name="releaseDate"
        onChange={onInputChange}
        value={formData.releaseDate}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddMovie;
