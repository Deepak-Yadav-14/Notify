import NotesCardContainer from "./NotesCardContainer";
import { Plus, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import SearchComponent from "./SearchComponent";

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
  isCollapsed,
  onToggle,
}) => {
  return (
    <>
      <div
        className={`${
          isCollapsed ? "w-12" : "w-80"
        } bg-gray-800/40 backdrop-blur-xl border-r border-slate-700/50 flex flex-col transition-all duration-300 ease-in-out relative`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <h2 className="text-gray-100 font-semibold">Notes</h2>
              <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
                {notes.length}
              </span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-all duration-200">
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>
        {!isCollapsed && (
          <>
            <SearchComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <div className="flex-1 overflow-y-auto scrollbar-custom">
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
            <div className="p-4 border-t border-slate-700/50">
              <button
                onClick={createNewNote}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 py-2.5 flex justify-center items-center text-white rounded-lg transition-all duration-300 space-x-2 shadow-lg hover:shadow-emerald-900/20 text-sm font-medium">
                <Plus size={16} />
                <span>New Note</span>
              </button>
            </div>
          </>
        )}
        {isCollapsed && (
          <div
            onClick={onToggle}
            className="flex-1 flex flex-col items-center py-4 space-y-4">
            <div className="p-2 text-blue-400">
              <FileText size={20} />
            </div>
            <button
              onClick={createNewNote}
              className="p-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 shadow-lg">
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #4fd1c5 transparent;
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 8px;
          margin: 4px 0;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4fd1c5 0%, #3b82f6 100%);
          border-radius: 8px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5eead4 0%, #60a5fa 100%);
          border-color: rgba(255, 255, 255, 0.1);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default NotesContainer;
