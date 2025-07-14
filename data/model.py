#!/usr/bin/env python
# coding: utf-8

# In[17]:


from dotenv import load_dotenv
from pymongo import MongoClient
from sklearn.neighbors import NearestNeighbors
import pandas as pd
import os


# In[18]:


# Retrieve the data from mongo db 

load_dotenv()
client = MongoClient(os.getenv("MONGO_DB_URL"))
db = client[os.getenv("MONGO_DB_NAME")]
collection = db['products']
product_data = list(collection.find())


# In[19]:


# Clean the data and place it in a dataframe
df = pd.DataFrame(product_data)
df = df.drop(columns=["_id"])
df.head()


# In[ ]:


# Encode the data so it can be passed to the model
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack
from sklearn.preprocessing import StandardScaler

# Vectorize the description field
vectorizer = TfidfVectorizer()
x_vectorized_desc = vectorizer.fit_transform(df['description'])

# One hot encode categorical features
x_categories = pd.get_dummies(df["category"])

# Scale numeric features
scaler = StandardScaler()
x_nums = scaler.fit_transform(df[['price', 'popularity', 'durability']])

# Combine all Encoded data
x_encoded = hstack([x_vectorized_desc, x_categories.values, x_nums])

# Fit the model and adjust to find the 3 closest neighbors 
nbrs = NearestNeighbors(n_neighbors=4, algorithm='auto')
nbrs.fit(x_encoded)


# In[37]:


# Save the model, vectorizer, and scaler to disc 

import pickle

# Specify the file path
model_file_path = "model.pkl"
vectorizer_file_path = "vectorizer.pkl"
scaler_file_path = "scaler.pkl"

with open(model_file_path, 'wb') as file:
    pickle.dump(nbrs, file)

with open(vectorizer_file_path, 'wb') as file:
    pickle.dump(vectorizer, file)

with open(scaler_file_path, 'wb') as file:
    pickle.dump(scaler, file)



# In[38]:


# Save missing categories to disc
import joblib
cats_file_path = "category_columns.pkl"
original_cat_cols = list(x_categories.columns)
joblib.dump(original_cat_cols, cats_file_path)


# In[39]:


# Save the original training data
df.to_pickle("training_data.pkl")


# In[ ]:




