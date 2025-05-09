from app.db import *

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

def get_expenses_by_tags():
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
# ------------------------ Recurrent Expenses ------------------------------------ #

def get_rec_expenses():

    documents = find_all_documents("recurrent_expenses")
    for doc in documents:
        if "date" in doc and isinstance(doc["date"], datetime):
            doc["date"] = doc["date"].strftime("%Y-%m-%d")  # Convert to string format

    return documents


def insert_recurrent_expense(rec_expense):
    res = insert_document("recurrent_expenses", rec_expense.to_dict())
    return res

def get_recurrent_expenses_by_tags():
    collection = get_collection('recurrent_expenses')
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

# ---------------------------- TAGS ------------------------------------ #

def get_tags():
    documents = find_all_documents("tags")
    return documents

def insert_tags(tag):
    collection = get_collection('tags')
    pipeline = [
        {"$group": {"_id": None, "max_tag_id": {"$max": "$tag_id"}}}
    ]
    result = list(collection.aggregate(pipeline))

    max_id = result[0]['max_tag_id'] if result else 0

    tag.tag_id = max_id +  1
    res = insert_document("tags", tag.to_dict())
    return res

# ---------------------------- METHODS ------------------------------------ #

def get_methods():
    documents = find_all_documents("methods")
    return documents

def insert_methods(method):
    res = insert_document("methods", method.to_dict())
    return res

# ---------------------------- USERS ------------------------------------ #

def get_users():

    documents = find_all_documents("users")
    return documents

def insert_users(user):
    collection = get_collection('users')
    pipeline = [
        {"$group": {"_id": None, "max_id": {"$max": "$user_id"}}}
    ]
    result = list(collection.aggregate(pipeline))

    max_id = result[0]['max_id'] if result else 0
    user.who_id = max_id + 1

    res = insert_document("users", user.to_dict())
    return res

# ---------------------------- ACCOUNTS ------------------------------------ #

def get_account():
    documents = find_all_documents("accounts")
    return documents

def insert_accounts(account):
    res = insert_document("accounts", account.to_dict())
    return res

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