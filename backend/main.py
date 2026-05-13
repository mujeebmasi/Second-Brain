from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from database import db
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
import secrets
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable is required")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/signin")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SignupSchema(BaseModel):
    username: str
    email: str
    password: str

class ContentSchema(BaseModel):
    title: str
    link: str
    tags: list[str]
    description: str | None = None
    type: str | None = None



def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("username")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.users.find_one({"username": username})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")



@app.post("/api/v1/signup")
def signup(data: SignupSchema):
    if db.users.find_one({"username": data.username}):
        raise HTTPException(status_code=409, detail="Username already exists")
    db.users.insert_one({
        "username": data.username,
        "email": data.email,
        "password": pwd_context.hash(data.password)
    })
    return {"message": "User signed up successfully"}


@app.post("/api/v1/signin")
def signin(form: OAuth2PasswordRequestForm = Depends()):
    user = db.users.find_one({"username": form.username})
    if not user:
        raise HTTPException(status_code=401, detail="User does not exist")
    if not pwd_context.verify(form.password, user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")
    token = jwt.encode({"username": user["username"]}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}


@app.post("/api/v1/content")
def create_content(data: ContentSchema, user=Depends(get_current_user)):
    db.content.insert_one({
        "title": data.title,
        "link": data.link,
        "tags": data.tags,
        "description": data.description,
        "type": data.type,
        "userId": user["_id"]
    })
    return {"message": "Content added successfully"}


@app.get("/api/v1/content")
def get_content(user=Depends(get_current_user)):
    contents = list(db.content.find({"userId": user["_id"]}))
    result = []
    for item in contents:
        result.append({
            "id": str(item["_id"]),
            "title": item["title"],
            "link": item["link"],
            "tags": item["tags"],
            "description": item.get("description"),
            "type": item.get("type"),
            "username": user["username"]
        })
    return {"success": True, "content": result}


@app.delete("/api/v1/content/{content_id}")
def delete_content(content_id: str, user=Depends(get_current_user)):
    from bson import ObjectId
    deleted = db.content.delete_one({
        "_id": ObjectId(content_id),
        "userId": user["_id"]
    })
    if deleted.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Content not found")
    return {"message": "Content deleted successfully"}


@app.post("/api/v1/brain/share")
def share_brain(user=Depends(get_current_user)):
    share_token = secrets.token_urlsafe(16)
    db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"shareLink": share_token}}
    )
    return {"shareLink": share_token}


@app.get("/api/v1/brain/{shareLink}")
def get_shared_brain(shareLink: str):
    user = db.users.find_one({"shareLink": shareLink})
    if not user:
        raise HTTPException(status_code=404, detail="Shared brain not found")
    contents = list(db.content.find({"userId": user["_id"]}, {"_id": 0}))
    return {"username": user["username"], "content": contents}