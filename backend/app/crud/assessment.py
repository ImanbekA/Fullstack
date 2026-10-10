from typing import Optional

from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.schemas.assessment import AssessmentCreate


def get_assessment(db: Session, assessment_id: int) -> Optional[Assessment]:
    return db.query(Assessment).filter(Assessment.id == assessment_id).first()


def get_assessments_by_user(
    db: Session, user_id: int, skip: int = 0, limit: int = 100
) -> list[Assessment]:
    return (
        db.query(Assessment)
        .filter(Assessment.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_assessment(
    db: Session, user_id: int, data: AssessmentCreate
) -> Assessment:
    db_assessment = Assessment(
        user_id=user_id,
        brand=data.brand,
        model=data.model,
        year=data.year,
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment


def update_assessment(
    db: Session, assessment_id: int, updates: dict
) -> Optional[Assessment]:
    db_assessment = get_assessment(db, assessment_id)
    if not db_assessment:
        return None
    for key, value in updates.items():
        if value is not None:
            setattr(db_assessment, key, value)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment


def delete_assessment(db: Session, assessment_id: int) -> bool:
    db_assessment = get_assessment(db, assessment_id)
    if not db_assessment:
        return False
    db.delete(db_assessment)
    db.commit()
    return True