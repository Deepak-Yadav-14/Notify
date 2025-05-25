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

  const openNote = (note) => {
    setActiveNote(note);
    setNoteTitle(note.title);
    setEditMode(false);
  };

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

  const updateNoteContent = (content) => {
    if (!activeNote) return;
    setActiveNote({
      ...activeNote,
      content: content,
    });
  };

  const createNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "",
      content: "",
      tag: [],
    };

    setNotes([...notes, newNote]);
    openNote(newNote);
    setEditMode(true);
  };

  return (
    <div className='flex flex-1 overflow-hidden'>
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
          createNewNote={createNewNote}
          Plus={Plus}
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
                  placeholder='New Note'
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className='text-white flex-1 bg-gray-700  p-2 rounded'
                />
              ) : (
                <h1 className='text-white text-xl font-semibold'>
                  {activeNote.title}
                </h1>
              )}
              <div className='flex space-x-2'>
                {editMode ? (
                  <button
                    onClick={saveNote}
                    className='bg-green-600 hover:bg-green-700 rounded text-white p-2.5 ml-2'
                  >
                    <Save size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className='bg-blue-600 hover:bg-blue-700 rounded p-2.5 text-white ml-2'
                  >
                    <Edit2 size={20} />
                  </button>
                )}
              </div>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
              {editMode ? (
                <textarea
                  value={activeNote.content}
                  onChange={(e) => updateNoteContent(e.target.value)}
                  className='text-white h-full w-full bg-gray-800 resize-none p-4 rounded'
                />
              ) : (
                <div className='whitespace-pre-wrap text-white bg-gray-800 p-4 rounded h-full overflow-y-auto'>
                  {activeNote.content}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-center'>
              <p className='text-gray-500 mb-4'>
                Select a Note or create a new one
              </p>
              <button
                onClick={createNewNote}
                className='bg-green-600 text-white py-2 px-4 rounded flex items-center mx-auto '
              >
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
