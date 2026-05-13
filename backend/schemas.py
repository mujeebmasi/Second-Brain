from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# This is what the user sends from React
class NoteCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "General"

# This is what we send back to React (includes the ID from the DB)
class NoteResponse(NoteCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True # This tells Pydantic to work with your DB model