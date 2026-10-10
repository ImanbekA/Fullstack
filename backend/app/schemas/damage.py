from typing import Optional

from pydantic import BaseModel, ConfigDict


class DamageBase(BaseModel):
    type: str
    body_part: str
    severity: str


class DamageCreate(DamageBase):
    assessment_id: int
    photo_id: int
    estimated_cost: float = 0


class DamageUpdate(BaseModel):
    type: Optional[str] = None
    body_part: Optional[str] = None
    severity: Optional[str] = None
    estimated_cost: Optional[float] = None


class DamageRead(DamageBase):
    id: int
    assessment_id: int
    photo_id: int
    estimated_cost: float

    model_config = ConfigDict(from_attributes=True)