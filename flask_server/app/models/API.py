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


# ------------------------ Expenses ------------------------------------ #

def get_expenses():
    documents = find_all_documents("expenses")
    for doc in documents:
        if "date" in doc and isinstance(doc["date"], datetime):
            doc["date"] = doc["date"].strftime("%Y-%m-%d")  # Convert to string format

    return documents


def insert_expense(expense):
    res = insert_document("expenses", expense.to_dict())
    return res


# ---------------------------- TAGS ------------------------------------ #

def get_tags_aggregate():
    collection = get_collection('expenses')
    aggr = list(collection.aggregate([
        {
            "$group": {
                "_id": "$tag",
                "value": {"$sum": "$amount"}
            }
        },
        {
            "$sort": {"value": -1}  # Ordina in ordine decrescente (dal valore più alto al più basso)
        }
    ]))

    return [{'label': i["_id"], 'value': i["value"]} for i in aggr]


def get_monthly_tag_expenses():
    collection = get_collection('expenses')
    pipeline = [
        {
            "$project": {
                "amount": 1,
                "tag": 1,
                "month": {
                    "$dateToString": { "format": "%m-%Y", "date": "$date" }
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "month": "$month",
                    "tag": "$tag"
                },
                "value": { "$sum": "$amount" }
            }
        },
        {
            "$sort": {
                "_id.month": 1,
                "value": -1
            }
        }
    ]
    aggr = list(collection.aggregate(pipeline))
    return [{"month": doc["_id"]["month"], "tag": doc["_id"]["tag"], "value": doc["value"]} for doc in aggr]



# --------------------------- Ratios ------------------------------------ #

def get_extra_ratio():
    collection = get_collection('expenses')
    return collection.aggregate([
        {
            "$group": {
                "_id": "$extra",
                "total_amount": {"$sum": "$amount"},
            }
        }
    ])

