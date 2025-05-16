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

def delete_node(note_id: int):
  global notes_db
  notes_db = [note for note in notes_db if note.id != note_id]
  return {"message": "Deleted"}