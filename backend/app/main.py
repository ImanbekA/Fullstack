from fastapi import FastAPI

from app.api.routes import users, assessments, photos, damages
from app.models import User, Assessment, Photo, Damage  # noqa: F401

app = FastAPI(title="CDA API", version="0.1.0")

app.include_router(users.router, prefix="/api")
app.include_router(assessments.router, prefix="/api")
app.include_router(photos.router, prefix="/api")
app.include_router(damages.router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "CDA API is running"}