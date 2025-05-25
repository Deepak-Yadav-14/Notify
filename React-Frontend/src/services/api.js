const Base_URL = "http://127.0.0.1:8000";

export const getNotes = async () => {
  const res = await fetch(`${Base_URL}/notes`);
  return res.json();
};

export const addNote = async (note) => {
  const res = await fetch(`${Base_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  return res.json();
};

export const updateNote = async (noteId, updatedNote) => {
  const res = await fetch(`${Base_URL}/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedNote),
  });

  return res.json();
};

export const deleteNote = async (note_id) => {
  await fetch(`${Base_URL}/notes/${note_id}`, {
    method: "DELETE",
  });
};
