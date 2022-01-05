import React from "react";
import moment from "moment";
import "./MessageList.css";

const MessageList = ({ thought, onMessageLiked }) => {
  return (
    <div className="thoughts-card">
      <div className="text-align">
        <p>{thought.message}</p>
        <p className="tags">{thought.tags}</p>
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
