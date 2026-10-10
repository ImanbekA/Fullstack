from typing import Optional

from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user_data: UserCreate) -> User:
    db_user = User(
        email=user_data.email,
        nickname=user_data.nickname,
        phone=user_data.phone,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user