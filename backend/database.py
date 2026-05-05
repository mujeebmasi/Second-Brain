from pymongo import MongoClient
MONGO_URL = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URL)
db = client.second_brain
db.users.create_index("username", unique = True)
