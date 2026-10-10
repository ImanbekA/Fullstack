from typing import Optional

from sqlalchemy.orm import Session

from app.models.photo import Photo
from app.schemas.photo import PhotoCreate


def get_photo(db: Session, photo_id: int) -> Optional[Photo]:
    return db.query(Photo).filter(Photo.id == photo_id).first()


def get_photos_by_assessment(db: Session, assessment_id: int) -> list[Photo]:
    return db.query(Photo).filter(Photo.assessment_id == assessment_id).all()


def create_photo(db: Session, data: PhotoCreate) -> Photo:
    db_photo = Photo(
        assessment_id=data.assessment_id,
        url=data.url,
    )
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo


def delete_photo(db: Session, photo_id: int) -> bool:
    db_photo = get_photo(db, photo_id)
    if not db_photo:
        return False
    db.delete(db_photo)
    db.commit()
    return True