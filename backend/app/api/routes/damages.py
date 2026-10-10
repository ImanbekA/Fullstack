from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import damage as damage_crud
from app.schemas.damage import DamageCreate, DamageRead, DamageUpdate

router = APIRouter(prefix="/damages", tags=["damages"])


@router.get("/{damage_id}", response_model=DamageRead)
def get_damage(damage_id: int, db: Session = Depends(get_db)):
    damage = damage_crud.get_damage(db, damage_id)
    if not damage:
        raise HTTPException(status_code=404, detail="Damage not found")
    return damage


@router.post("/", response_model=DamageRead, status_code=status.HTTP_201_CREATED)
def create_damage(data: DamageCreate, db: Session = Depends(get_db)):
    return damage_crud.create_damage(db, data)


@router.put("/{damage_id}", response_model=DamageRead)
def update_damage(damage_id: int, updates: DamageUpdate, db: Session = Depends(get_db)):
    updated = damage_crud.update_damage(db, damage_id, updates.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Damage not found")
    return updated


@router.delete("/{damage_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_damage(damage_id: int, db: Session = Depends(get_db)):
    if not damage_crud.delete_damage(db, damage_id):
        raise HTTPException(status_code=404, detail="Damage not found")