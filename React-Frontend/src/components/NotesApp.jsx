import React, { useState } from "react";
import MainContainer from "./MainContainer";

const NotesApp = () => {
  const [showNotesContainer, setShowNotesContainer] = useState(false);

  const toggleNotesContainer = () => {
    setShowNotesContainer(!showNotesContainer);
  };

  return (
    <>
      <div>
        <h1>Talk With Notes</h1>
        <button
          onClick={toggleNotesContainer}
          className='bg-orange-600'
        >
          Show Notes
        </button>
      </div>
      <MainContainer showNotesContainer={showNotesContainer} />
    </>
  );
};
export default NotesApp;
