import { useEffect, useState, useMemo } from "react";
import { Plus, Edit2, Save, FileText, X } from "lucide-react";
import NotesContainer from "./NotesContainer";
import { addNote, getAllChats, getNotes, updateNote } from "../services/api";
import ChatBotContainer from "./ChatBotContainer";

const MainContainer = ({
  showNotesContainer,
  showChatBotContainer,
  notesCollapsed,
  chatCollapsed,
  onNotesToggle,
  onChatToggle,
}) => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      try {
        const chats = await getAllChats();
        const formattedChats = chats.map((chat) => ({
          role: chat.role,
          text: chat.parts[0].text,
        }));
        setChatMessages(formattedChats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        setError("Failed to load chat history");
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(
          data.filter(
            (note) => note != null && typeof note === "object" && "id" in note
          )
        );
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setError("Failed to load notes");
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes
      .filter(
        (note) => note != null && typeof note === "object" && "id" in note
      )
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
  }, [notes, searchTerm]);

  const openNote = (note) => {
    setActiveNote(note);
    setNoteTitle(note.title || "New Note");
    setEditMode(false);
    setError(null);
  };

  const saveNote = async () => {
    if (!activeNote) return;
    const updatedNote = {
      ...activeNote,
      title: noteTitle || "New Note",
      content: activeNote.content,
    };
    setNotes(
      notes.map((note) => (note.id === activeNote.id ? updatedNote : note))
    ); // Update UI
    setActiveNote(updatedNote);
    setEditMode(false);
    try {
      console.time("updateNote");
      const savedNote = await updateNote(activeNote.id, updatedNote);
      console.timeEnd("updateNote");
      if (savedNote && "id" in savedNote) {
        setNotes(
          notes.map((note) => (note.id === activeNote.id ? savedNote : note))
        );
        setActiveNote(savedNote);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Failed to update note:", error);
      setNotes(
        notes.map((note) => (note.id === activeNote.id ? activeNote : note))
      ); // Rollback
      setError("Failed to update note");
    }
  };

  const updateNoteContent = (content) => {
    if (!activeNote) return;
    setActiveNote({ ...activeNote, content });
  };

  const createNewNote = async () => {
    const tempId = `temp-${Date.now()}`;
    const tempNote = { id: tempId, title: "New Note", content: "" };

    setNotes((prev) => [...prev, tempNote]);
    openNote(tempNote);
    setEditMode(true);
    setError(null);

    try {
      const savedNote = await addNote({ title: "New Note", content: "" });

      if (savedNote && "id" in savedNote) {
        setNotes((prev) =>
          prev.map((note) => (note.id === tempId ? savedNote : note))
        );
        setActiveNote(savedNote);
      } else {
        throw new Error("Invalid server response");
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      setNotes((prev) => prev.filter((note) => note.id !== tempId));
      setError("Failed to create note");
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden z-10">
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
          isCollapsed={notesCollapsed}
          onToggle={onNotesToggle}
        />
      )}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 min-w-0">
        {error && (
          <div className="p-4 bg-red-900/30 border-b border-red-800/50 text-red-300 text-center text-sm flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300"
              aria-label="Dismiss error">
              <X size={16} />
            </button>
          </div>
        )}
        {activeNote ? (
          <>
            <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-gray-800/20 z-10">
              {editMode ? (
                <input
                  type="text"
                  value={noteTitle}
                  placeholder="Enter note title..."
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="text-gray-100 flex-1 bg-gray-700/50 border border-gray-600/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg font-semibold"
                  aria-label="Note title"
                />
              ) : (
                <h1 className="text-gray-100 text-xl font-bold truncate">
                  {activeNote.title || "New Note"}
                </h1>
              )}
              <div className="flex space-x-2 ml-4 flex-shrink-0">
                {editMode ? (
                  <button
                    onClick={saveNote}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg text-white p-2.5 transition-all duration-300 shadow-lg hover:shadow-emerald-900/20"
                    aria-label="Save note">
                    <Save size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg p-2.5 text-white transition-all duration-300 shadow-lg hover:shadow-blue-900/20"
                    aria-label="Edit note">
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 p-4 overflow-hidden z-10">
              {editMode ? (
                <textarea
                  value={activeNote.content}
                  onChange={(e) => updateNoteContent(e.target.value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 h-full w-full bg-gray-800/20 border border-gray-600/30 resize-none p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 leading-relaxed scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                  aria-label="Note content"
                />
              ) : (
                <div className="whitespace-pre-wrap text-gray-100 bg-gray-800/20 border border-gray-600/30 p-4 rounded-lg h-full overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  {activeNote.content || (
                    <span className="text-gray-500 italic">
                      This note is empty. Click edit to add content.
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center p-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-gray-200 text-xl font-semibold mb-3">
                No Note Selected
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Select a note from the sidebar or create a new one to get
                started with your note-taking journey.
              </p>
              <button
                onClick={createNewNote}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white py-3 px-6 rounded-lg flex items-center mx-auto space-x-2 transition-all duration-300 shadow-lg hover:shadow-emerald-900/20 font-medium"
                aria-label="Create new note">
                <Plus size={18} />
                <span>Create New Note</span>
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
          isCollapsed={chatCollapsed}
          onToggle={onChatToggle}
        />
      )}
    </div>
  );
};

export default MainContainer;
