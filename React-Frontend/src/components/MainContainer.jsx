import React, { useState } from "react";
import { Plus, Edit2, Save } from "lucide-React";
import NotesContainer from "./NotesContainer";

const MainContainer = ({ showNotesContainer }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes",
      content:
        "Discuss project timeline\nReview requirements\nAssign tasks\nSchedule follow-up",
      tags: ["work", "project"],
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk\nEggs\nBread\nFruit",
      tags: ["personal"],
    },
    {
      id: 3,
      title: "Ideas",
      content:
        "Mobile app concept\nWebsite redesign\nNew feature implementation",
      tags: ["creative"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const saveNote = () => {
    if (!activeNote) return;

    const updatedNote = {
      ...activeNote,
      title: noteTitle,
      content: activeNote.content,
    };

    setNotes(
      notes.map((note) => (note.id === activeNote.id ? updatedNote : note))
    );
    setEditMode(false);
    setActiveNote(updatedNote);
  };

  return (
    <div className='flex flex-1 overflow-hidden bg-red-100'>
      {showNotesContainer && (
        <NotesContainer
          notes={notes}
          filteredNotes={filteredNotes}
          activeNote={activeNote}
          searchTerm={searchTerm}
          setNotes={setNotes}
          setSearchTerm={setSearchTerm}
          setActiveNote={setActiveNote}
          setNoteTitle={setNoteTitle}
          setEditMode={setEditMode}
        />
      )}

      <div className='flex-1 flex flex-col bg-gray-900'>
        {activeNote ? (
          <>
            <div className='p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800'>
              {editMode ? (
                <input
                  type='text'
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className='text-white flex-1 bg-gray-700  p-2 rounded'
                />
              ) : (
                <h1 className='text-white text-xl font-semibold'>
                  {activeNote.title}
                </h1>
              )}
              <div>
                {editMode ? (
                  <button
                    onClick={saveNote}
                    className='bg-green-600 hover:bg-green-700 rounded text-white p-2'
                  >
                    <Save size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className='bg-blue-600 hover:bg-blue-700 rounded p-2 text-white'
                  >
                    <Edit2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-center'>
              <p className='text-gray-500 mb-4'>
                Select a Note or create a new one
              </p>
              <button className='bg-green-600 text-white py-2 px-4 rounded flex items-center mx-auto '>
                <Plus
                  size={16}
                  className='mr-2'
                />
                New Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
