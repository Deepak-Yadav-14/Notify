from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_DB_URI"))
db = client.get_database("notes_db")
notes_collection = db.get_collection("notes")

user_collection = db.get_collection("users")

chat_collection = db.get_collection("chats")

async def init_db():
    # Create indexes (runs once, safe to call multiple times)
    await notes_collection.create_index([("email", 1), ("_id", 1)])
    await notes_collection.create_index([("email", 1), ("_id", 1)])
    await user_collection.create_index("email", unique=True)