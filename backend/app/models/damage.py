from sqlalchemy import String, Numeric, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Damage(Base):
    __tablename__ = "damages"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        ForeignKey("assessments.id"),
        nullable=False,
    )
    photo_id: Mapped[int] = mapped_column(
        ForeignKey("photos.id"),
        nullable=False,
    )
    
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    body_part: Mapped[str] = mapped_column(String(50), nullable=False)
    severity: Mapped[str] = mapped_column(String(20), nullable=False)
    estimated_cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0)

    assessment: Mapped["Assessment"] = relationship(back_populates="damages")
    photo: Mapped["Photo"] = relationship(back_populates="damages")