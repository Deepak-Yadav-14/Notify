import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import MainContainer from "./MainContainer";
import { MessageCircle, FileText, User } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { getUser } from "../services/api";

const NotesApp = () => {
  const [showNotesContainer, setShowNotesContainer] = useState(false);
  const [showChatBotContainer, setShowChatBotContainer] = useState(false);
  const [notesCollapsed, setNotesCollapsed] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        const userData = await getUser();
        setUser(userData || { username: "Unknown User", email: "" });
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const toggleNotesContainer = () => {
    setShowNotesContainer(!showNotesContainer);
  };

  const toggleChatBotContainer = () => {
    setShowChatBotContainer((prev) => !prev);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleUsernameUpdate = (newUsername) => {
    setUser((prev) => ({ ...prev, username: newUsername }));
    console.log("Username updated to:", newUsername);
    // Add API call to update username in database if needed
  };

  const handleLogout = () => {
    console.log("User logged out");
    setShowProfile(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUser(null);
    navigate("/login");
  };

  const getInitials = (username) => {
    if (!username) return "NA";
    const parts = username.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
        <div className="text-red-300 text-lg">{error || "Please log in"}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800/30 backdrop-blur-xl p-4 border-b border-slate-700/50 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Talk with Notes
          </h1>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={toggleNotesContainer}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center space-x-2 ${
              showNotesContainer
                ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-900/30"
                : "bg-gray-700/50 hover:bg-gray-600/50"
            }`}>
            <FileText size={16} />
            <span>Notes</span>
          </button>

          <button
            onClick={toggleChatBotContainer}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center space-x-2 ${
              showChatBotContainer
                ? "bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg shadow-teal-900/30"
                : "bg-gray-700/50 hover:bg-gray-600/50"
            }`}>
            <MessageCircle size={16} />
            <span>Notify AI</span>
          </button>

          {/* Profile Button */}
          <div className="relative">
            <button
              ref={profileButtonRef}
              onClick={toggleProfile}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 text-white">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium">
                  {getInitials(user?.username || "Not Available")}
                </div>
              </div>
              <span className="hidden md:block text-sm font-medium">
                {user?.username || "Unknown User"}
              </span>
            </button>

            <ProfileDropdown
              user={user}
              onUsernameUpdate={handleUsernameUpdate}
              onLogout={handleLogout}
              isOpen={showProfile}
              onClose={() => setShowProfile(false)}
              triggerRef={profileButtonRef}
              getInitials={getInitials}
            />
          </div>
        </div>
      </div>

      <MainContainer
        showNotesContainer={showNotesContainer}
        showChatBotContainer={showChatBotContainer}
        notesCollapsed={notesCollapsed}
        chatCollapsed={chatCollapsed}
        onNotesToggle={() => setNotesCollapsed(!notesCollapsed)}
        onChatToggle={() => setChatCollapsed(!chatCollapsed)}
      />
    </div>
  );
};

export default NotesApp;
