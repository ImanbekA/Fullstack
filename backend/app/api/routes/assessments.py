from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.crud import assessment as assessment_crud
from app.schemas.assessment import AssessmentCreate, AssessmentRead, AssessmentUpdate

router = APIRouter(prefix="/assessments", tags=["assessments"])


@router.get("/", response_model=list[AssessmentRead])
def list_assessments(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return assessment_crud.get_assessments_by_user(db, user_id=user_id, skip=skip, limit=limit)


@router.get("/{assessment_id}", response_model=AssessmentRead)
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    assessment = assessment_crud.get_assessment(db, assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment


@router.post("/", response_model=AssessmentRead, status_code=status.HTTP_201_CREATED)
def create_assessment(user_id: int, data: AssessmentCreate, db: Session = Depends(get_db)):
    return assessment_crud.create_assessment(db, user_id=user_id, data=data)


@router.put("/{assessment_id}", response_model=AssessmentRead)
def update_assessment(assessment_id: int, updates: AssessmentUpdate, db: Session = Depends(get_db)):
    updated = assessment_crud.update_assessment(db, assessment_id, updates.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return updated


@router.delete("/{assessment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_assessment(assessment_id: int, db: Session = Depends(get_db)):
    deleted = assessment_crud.delete_assessment(db, assessment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Assessment not found")