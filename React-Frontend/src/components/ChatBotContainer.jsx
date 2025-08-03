import { useEffect, useState, useRef } from "react";
import { resetChats, getChatResponse } from "../services/api";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  RotateCcw,
  Send,
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
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); // Ref to scroll to the bottom

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const user_msg = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, user_msg]);
    setLoading(true);
    setChatInput("");
    setError(null);

    try {
      const res = await getChatResponse({ chat_input: chatInput });
      const model_response = { role: "model", text: res.reply };
      setChatMessages((prev) => [...prev, model_response]);
    } catch (e) {
      console.error("Chat error: ", e);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetChats = async () => {
    try {
      await resetChats();
      setChatMessages([]);
      setError(null);
    } catch (error) {
      console.error("Failed to reset chats:", error);
      setError("Failed to reset chat history");
    }
  };

  // Scroll to the bottom when chatMessages or loading changes
  useEffect(() => {
    if (messagesEndRef.current && !isCollapsed) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, loading, isCollapsed]);

  return (
    <>
      <div
        className={`${
          isCollapsed ? "w-12" : "w-80"
        } bg-gray-800/40 backdrop-blur-xl border-l border-slate-700/50 flex flex-col transition-all duration-300 ease-in-out z-20`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-all duration-200"
            aria-label={isCollapsed ? "Expand chat" : "Collapse chat"}>
            {isCollapsed ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
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
            <div className="flex flex-col flex-1 overflow-y-auto p-2 space-y-3 scrollbar-custom">
              <div className="flex justify-end items-center group">
                <p className="animate-pulse text-gray-300 px-2 text-sm invisible group-hover:visible transition-all duration-200">
                  Reset
                </p>
                <button
                  onClick={handleResetChats}
                  className="p-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg transition-all duration-300 shadow-lg"
                  aria-label="Reset chat history">
                  <RotateCcw size={16} />
                </button>
              </div>
              {error && (
                <div className="text-center text-red-400 text-sm p-2">
                  {error}
                </div>
              )}
              {chatMessages.length === 0 && !error && (
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
              <div ref={messagesEndRef} /> {/* Dummy div for scrolling */}
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
                  aria-label="Chat input"
                />
                <button
                  onClick={sendChat}
                  disabled={!chatInput.trim() || loading}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white p-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teal-900/20"
                  aria-label="Send message">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
        {isCollapsed && (
          <div
            onClick={onToggle}
            className="flex-1 flex flex-col items-center py-4 space-y-4"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onToggle()}
            aria-label="Expand chat panel">
            <div className="p-2 text-blue-400">
              <MessageCircle size={20} />
            </div>
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetChats();
                }}
                className="p-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg transition-all duration-300 shadow-lg"
                aria-label="Reset chat history">
                <RotateCcw size={16} />
              </button>
              <span className="absolute right-full mr-2 text-gray-300 text-sm invisible group-hover:visible transition-all duration-200">
                Reset
              </span>
            </div>
            {chatMessages.length > 0 && (
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #4fd1c5 transparent;
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 8px;
          margin: 4px 0;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4fd1c5 0%, #3b82f6 100%);
          border-radius: 8px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5eead4 0%, #60a5fa 100%);
          border-color: rgba(255, 255, 255, 0.1);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default ChatBotContainer;
