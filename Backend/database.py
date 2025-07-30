from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_DB_URI"))
db = client.get_database("notes_db")
notes_collection = db.get_collection("notes")

user_collection = db.get_collection("users")