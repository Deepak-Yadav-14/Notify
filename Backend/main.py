from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import notes
import chat

from typing import Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer



from schemas import UserCreate, UserLogin
from database import user_collection
from auth import *


app = FastAPI()


app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_credentials = True,
  allow_methods = ["*"],
  allow_headers = ["*"]
)


# oauth_2_scheme = OAuth2PasswordBearer(tokenUrl = "token")


# @app.get("/items/")
# async def get_item(token: Annotated[str, Depends(oauth_2_scheme)]):
#   return {"token" : token}

# @app.post("/token")
# async def login():
#   # validate user
#   return token



class NoteModel(BaseModel):
  title: str
  content: str


class User_Input(BaseModel):
  chat_input: str


def get_current_user(Authorization: str = Header(...)):
  try:
    token = Authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
      raise HTTPException(status_code=401, detail="Invalid token")
    return payload
  except Exception:
    raise HTTPException(status_code=401, detail="Invalid or missing token")



@app.get("/notes/{note_id}")
async def get_note( note_id : str, curr_user: Annotated[dict, Depends(get_current_user)]):
  return await notes.get_note(note_id)

@app.get("/notes")
async def get_notes(curr_user: Annotated[dict, Depends(get_current_user)]):
  return await notes.get_all_notes()


@app.post("/notes")
async def create_note(note: NoteModel, curr_user: Annotated[dict, Depends(get_current_user)]):
  return  await notes.add_note(note.model_dump())

@app.put("/notes/{note_id}")
async def update_note(note_id:str , updated_note: NoteModel ,curr_user: Annotated[dict, Depends(get_current_user)]):
  return  await notes.update_note(note_id, updated_note.model_dump())

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str, curr_user: Annotated[dict, Depends(get_current_user)]):
  return  await notes.delete_note(note_id)

@app.post("/chats")
async def get_chat_response(user_input : User_Input, curr_user: Annotated[dict, Depends(get_current_user)]):
  return await chat.chat_with_notes(user_input.chat_input)







# Authentication

# @app.get("/users")
# async def get_users():
#   notes = []
#   async for note in user_collection.find():
#     notes.append(note)
  
#   return notes

@app.post("/register")
async def register(user: UserCreate):
  if await user_collection.find_one({"email" : user.email}):
    raise HTTPException(status_code = 400, detail="Email already registered" )
  
  hashed_pw = hash_password(user.password)
  user_dict = {"username": user.username, "email": user.email, "hashed_password": hashed_pw}
  await user_collection.insert_one(user_dict)
  return {"msg" : "User registered successfully"}

@app.post("/login")
async def login(user: UserLogin):
  found = await user_collection.find_one({"email": user.email})
  if not found or not verify_password(user.password, found["hashed_password"]):
    raise HTTPException(status_code=401, detail="Invalid Credentials")
  
  token = create_Access_Token({"user_id" : str(found["_id"]) , "email": found["email"]})

  return {"access_token": token}


@app.get("/protected")
def protected_route(Authorization : str = Header(...)):
  token = Authorization.split(" ")[1]
  payload = decode_token(token)
  if not payload:
    raise HTTPException(status_code=401, detail="Invalid token")
  return {"msg" : "Access granted", "user": payload}