import os
from google import genai
from dotenv import load_dotenv
from typing import List,Dict
from pydantic import BaseModel

load_dotenv()
client = genai.Client(api_key= os.getenv("GOOGLE_API_KEY"))

# Create Chats

class Message(BaseModel):
  role : str
  parts : List[Dict[str,str]]

class Chats(BaseModel):
  chats : List[Message] = []


all_chats = Chats()

def chat_with_notes(user_input , notes_db):
  global all_chats
  notes_text = "Notes: \n"
  for note in notes_db:
    notes_text += "id: "+ str(note.id) + " title: "+ note.title + " content: " + note.content + "\n"

  # concatenate chats and notes
  final_input = "User : " + user_input + " System : Use The above query given by User and provide the response using this notes " + notes_text
  # generate response
  print(final_input)
  user_msg = Message(role = "user", parts = [{ "text" : final_input}])
  all_chats.chats.append(user_msg) 

  response = client.models.generate_content(
    model = "gemini-2.0-flash",
    contents = all_chats.chats
  )
  # add response in the chats
  bot_msg = Message(role = "model", parts = [{ "text" : response.text}])
  all_chats.chats.append(bot_msg)

  return {"reply": response.text}


def reset_chats():
  global all_chats
  all_chats.chats = []