// src/components/Chat.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket = io();

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="fixed bottom-10 right-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />{" "}
        <button
          type="submit"
          className="bg-black px-2 rounded min-w-screen  text-white min-h-10"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
