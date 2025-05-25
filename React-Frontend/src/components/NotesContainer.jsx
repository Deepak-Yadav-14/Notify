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
  createNewNote,
  Plus,
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
      <div className='p-3 border-t border-gray-700'>
        <button
          onClick={createNewNote}
          className='w-full bg-green-600 hover:bg-green-700 py-2 flex justify-center items-center text-white rounded'
        >
          <Plus size={16} />
          New Note
        </button>
      </div>
    </div>
  );
};

export default NotesContainer;
