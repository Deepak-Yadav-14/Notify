from fastapi import Depends, FastAPI, HTTPException,status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from auth import *
from schemas import Token, UserCreate
from typing import Annotated
import notes
import chat


from fastapi.security import OAuth2PasswordRequestForm

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
async def get_note( note_id : str, curr_user: Annotated[dict, Depends(get_curr_user)]):
  return await notes.get_note(note_id)

@app.get("/notes")
async def get_notes(curr_user: Annotated[dict, Depends(get_curr_user)]):
  return await notes.get_all_notes()


@app.post("/notes")
async def create_note(note: NoteModel, curr_user: Annotated[dict, Depends(get_curr_user)]):
  return  await notes.add_note(note.model_dump())

@app.put("/notes/{note_id}")
async def update_note(note_id:str , updated_note: NoteModel ,curr_user: Annotated[dict, Depends(get_curr_user)]):
  return  await notes.update_note(note_id, updated_note.model_dump())

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str, curr_user: Annotated[dict, Depends(get_curr_user)]):
  return  await notes.delete_note(note_id)

@app.post("/chats")
async def get_chat_response(user_input : User_Input, curr_user: Annotated[dict, Depends(get_curr_user)]):
  return await chat.chat_with_notes(user_input.chat_input)





# Authentication

@app.post("/register")
async def register(user: UserCreate ):
  return register_user(user)
  
@app.post("/login",response_model=Token)
async def login(form_data : OAuth2PasswordRequestForm = Depends()):
  user = authenticate_user(form_data.email , form_data.password)

  if not user:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid Credentials",
      headers={"WWW-AUTHENTICATE": "Bearer"}
    )
  access_token = create_access_token({"sub": user.email})
  return {"access_token": access_token, "token_type": "bearer"}


<<<<<<< Updated upstream
@app.get("/protected")
def protected_route(Authorization : str = Header(...)):
  token = Authorization.split(" ")[1]
  payload = decode_token(token)
  if not payload:
    raise HTTPException(status_code=401, detail="Invalid token")
  return {"msg" : "Access granted", "user": payload}
=======
>>>>>>> Stashed changes
