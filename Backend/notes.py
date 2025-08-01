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


async def get_all_notes(curr_user):
  notes = []
  async for note in notes_collection.find({"email": curr_user["email"]}):
    note["id"] = str(note["_id"])
    del note["_id"]
    notes.append(note)

  return notes

async def add_note(note_data, curr_user):
  note_data["email"] = curr_user["email"]
  result = await notes_collection.insert_one(note_data)
  note = await notes_collection.find_one({"email":curr_user["email"] , "_id" : ObjectId(result.inserted_id)})
  if note and note["_id"]:
    note["id"] = str(note["_id"])
    del note["_id"]
  return note


async def update_note(note_id: str, updated_note, curr_user):
  # global notes_db
  updated_note["email"] = curr_user["email"]
  result = await notes_collection.update_one({"email": curr_user["email"] , "_id" : ObjectId(note_id)}, {"$set" : updated_note})
  note = await notes_collection.find_one({"email": curr_user["email"],"_id" : ObjectId(note_id)})
  if note and note["_id"]:
    note["id"] = str(note["_id"])
    del note["_id"]
  return note


async def delete_note(note_id: int, curr_user):
  print("user email : ", curr_user["email"])
  result = await notes_collection.delete_one({"email": curr_user["email"] ,"_id" : ObjectId(note_id)})
  return result.deleted_count > 0
