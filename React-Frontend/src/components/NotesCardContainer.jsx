import React from "react";

const NotesCardContainer = ({
  notes,
  filteredNotes,
  activeNote,
  setActiveNote,
  setNoteTitle,
  setEditMode,
  setNotes,
}) => {
  const openNote = (note) => {
    setActiveNote(note);
    setNoteTitle(note.title);
    setEditMode(false);
  };

  const deleteNote = (note_id) => {
    setNotes(notes.filter((note) => note.id != note_id));
    if (activeNote && activeNote.id == note_id) {
      setActiveNote(null);
    }
  };

  return (
    <div className='flex-1 overflow-y-auto'>
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 flex justify-between items-center 
          }`}
        >
          <div
            onClick={() => openNote(note)}
            className='flex-1'
          >
            <h3 className='font-medium truncate text-white'>
              {note.title == "" ? "New Note" : note.title}
            </h3>
            <p className='text-gray-400 text-sm truncate'>
              {note.content.split("\n")[0]}
            </p>
          </div>
          <button
            onClick={() => deleteNote(note.id)}
            className='text-gray-400 hover:text-red-500'
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesCardContainer;
