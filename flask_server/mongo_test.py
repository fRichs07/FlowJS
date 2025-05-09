from pymongo import MongoClient
import os

# Get the connection string from environment variables (or use a default value)
# MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://mongodb:27017/Flow-container')
MONGO_URI = 'mongodb://localhost:27017/flow'
# Create a client using the connection string
client = MongoClient(MONGO_URI)

# Alternatively, you can also access the database directly:
db = client.flow

# Example: Insert a document into a collection named "test_collection"
collection = db.test_collection
document = {"nome": "Alice", "età": 30}
result = collection.insert_one(document)
print("Documento inserito con id:", result.inserted_id)

# Example: Query the document back
doc = collection.find_one({"nome": "Alice"})
print("Documento trovato:", doc)
