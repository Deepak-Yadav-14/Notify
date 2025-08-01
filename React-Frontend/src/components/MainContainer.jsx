import { useEffect, useState } from "react";
import { Plus, Edit2, Save } from "lucide-react";
import NotesContainer from "./NotesContainer";
import { addNote, getNotes, updateNote } from "../services/api";
import ChatBotContainer from "./ChatBotContainer";

const MainContainer = ({ showNotesContainer, showChatBotContainer }) => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(chatMessages));
  }, [chatMessages]);
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes().then((data) => setNotes(data));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const filteredNotes = notes
    .filter((note) => note != null && typeof note === "object" && "id" in note)
    .filter(
      (note) =>
        (note.title || "New Note")
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (note.content || "")
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  const openNote = (note) => {
    setActiveNote(note);
    setNoteTitle(note.title);
    setEditMode(false);
  };

  const saveNote = async () => {
    if (!activeNote) return;
    const updatedNote = {
      ...activeNote,
      title: noteTitle || "New Note",
      content: activeNote.content,
    };
    try {
      const savedNote = await updateNote(activeNote.id, updatedNote);
      if (savedNote && "id" in savedNote) {
        setNotes(
          notes.map((note) => (note.id === activeNote.id ? savedNote : note))
        );
        setActiveNote(savedNote);
        setEditMode(false);
      } else {
        console.error("Update failed:", savedNote);
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const updateNoteContent = (content) => {
    if (!activeNote) return;
    setActiveNote({
      ...activeNote,
      content: content,
    });
  };

  const createNewNote = async () => {
    const newNote = { title: "New Note", content: "" }; // id assigned by backend
    try {
      const savedNote = await addNote(newNote);
      if (savedNote && "id" in savedNote) {
        setNotes([...notes, savedNote]);
        openNote(savedNote);
        setEditMode(true);
      } else {
        console.error("Invalid note returned:", savedNote);
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };
  return (
    <div className="flex flex-1 overflow-hidden">
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

      <div className="flex-1 flex flex-col bg-gray-900">
        {activeNote ? (
          <>
            <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
              {editMode ? (
                <input
                  type="text"
                  value={noteTitle}
                  placeholder="New Note"
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="text-white flex-1 bg-gray-700  p-2 rounded"
                />
              ) : (
                <h1 className="text-white text-xl font-semibold">
                  {activeNote.title}
                </h1>
              )}
              <div className="flex space-x-2">
                {editMode ? (
                  <button
                    onClick={saveNote}
                    className="bg-green-600 hover:bg-green-700 rounded text-white p-2.5 ml-2">
                    <Save size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 rounded p-2.5 text-white ml-2">
                    <Edit2 size={20} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {editMode ? (
                <textarea
                  value={activeNote.content}
                  onChange={(e) => updateNoteContent(e.target.value)}
                  className="text-white h-full w-full bg-gray-800 resize-none p-4 rounded"
                />
              ) : (
                <div className="whitespace-pre-wrap text-white bg-gray-800 p-4 rounded h-full overflow-y-auto">
                  {activeNote.content}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">
                Select a Note or create a new one
              </p>
              <button
                onClick={createNewNote}
                className="bg-green-600 text-white py-2 px-4 rounded flex items-center mx-auto ">
                <Plus size={16} className="mr-2" />
                New Note
              </button>
            </div>
          </div>
        )}
      </div>

      {showChatBotContainer && (
        <ChatBotContainer
          chatInput={chatInput}
          setChatInput={setChatInput}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default MainContainer;
