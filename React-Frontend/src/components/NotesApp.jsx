import React, { useState } from "react";
import MainContainer from "./MainContainer";

const NotesApp = () => {
  const [showNotesContainer, setShowNotesContainer] = useState(false);

  const toggleNotesContainer = () => {
    setShowNotesContainer(!showNotesContainer);
  };

  return (
    <div className='flex flex-col h-screen bg-gray-900'>
      <div className='flex justify-between items-center bg-gray-800 p-3 border-b border-gray-600'>
        <h1 className='text-white font-bold text-2xl'>Talk with Notes</h1>
        <button
          onClick={toggleNotesContainer}
          className='bg-orange-600 hover:bg-orange-700 p-2 rounded text-white'
        >
          Show Notes
        </button>
      </div>
      <MainContainer showNotesContainer={showNotesContainer} />
    </div>
  );
};
export default NotesApp;
