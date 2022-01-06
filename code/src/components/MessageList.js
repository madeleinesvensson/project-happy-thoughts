import React from "react";
import moment from "moment";
import "./MessageList.css";

const MessageList = ({ thought, onMessageLiked }) => {
  const borderColorSwitcher = (tags) => {
    switch (tags) {
      case "Food thought":
        return "lightPink";
      case "Work thought":
        return "coral";
      case "Random thought":
        return "mistyRose";
      case "Other thought":
        return "pink";
      case "Idea thought":
        return "Plum";
      case "Christmas thought":
        return "RosyBrown";
      case "School thought":
        return "Thistle";
      default:
        return "black";
    }
  };

  const emojiSwitcher = (tags) => {
    switch (tags) {
      case "Food thought":
        return "🌮";
      case "Work thought":
        return "👩🏼‍💻";
      case "Random thought":
        return "💌";
      case "Other thought":
        return "👻";
      case "Idea thought":
        return "💡";
      case "Christmas thought":
        return "🎄";
      case "School thought":
        return "📚";
      default:
        return "black";
    }
  };
  return (
    <div
      className="thoughts-card"
      style={{
        border: `1px solid ${borderColorSwitcher(thought.tags)}`,
        boxShadow: `7px 7px ${borderColorSwitcher(thought.tags)}`,
      }}
    >
      <div className="text-align">
        <p>{thought.message}</p>
        <p className="tags">
          {/* {thought.tags}  */}
          {emojiSwitcher(thought.tags)}
        </p>
      </div>
      {thought.name ? (
        <p className="by">Thought by: {thought.name}</p>
      ) : (
        <p className="by">Thought by: Anonymous</p>
      )}

      <div className="heart-date-aligment">
        <div className="like-wrapper">
          <button
            className={
              thought.hearts > 0
                ? "like-button like-button-clicked"
                : "like-button"
            }
            onClick={() => onMessageLiked(thought._id)}
          >
            <span role="img" aria-label="heart emoji">
              ❤️
            </span>
          </button>
          <p className="like-p"> x {thought.hearts}</p>
        </div>
        <p className="date">{moment(thought.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default MessageList;
