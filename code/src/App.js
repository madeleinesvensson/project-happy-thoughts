import React, { useState, useEffect } from "react";
import { API_URL, LIKES_URL } from "./utils/urls";
import Input from "components/Input";
import MessageList from "components/MessageList";
import Loading from "components/Loading";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .finally(() => setLoading(false));
  }, []);

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
      {loading && <Loading />}
      <Input
        newThought={newThought}
        setNewThought={setNewThought}
        thoughts={thoughts}
        setThoughts={setThoughts}
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
