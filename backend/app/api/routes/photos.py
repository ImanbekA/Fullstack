from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.crud import photo as photo_crud
from app.schemas.photo import PhotoCreate, PhotoRead

router = APIRouter(prefix="/photos", tags=["photos"])


@router.get("/{photo_id}", response_model=PhotoRead)
def get_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = photo_crud.get_photo(db, photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    return photo


@router.post("/", response_model=PhotoRead, status_code=status.HTTP_201_CREATED)
def create_photo(data: PhotoCreate, db: Session = Depends(get_db)):
    return photo_crud.create_photo(db, data)


@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    if not photo_crud.delete_photo(db, photo_id):
        raise HTTPException(status_code=404, detail="Photo not found")