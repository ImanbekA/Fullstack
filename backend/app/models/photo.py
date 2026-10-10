from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Photo(Base):
    __tablename__ = "photos"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        ForeignKey("assessments.id"),
        nullable=False,
    )
    url: Mapped[str] = mapped_column(String(500), nullable=False)

    assessment: Mapped["Assessment"] = relationship(back_populates="photos")
    damages: Mapped[list["Damage"]] = relationship(
        back_populates="photo",
        cascade="all, delete-orphan",
    )