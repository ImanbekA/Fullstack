from pydantic import BaseModel, ConfigDict


class PhotoBase(BaseModel):
    url: str


class PhotoCreate(PhotoBase):
    assessment_id: int


class PhotoRead(PhotoBase):
    id: int
    assessment_id: int

    model_config = ConfigDict(from_attributes=True)