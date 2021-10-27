import React from "react";
import "./Input.css";
const Input = ({ onFormSubmit, newThought, setNewThought }) => {
  return (
    <form onSubmit={onFormSubmit} className="input-card">
      <label htmlFor="newThought">What's making you happy right now?</label>
      <textarea
        type="text"
        value={newThought}
        onChange={(e) => setNewThought(e.target.value)}
      />
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
