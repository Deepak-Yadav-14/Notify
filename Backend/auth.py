from passlib.context import CryptContext
from jose import jwt,JWTError
import os
from dotenv import load_dotenv
from datetime import timedelta, datetime, timezone

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

def hash_password(password):
  return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)

def create_Access_Token(data: dict , expires_delta = timedelta(hours = 1)):
  to_encode = data.copy()
  to_encode.update({"exp" : datetime.now(timezone.utc) + expires_delta})
  return jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)

def decode_token(token : str):
  try:
    payload = jwt.decode(token , SECRET_KEY, ALGORITHM)
    return payload
  except JWTError:
    return None