import Search from "./Search";
import NotesCardContainer from "./NotesCardContainer";
import { act } from "react";

const NotesContainer = ({
  notes,
  filteredNotes,
  activeNote,
  searchTerm,
  setNotes,
  setSearchTerm,
  setActiveNote,
  setNoteTitle,
  setEditMode,
}) => {
  return (
    <div className='w-64 bg-gray-800 border-r border-gray-700 flex flex-col'>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <NotesCardContainer
        notes={notes}
        filteredNotes={filteredNotes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        setEditMode={setEditMode}
        setNoteTitle={setNoteTitle}
        setNotes={setNotes}
      />
    </div>
  );
};

export default NotesContainer;
