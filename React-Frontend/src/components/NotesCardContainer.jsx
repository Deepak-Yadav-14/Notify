import React from "react";
import { deleteNote } from "../services/api";
import { X } from "lucide-react";

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

  const deleteNoteCard = async (note_id) => {
    try {
      await deleteNote(note_id);
      setNotes(notes.filter((note) => note.id !== note_id));
      if (activeNote && activeNote.id === note_id) {
        setActiveNote(null);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {filteredNotes.length === 0 ? (
        <div className="p-4 text-center">
          <p className="text-gray-500 text-sm">No notes found</p>
        </div>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`relative p-3 mx-2 mb-2 cursor-pointer rounded-lg transition-all duration-200 group ${
              activeNote?.id === note.id
                ? "bg-blue-900/30 border border-blue-500/30 shadow-lg shadow-blue-900/20"
                : "hover:bg-gray-700/40 border-b border-gray-600/40"
            }`}
            onClick={() => openNote(note)}>
            <div className="pr-6">
              <h3
                className={`font-medium truncate mb-1 transition-colors text-sm ${
                  activeNote?.id === note.id
                    ? "text-blue-200"
                    : "text-gray-200 group-hover:text-blue-300"
                }`}>
                {note.title}
              </h3>
              <div>
                <p className="bg-gradient-to-l bg-clip-text text-transparent from-white via-gray-300 to-gray-400 text-xs truncate leading-relaxed">
                  {(note.content || "").split("\n")[0] || "Empty note"}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNoteCard(note.id);
              }}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-300 transition-all duration-200 p-1 rounded-full hover:bg-red-900/20">
              <X size={13} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesCardContainer;
