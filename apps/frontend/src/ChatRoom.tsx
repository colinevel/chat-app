import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  content: string;
}

const socket: Socket = io("http://localhost:3000"); // Replace with your backend URL

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message"); // Clean up listener
    };
  }, []);

  // Handle message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || !username) return;

    const message: Message = { sender: username, content: input };
    socket.emit("send_message", message); // Send message to server
    setInput(""); // Clear input field
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Entrez un message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
