from datetime import datetime

from sqlalchemy import String, Integer, Numeric, DateTime, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    
    brand: Mapped[str] = mapped_column(String(100), nullable=False)
    model: Mapped[str] = mapped_column(String(100), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    
    cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    assessment_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    
    status: Mapped[str] = mapped_column(String(20), default="draft")
    confirmed: Mapped[bool] = mapped_column(Boolean, default=False)

    user: Mapped["User"] = relationship(back_populates="assessments")
    photos: Mapped[list["Photo"]] = relationship(
        back_populates="assessment",
        cascade="all, delete-orphan",
    )
    damages: Mapped[list["Damage"]] = relationship(
        back_populates="assessment",
        cascade="all, delete-orphan",
    )