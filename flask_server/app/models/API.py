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
    res = db.insert_document("expenses", expense)
    return res