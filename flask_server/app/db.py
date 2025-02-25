from pymongo import MongoClient, errors
from bson import ObjectId
from datetime import datetime

client = None
db = None

# Custom function to handle ObjectId and datetime conversion
def custom_serializer(obj):
    if isinstance(obj, ObjectId):
        return str(obj)  # Convert ObjectId to string
    elif isinstance(obj, datetime):
        return obj.isoformat()  # Convert datetime to ISO format
    else:
        return obj


def init_db(app):
    """Initialize MongoDB connection with error handling."""
    global client, db
    mongo_uri = app.config.get('MONGO_URI', "mongodb://localhost:27017/flow")

    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        db = client.get_database()
        # Verifica se la connessione funziona
        client.admin.command('ping')
        print(f"✅ Connected to MongoDB database: {db.name}")
    except errors.ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}")
        db = None
        client = None

def close_db():
    """Close the MongoDB connection."""
    global client
    if client:
        client.close()
        print("MongoDB connection closed.")

def get_collection(collection_name):
    """Fetch a specific collection from MongoDB."""
    if db is not None:
        return db[collection_name]
    raise Exception("No database connection available.")

def find_all_documents(collection_name):
    """Retrieve all documents from a collection."""
    try:
        collection = get_collection(collection_name)
        return list(collection.find({}))  # `{}` to get all documents
    except Exception as e:
        print(f"Error retrieving documents: {e}")
        return []

def find_documents(collection_name, query):
    """Retrieve documents from a collection based on a query."""
    try:
        collection = get_collection(collection_name)
        return list(collection.find(query))
    except Exception as e:
        print(f"Error retrieving documents with query {query}: {e}")
        return []

def insert_document(collection_name, document):
    """Insert a document into the collection."""
    try:
        collection = get_collection(collection_name)
        result = collection.insert_one(document)
        print(f"Inserted document with ID: {result.inserted_id}")
        return result.inserted_id
    except Exception as e:
        print(f"Error inserting document: {e}")
        return e

def delete_document(collection_name, query):
    """Delete documents based on a query."""
    try:
        collection = get_collection(collection_name)
        result = collection.delete_one(query)
        return result.deleted_count
    except Exception as e:
        print(f"Error deleting document: {e}")
        return None

def update_document(collection_name, query, new_values):
    """Update a document based on a query."""
    try:
        collection = get_collection(collection_name)
        result = collection.update_one(query, {"$set": new_values})
        print(f"Updated {result.modified_count} document(s).")
        return result.modified_count
    except Exception as e:
        print(f"Error updating document: {e}")
        return None
