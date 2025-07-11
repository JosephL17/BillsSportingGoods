from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack, csr_matrix
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model from disk
with open("model.pkl", 'rb') as file:
    model = pickle.load(file)

# Load the vectorizer from disk
with open('vectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

# Load the scaler from disk
with open("scaler.pkl", 'rb') as file:
    scaler = pickle.load(file) 

# Load the original traning data from disk
training_df = pd.read_pickle("training_data.pkl")

# Load original category fields from disk
original_cat_columns = joblib.load("category_columns.pkl")

@app.route('/api/predict', methods = ['POST'])
def predict():
    data = request.get_json(force = True)
    
    # Ensure the data is a list
    if isinstance(data, dict):
        data = [data]

    query_df = pd.DataFrame(data)

    # Transform categories
    query_cat = pd.get_dummies(query_df['category'])

    # Add missing columns to match training data
    for col in original_cat_columns:
        if col not in query_cat:
            query_cat[col] = 0


    # Transform description
    query_desc = vectorizer.transform(query_df['description'])

    # Scale numeric fields
    query_nums = scaler.transform(query_df[['price', 'popularity', 'durability']])

    # Combine 
    query_cat_array = np.asarray(query_cat, dtype =float)
    query_nums_array = np.asarray(query_nums, dtype=float)

    query_cat_sparse = csr_matrix(query_cat_array)
    query_nums_sparse = csr_matrix(query_nums_array)
    query_vector = hstack([query_desc, query_cat_sparse, query_nums_sparse])


    # print(data)
    # # Make a prediction 
    distances, indices = model.kneighbors(query_vector)

    # Get the closest items 
    closest_items = training_df.iloc[indices[0]].copy()
    results = closest_items.to_dict(orient = "records")
    return jsonify(results)


if __name__ == "__main__":
    app.run(port=5000, debug=True)