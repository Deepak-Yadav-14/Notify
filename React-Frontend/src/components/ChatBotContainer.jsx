import { React, use, useEffect, useState } from "react";
import { resetChats, getChatResponse } from "../services/api";

const ChatBotContainer = ({
  chatInput,
  setChatInput,
  chatMessages,
  setChatMessages,
  loading,
  setLoading,
}) => {
  const sendChat = async () => {
    const user_msg = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, user_msg]);
    setLoading(true);
    setChatInput("");

    try {
      const res = await getChatResponse({ chat_input: chatInput });
      const model_response = { role: "model", text: res.reply };
      setChatMessages((prev) => [...prev, model_response]);
    } catch (e) {
      console.error("Chat error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChats = async () => {
    try {
      const response = await resetChats();
      setChatMessages([]);
    } catch (error) {
      console.error("Failed to reset chats:", error);
      alert("Failed to reset chat history");
    }
  };

  return (
    <div className="max-w-80 bg-gray-800 border-gray-700 border-l flex flex-col">
      <div className="m-2">
        <h1 className="bg-gray-700 text-gray-100 text-center border-b border-gray-700 p-2 text-lg rounded">
          Ask Notify for Notes
        </h1>
        <button
          onClick={handleResetChats}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-2 rounded w-full">
          Reset Chats
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-900 rounded p-4 space-y-2">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={` p-2 rounded max-w-xl  ${
              msg.role === "user"
                ? "bg-blue-700 self-end text-white"
                : "bg-gray-700 self-start text-gray-200"
            }  `}>
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
      </div>
      <div className="flex justify-between p-2 border-t border-gray-700">
        <input
          type="text"
          placeholder="Enter input..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChat()}
          className="flex-1 p-2 text-white bg-gray-700 rounded"
        />
        <button
          onClick={sendChat}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 ml-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotContainer;
