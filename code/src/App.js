import React, { useState, useEffect } from "react";
import { API_URL, LIKES_URL } from "./utils/urls";
import Input from "components/Input";
import MessageList from "components/MessageList";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data));
  }, []);

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
  };

  const postLikedThought = async (id) =>
    fetch(LIKES_URL(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);

  const onMessageLiked = async (likedMessageId) => {
    // New updated thought object sent from the API
    const updatedThought = await postLikedThought(likedMessageId);

    const updatedMessage = thoughts.map((thought) => {
      if (thought._id === likedMessageId) {
        // Set the thoughts hearts to the new updated thought hearts from the API
        thought.hearts = updatedThought.hearts;
      }
      return thought;
    });

    setThoughts(updatedMessage);
  };

  return (
    <div>
      <Input
        onFormSubmit={handleFormSubmit}
        newThought={newThought}
        setNewThought={setNewThought}
      />

      {thoughts.map((thought) => (
        <MessageList
          key={thought._id}
          thought={thought}
          onMessageLiked={onMessageLiked}
        />
      ))}
    </div>
  );
};
