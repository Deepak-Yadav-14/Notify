from passlib.context import CryptContext
from dotenv import load_dotenv
from pydantic import EmailStr
from schemas import TokenData
from database import user_collection
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from jose import jwt,JWTError
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def hash_password(password):
  return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)


async def register_user(user):
  if await user_collection.find_one({"email": user.email}):
    raise HTTPException(status_code=400, detail="Email already registered")
  hashed_pw = hash_password(user.password)
  user_dict = {"username": user.username , "email": user.email, "hashed_password":hashed_pw }
  await user_collection.insert_one(user_dict)
  return {"msg" : "User registered successfully"}

async def authenticate_user(email : EmailStr, password: str):
  user_dict = await user_collection.find_one({"email": email})
  if not user_dict or not verify_password(password, user_dict["hashed_password"]):
    return False
  return user_dict
  
def create_access_token(data: dict , expire_time : timedelta | None = None):
  to_encode = data.copy()
  to_encode.update({"exp": datetime.now(timezone.utc) + (expire_time or timedelta(minutes=30))})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_curr_user(token: str = Depends(oauth2_scheme)):
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    email = payload.get("sub")
    if not email:
      raise credentials_exception
    token_data = TokenData(email = email)
  except JWTError:
    raise credentials_exception
  user = await user_collection.find_one({"email": token_data.email})
  if user is None:
    raise credentials_exception
  return user


