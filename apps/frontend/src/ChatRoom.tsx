import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./auth/AuthContext";

interface Message {
  sender: string;
  content: string;
}
// Replace with your backend URL

const ChatRoom = ({ openModal }: { openModal: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {
      const newSocket = io("http://localhost:3000", {
        query: { token },
      });
      setSocket(newSocket);

      newSocket.on("receive_message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        newSocket.off("receive_message");
        newSocket.close();
      };
    }
  }, [user]);

  const handleLogin = () => {
    openModal();
  };

  // Handle message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    if (!user) return;
    const message: Message = { sender: user?.pseudo, content: input };
    socket?.emit("send_message", message);
    setInput("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <div className="chat-container w-full max-w-xl mx-auto mt-10">
        <div className="messages-container h-96 overflow-y-auto p-4 space-y-4 bg-gray-100 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center space-x-2 w-full max-w-xl mx-auto"
      >
        <input
          className="flex-grow p-2 border border-gray-300 rounded-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Entrez un message..."
        />
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary_light">
          Envoyer
        </button>
      </form>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary_light"
      >
        Login
      </button>
    </div>
  );
};

export default ChatRoom;
