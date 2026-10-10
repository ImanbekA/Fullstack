from typing import Optional

from sqlalchemy.orm import Session

from app.models.damage import Damage
from app.schemas.damage import DamageCreate


def get_damage(db: Session, damage_id: int) -> Optional[Damage]:
    return db.query(Damage).filter(Damage.id == damage_id).first()


def get_damages_by_assessment(db: Session, assessment_id: int) -> list[Damage]:
    return db.query(Damage).filter(Damage.assessment_id == assessment_id).all()


def create_damage(db: Session, data: DamageCreate) -> Damage:
    db_damage = Damage(
        assessment_id=data.assessment_id,
        photo_id=data.photo_id,
        type=data.type,
        body_part=data.body_part,
        severity=data.severity,
        estimated_cost=data.estimated_cost,
    )
    db.add(db_damage)
    db.commit()
    db.refresh(db_damage)
    return db_damage


def update_damage(db: Session, damage_id: int, updates: dict) -> Optional[Damage]:
    db_damage = get_damage(db, damage_id)
    if not db_damage:
        return None
    for key, value in updates.items():
        if value is not None:
            setattr(db_damage, key, value)
    db.commit()
    db.refresh(db_damage)
    return db_damage


def delete_damage(db: Session, damage_id: int) -> bool:
    db_damage = get_damage(db, damage_id)
    if not db_damage:
        return False
    db.delete(db_damage)
    db.commit()
    return True