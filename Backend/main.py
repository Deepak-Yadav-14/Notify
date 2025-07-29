from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import notes
import chat

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_credentials = True,
  allow_methods = ["*"],
  allow_headers = ["*"]
)



class NoteModel(BaseModel):
  title: str
  content: str


class User_Input(BaseModel):
  chat_input: str


@app.get("/notes/{note_id}")
async def get_note( note_id : str):
  return await notes.get_note(note_id)

@app.get("/notes")
async def get_notes():
  return await notes.get_all_notes()


@app.post("/notes")
async def create_note(note: NoteModel):
  return  await notes.add_note(note.model_dump())

@app.put("/notes/{note_id}")
async def update_note(note_id:str , updated_note: NoteModel):
  return  await notes.update_note(note_id, updated_note.model_dump())

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str):
  return  await notes.delete_note(note_id)

@app.post("/chats")
async def get_chat_response(user_input : User_Input):
  return await chat.chat_with_notes(user_input.chat_input)
