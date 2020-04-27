from pymongo import MongoClient
from bson.objectid import ObjectId

db = MongoClient().pe

def bson_to_json(doc):
    T = type(doc)

    if T is list:
        return [
            bson_to_json(val)
            for val in doc
        ]
    elif T is dict:
        return {
            key: bson_to_json(value)
            for key, value
            in doc.items()
        }
    elif T is ObjectId:
        return str(doc)
    else:
        return doc
