const Base_URL = "http://127.0.0.1:8000";

// export const getNote = async (noteId) => {
//   const res = await fetch(`${Base_URL}/notes/${noteId}`, {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   });
//   return res.json();
// };

// User APIs
export const getUser = async () => {
  const res = await fetch(`${Base_URL}/users/me`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.json();
};

// Notes APIs

export const getNotes = async () => {
  const res = await fetch(`${Base_URL}/notes`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.json();
};

export const addNote = async (note) => {
  const res = await fetch(`${Base_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(note),
  });

  return res.json();
};

export const updateNote = async (noteId, updatedNote) => {
  const res = await fetch(`${Base_URL}/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedNote),
  });

  return res.json();
};

export const deleteNote = async (note_id) => {
  const res = await fetch(`${Base_URL}/notes/${note_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

// ChatBot APIs

export const getAllChats = async () => {
  try {
    const res = await fetch(`${Base_URL}/chats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log("API response:", data);
    return data.chats || [];
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const getChatResponse = async (chatInput) => {
  const res = await fetch(`${Base_URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(chatInput),
  });

  return res.json();
};

export const resetChats = async () => {
  await fetch(`${Base_URL}/chats/reset`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
