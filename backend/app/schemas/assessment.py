from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class AssessmentBase(BaseModel):
    brand: str
    model: str
    year: int


class AssessmentCreate(AssessmentBase):
    pass


class AssessmentUpdate(BaseModel):
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    status: Optional[str] = None
    confirmed: Optional[bool] = None


class AssessmentRead(AssessmentBase):
    id: int
    user_id: int
    cost: float
    assessment_date: datetime
    status: str
    confirmed: bool

    model_config = ConfigDict(from_attributes=True)