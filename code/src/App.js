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
      <form onSubmit={onFormSubmit} className="input-card">
        <label htmlFor="newThought">What's making you happy right now?</label>
        <textarea
          type="text"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
        />
        <button className="submit-button" type="submit">
          {" "}
          ❤️ Send Happy Thought ❤️{" "}
        </button>
      </form>

      {thoughts.map((thought) => (
        <div className="thoughts-card" key={thought._id}>
          <p>{thought.message}</p>
          <div className="heart-date-aligment">
            <div className="like-wrapper">
              <button className="card-heart">
                <span>❤️</span>
              </button>
              x {thought.hearts}
            </div>
            <p className="date">{moment(thought.createdAt).fromNow()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
