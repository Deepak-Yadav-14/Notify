from bson import ObjectId 
from pydantic import BaseModel
from database import notes_collection


class Note(BaseModel):
  id : str
  title : str
  content : str


# id_counter = 1


async def get_note(note_id):
  note = await notes_collection.find_one({"_id" : ObjectId(note_id)});
  note["id"] = str(note["_id"])
  del note["_id"]
  return note


async def get_all_notes():
  notes = []
  async for note in notes_collection.find():
    note["id"] = str(note["_id"])
    del note["_id"]
    notes.append(note)

  return notes

async def add_note(note_data):
   
  result = await notes_collection.insert_one(note_data)
  note = await notes_collection.find_one({"_id" : ObjectId(result.inserted_id)})
  if note and note["_id"]:
    note["id"] = str(note["_id"])
    del note["_id"]
  return note
  # global id_counter
  # new_note = Note( notes_collection.find({_id : note_data.id}), title = note_data.title, content = note_data.content)
  # notes_db.append(new_note)
  # id_counter += 1
  # return new_note

async def update_note(note_id: str, updated_note):
  # global notes_db
  result = await notes_collection.update_one({"_id" : ObjectId(note_id)}, {"$set" : updated_note})
  note = await notes_collection.find_one({"_id" : ObjectId(note_id)})
  if note and note["_id"]:
    note["id"] = str(note["_id"])
    del note["_id"]
  return note
  # for note in notes_collection:

  #   if note.id == note_id:
  #     note.title = updated_note.title
  #     note.content = updated_note.content
  #     return note
  # return {"error": "Note not found"}

async def delete_note(note_id: int):

  result = await notes_collection.delete_one({"_id" : ObjectId(note_id)})
  return result.deleted_count > 0
    # global notes_db
    # initial_length = len(notes_db)
    # notes_db = [note for note in notes_db if note.id != note_id]
    # if len(notes_db) < initial_length:
    #     print(notes_db)
    #     return {"message": "Deleted"}
    # return {"error": notes_db}