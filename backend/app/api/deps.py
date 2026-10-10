from typing import Generator

from sqlalchemy.orm import Session

from app.db.database import get_db

DbSession = Generator[Session, None, None]

__all__ = ["DbSession", "get_db"]