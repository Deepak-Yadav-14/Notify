// NotesApp.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import { MessageCircle, FileText } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { getUser } from "../services/api";
import { getInitials } from "../utils";

const NotesApp = () => {
  const [showNotesContainer, setShowNotesContainer] = useState(true);
  const [showChatBotContainer, setShowChatBotContainer] = useState(true);
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
        if (userData && userData.username) {
          setUser(userData);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const toggleNotesContainer = () => setNotesCollapsed((prev) => !prev);
  const toggleChatBotContainer = () => setChatCollapsed((prev) => !prev);
  const toggleProfile = () => setShowProfile(!showProfile);

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
      <div className="flex justify-between items-center bg-gray-800/30 backdrop-blur-xl p-4 border-b border-slate-700/50 shadow-2xl z-[100]">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Notify
          </h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={toggleNotesContainer}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center space-x-2 ${
              !notesCollapsed
                ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-900/30"
                : "bg-gray-700/50 hover:bg-gray-600/50"
            }`}>
            <FileText size={16} />
            <span>Notes</span>
          </button>
          <button
            onClick={toggleChatBotContainer}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center space-x-2 ${
              !chatCollapsed
                ? "bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg shadow-teal-900/30"
                : "bg-gray-700/50 hover:bg-gray-600/50"
            }`}>
            <MessageCircle size={16} />
            <span>Notify AI</span>
          </button>
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
