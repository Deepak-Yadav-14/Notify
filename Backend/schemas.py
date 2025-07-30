from pydantic import BaseModel, EmailStr

class Token(BaseModel):
  access_token : str
  token_type : str

class TokenData(BaseModel):
  email : EmailStr


class UserCreate(BaseModel):
  username: str
  email : EmailStr
  password : str

class User(BaseModel):
  email : EmailStr
  username : str | None = None

class UserInDB(User):
  hashed_password : str