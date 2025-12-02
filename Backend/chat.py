import os
from google import genai
from dotenv import load_dotenv
from typing import List,Dict
from pydantic import BaseModel
from database import notes_collection, chat_collection

load_dotenv()
client = genai.Client(api_key= os.getenv("GOOGLE_API_KEY"), region="asia-south1")

# Create Chats

class Message(BaseModel):
  role : str
  parts : List[Dict[str,str]]

class Chats(BaseModel):
  chats : List[Message] = []


async def get_all_chats(curr_user):
  chat_msgs = Chats()
  async for chat in chat_collection.find({"email":curr_user["email"]}):
    msg = Message(role = chat["role"], parts = chat["parts"])
    chat_msgs.chats.append(msg);
  return chat_msgs

async def chat_with_notes(user_input, curr_user):
  user_chats = await get_all_chats(curr_user)
  
  notes_text = "Notes: \n"
  async for note in notes_collection.find({"email": curr_user["email"]}).sort({"_id": 1}):
    notes_text += "id: "+ str(note["_id"]) + " title: "+ note["title"] + " content: " + note["content"] + "\n"

  # concatenate chats and notes
  notes_context ="System : Use The above query given by User and provide the short response using this notes " + " notes snapshot :" + notes_text
  # generate response
  user_msg = Message(role = "user", parts = [{ "text" : user_input}, {"text" : notes_context}])
  user_chats.chats.append(user_msg) 

  response = client.models.generate_content(
    model = "gemini-2.0-flash",
    contents = user_chats.chats
  )
  # add response in the chats
  bot_msg = Message(role = "model", parts = [{ "text" : response.text}])
  user_chats.chats.append(bot_msg)
  
  # Save user msg and bot msg to database
  user_msg_doc = {
    "email": curr_user["email"],
    "role": user_msg.role,
    "parts": user_msg.parts
  }

  bot_msg_doc = {
    "email": curr_user["email"],
    "role": bot_msg.role,
    "parts": bot_msg.parts
  }

  await chat_collection.insert_many([user_msg_doc,bot_msg_doc])

  return {"reply": response.text}


async def reset_chats(curr_user):
  result = await chat_collection.delete_many({"email":curr_user["email"]})
  if result.deleted_count > 0:
      return {"message": f"Successfully deleted {result.deleted_count} chats"}
  else:
      return {"message": "No chats found to delete"}