from app.db import *

# -------------------- Testing models ---------------------------------- #

def insert_sample_data():
    """Example of inserting data into MongoDB"""
    collection = db.test_collection
    collection.insert_one({"name": "Alice", "age": 25})


def find_all_items():
    """Example of querying MongoDB"""
    collection = db.test_collection
    return list(collection.find())

# ----------------------------------------------------------------------- #

def get_expenses():
    return  find_all_documents("expenses")

def insert_expense(expense):
    res = insert_document("expenses", expense.to_dict())
    return res

# ------------------------------------------------------------------------ #

def get_tags_aggregate():
    collection = get_collection('expenses')
    return collection.aggregate([
        {
            "$group": {
                "_id": "$tag",
                "total_amount": {"$sum": "$amount"}
            }
        }
    ])

def get_extra_ratio():
    collection = get_collection('expenses')
    return collection.aggregate([
        {
            "$group": {
                "_id": "$extra",
                "total_amount": {"$sum": "$amount"}
            }
        }
    ])

