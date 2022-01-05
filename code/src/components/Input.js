import React, { useState } from "react";
import { API_URL } from "utils/urls";
import "./Input.css";
const Input = ({ newThought, setNewThought, setThoughts, thoughts }) => {
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");

  const setNewThoughtChange = (event) => {
    setNewThought(event.target.value);
    setCount(event.target.value.length);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: newThought,
        name: name,
        tags: tags,
      }),
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then(({ response: thought }) => setThoughts([thought, ...thoughts]));
    setNewThought("");
    setCount(0);
    setTags("");
    setName("");
  };

  const checkKey = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleFormSubmit(event);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="input-card">
      <label htmlFor="newThought">What's making you happy right now?</label>
      <textarea
        type="text"
        value={newThought}
        onChange={setNewThoughtChange}
        onKeyDown={(event) => checkKey(event)}
        placeholder="Write a happy thought"
      />
      <p className="counter" style={count > 140 ? { color: "red" } : {}}>
        {140 - count} out of 140 characters left.
      </p>
      <div className="align-input">
        <label htmlFor={name}>Your name if I may ask?</label>
        <input
          className="name-input"
          type="text"
          placeholder="Leave empty and you will be anonymous"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>
        <select value={tags} onChange={(event) => setTags(event.target.value)}>
          <option hidden="hidden">Thought category</option>
          <option value="Food thought">Food thought</option>
          <option value="Random thought">Random thought</option>
          <option value="Work thought">Work thought</option>
          <option value="Other thought">Other thought</option>
        </select>
      </div>
      <div className="center-button">
        <button
          className="submit-button"
          type="submit"
          disabled={newThought.length < 5 || newThought.length > 140}
        >
          <span role="img" aria-label="heart emoji">
            ❤️ Send Happy Thought ❤️
          </span>
        </button>
      </div>
    </form>
  );
};

export default Input;
