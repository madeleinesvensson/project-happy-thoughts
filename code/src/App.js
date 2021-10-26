import React, { useState, useEffect } from "react";
import moment from "moment";
import { API_URL } from "./utils/urls";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data));
  }, []);

  const onFormSubmit = (event) => {
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
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="newThought">Type your text</label>
        <input
          type="text"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
        />
        <button type="submit">Send thought</button>
      </form>
      {thoughts.map((thought) => (
        <div key={thought._id}>
          <p>{thought.message}</p>
          <button>{thought.hearts}</button>
          <p>Created at: {moment(thought.createdAt).fromNow()}</p>
        </div>
      ))}
    </div>
  );
};
