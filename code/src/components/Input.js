import React, { useState } from "react";
import { API_URL } from "utils/urls";
import "./Input.css";
const Input = ({ newThought, setNewThought, setThoughts, thoughts }) => {
  const [count, setCount] = useState(0);

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
      body: JSON.stringify({ message: newThought }),
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then((data) => setThoughts([data, ...thoughts]));
    setNewThought("");
    setCount(0);
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

      <button
        className="submit-button"
        type="submit"
        disabled={newThought.length < 5 || newThought.length > 140}
      >
        <span role="img" aria-label="heart emoji">
          ❤️ Send Happy Thought ❤️
        </span>
      </button>
    </form>
  );
};

export default Input;
