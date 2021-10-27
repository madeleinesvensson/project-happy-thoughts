import React from "react";
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
        ❤️ Send Happy Thought ❤️
      </button>
    </form>
  );
};

export default Input;
