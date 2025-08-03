import { React, use, useEffect, useState } from "react";
import { resetChats, getChatResponse } from "../services/api";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  RotateCcw,
  Send,
  Trash,
} from "lucide-react";
const ChatBotContainer = ({
  chatInput,
  setChatInput,
  chatMessages,
  setChatMessages,
  loading,
  setLoading,
  isCollapsed,
  onToggle,
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
    <div
      className={`${
        isCollapsed ? "w-12" : "w-80"
      } bg-gray-800/40 backdrop-blur-xl border-l border-slate-700/50 flex flex-col transition-all duration-300 ease-in-out z-20`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-all duration-200">
          {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-teal-400" />
            <h2 className="text-gray-100 font-semibold">Ask Notify</h2>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="flex flex-col flex-1 overflow-y-auto p-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <div
              onClick={handleResetChats}
              className="flex justify-end items-center group">
              <p className="animate-pulse text-gray-300 px-2 text-100 invisible group-hover:visible transition-all duration-200">
                Reset
              </p>
              <button
                onClick={handleResetChats}
                className="p-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg transition-all duration-300 shadow-lg">
                <RotateCcw size={16} />
              </button>
            </div>
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Start a conversation</p>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}>
                <div
                  className={`p-3 rounded-xl max-w-xs transition-all duration-200 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-gray-700/60 text-gray-200 border border-gray-600/30"
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span>Thinking...</span>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-700/50">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask about your notes..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendChat()
                }
                className="flex-1 p-2.5 text-gray-100 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300 placeholder-gray-500 text-sm"
              />
              <button
                onClick={sendChat}
                disabled={!chatInput.trim() || loading}
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white p-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teal-900/20">
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {isCollapsed && (
        <div
          onClick={onToggle}
          className="flex-1 flex flex-col items-center py-4 space-y-4">
          <div className="p-2 text-blue-400">
            <MessageCircle size={20} />
          </div>
          <button
            onClick={handleResetChats}
            className="p-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg transition-all duration-300 shadow-lg">
            <RotateCcw size={16} />
          </button>

          {chatMessages.length > 0 && (
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBotContainer;
