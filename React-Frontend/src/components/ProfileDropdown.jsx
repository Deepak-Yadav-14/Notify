import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, Edit2, Check, X } from "lucide-react";
import { updateUsername } from "../services/api"; // Placeholder API function

const ProfileDropdown = ({
  user,
  onUsernameUpdate,
  onLogout,
  isOpen,
  onClose,
  triggerRef,
  getInitials,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUsername(user?.username || "");
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
        setIsEditing(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleSaveUsername = async () => {
    if (username.trim() && username !== user?.username) {
      try {
        await updateUsername(username.trim()); // Implement this API call
        onUsernameUpdate(username.trim());
      } catch (error) {
        console.error("Failed to update username:", error);
        // Add error feedback if needed
      }
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setUsername(user?.username || "");
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full right-0 mt-2 ${
        isEditing ? "w-96" : "w-80"
      } bg-gray-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-[110] overflow-hidden`}>
      <div className="p-6 bg-gradient-to-r from-blue-600/20 to-teal-600/20 border-b border-slate-700/50">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white text-xl font-medium">
              {getInitials(user?.username)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveUsername();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSaveUsername}
                  className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded-lg transition-all duration-200">
                  <Check size={15} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200">
                  <X size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 group">
                <h3 className="text-white font-semibold text-lg truncate">
                  {user?.username || "Unknown User"}
                </h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-all duration-200">
                  <Edit2 size={12} />
                </button>
              </div>
            )}
            <p className="text-gray-400 text-sm truncate">
              {user?.email || "No email provided"}
            </p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <button className="w-full px-6 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 flex items-center space-x-3">
          <Settings size={16} className="text-gray-400" />
          <span>About Us</span>
        </button>
        <div className="border-t border-slate-700/50 my-2"></div>
        <button
          onClick={onLogout}
          className="w-full px-6 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 flex items-center space-x-3">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
