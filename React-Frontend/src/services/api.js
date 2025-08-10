const Base_URL = "https://notifymon.vercel.app";

// Helper function to get token
const getToken = () => localStorage.getItem("token");

// User APIs
export const getUser = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Notes APIs
export const getNotes = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const addNote = async (note) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const updateNote = async (noteId, updatedNote) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (note_id) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

// ChatBot APIs
export const getAllChats = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/chats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.chats || [];
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const getChatResponse = async (chatInput) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chatInput),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error getting chat response:", error);
    throw error;
  }
};

export const resetChats = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/chats/reset`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error resetting chats:", error);
    throw error;
  }
};

// Additional User Authentication APIs

export const logout = () => {
  localStorage.removeItem("token");
};

export const updateUsername = async (newUsername) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  try {
    const res = await fetch(`${Base_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username: newUsername }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};
