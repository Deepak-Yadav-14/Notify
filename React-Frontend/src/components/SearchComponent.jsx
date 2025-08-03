import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";

const SearchComponent = ({ searchTerm, setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="p-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200" />
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-800/60 border border-gray-600/40 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-gray-800/80 transition-all duration-200 text-sm"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
        {localSearchTerm && (
          <button
            onClick={() => setLocalSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
