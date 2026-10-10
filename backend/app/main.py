from fastapi import FastAPI

from app.models import User, Assessment, Photo, Damage  # noqa: F401

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello, CDA!"}