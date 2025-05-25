from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import notes
import chat

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["http://localhost:5173"],
  allow_credentials = True,
  allow_methods = ["*"],
  allow_headers = ["*"]
)



class NoteModel(BaseModel):
  title: str
  content: str


class User_Input(BaseModel):
  chat_input: str


@app.get("/notes")
def get_notes():
  return notes.get_all_notes()


@app.post("/notes")
def create_note(note: NoteModel):
  return notes.add_note(note)

@app.put("/notes/{note_id}")
def update_note(note_id:int , updated_note: NoteModel):
  return notes.update_note(note_id, updated_note)

@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
  return notes.delete_note(note_id)

@app.post("/chats")
def get_chat_response(user_input : User_Input):
  return chat.chat_with_notes(user_input.chat_input, notes.get_all_notes())
