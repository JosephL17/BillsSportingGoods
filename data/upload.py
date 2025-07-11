"""Run this code to upload a products json file"""

from pymongo import MongoClient
import json

def upload_products(url, filename):
    """Function that connects to mongo db though the given url 
    and uploads the given products as a json object"""

    # Read from a JSON file
    with open(filename, "r", encoding="utf-8") as file:
        products = json.load(file)

    client = MongoClient(url)
    db = client['billssportinggoods']
    collection = db['products']
    result = collection.insert_many(products)
    print("Products successfully uploaded")


if __name__ == "__main__":
    # Upload the json file to Mongo db 
    upload_products("mongodb://localhost:27017", "products.json")