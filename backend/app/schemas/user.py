from datetime import datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class UserBase(BaseModel):
    email: EmailStr
    nickname: str
    phone: str


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int
    registration_date: datetime

    model_config = ConfigDict(from_attributes=True)