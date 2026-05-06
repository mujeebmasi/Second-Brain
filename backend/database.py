from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGODB_URI")
if not MONGO_URL:
	raise RuntimeError("MONGODB_URI environment variable is required")

client = MongoClient(MONGO_URL)
db = client.second_brain
db.users.create_index("username", unique = True)
