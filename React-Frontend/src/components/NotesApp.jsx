import React, { useState } from "react";
import MainContainer from "./MainContainer";

const NotesApp = () => {
  const [showNotesContainer, setShowNotesContainer] = useState(false);
  const [showChatBotContainer, setShowChatBotContainer] = useState(false);

  const toggleNotesContainer = () => {
    setShowNotesContainer(!showNotesContainer);
  };

  const toggleChatBotContainer = () => {
    setShowChatBotContainer((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex justify-between items-center bg-gray-800 p-3 border-b border-gray-600">
        <h1 className="text-white font-bold text-2xl">Talk with Notes</h1>
        <div className="flex justify-between w-57">
          <button
            onClick={toggleNotesContainer}
            className="bg-orange-600 hover:bg-orange-700 p-2 rounded text-white">
            Show Notes
          </button>

          <button
            onClick={toggleChatBotContainer}
            className="bg-orange-600 hover:bg-orange-700 p-2 rounded text-white">
            Show Notify AI
          </button>
        </div>
      </div>
      <MainContainer
        showNotesContainer={showNotesContainer}
        showChatBotContainer={showChatBotContainer}
      />
    </div>
  );
};
export default NotesApp;
