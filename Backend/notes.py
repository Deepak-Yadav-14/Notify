from typing import List
from pydantic import BaseModel

class Note(BaseModel):
  id : int
  title : str
  content : str

notes_db : List[Note] = []
id_counter = 1


def get_all_notes():
  return notes_db

def add_note(note_data):
  global id_counter
  new_note = Note(id = id_counter, title = note_data.title, content = note_data.content)
  notes_db.append(new_note)
  id_counter += 1
  return new_note

def update_note(note_id: int, updated_note):
  global notes_db
  for note in notes_db:
    if note.id == note_id:
      note.title = updated_note.title
      note.content = updated_note.content
      return note
  return {"error": "Note not found"}

def delete_note(note_id: int):
    global notes_db
    initial_length = len(notes_db)
    notes_db = [note for note in notes_db if note.id != note_id]
    if len(notes_db) < initial_length:
        print(notes_db)
        return {"message": "Deleted"}
    return {"error": notes_db}