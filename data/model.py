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


# In[33]:


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
x_encoded= hstack([x_vectorized_desc, x_categories.values, x_nums])

# Fit the model and adjust to find the 3 closest neighbors 
nbrs = NearestNeighbors(n_neighbors=4, algorithm='auto')
nbrs.fit(x_encoded)


# In[34]:


# Save the model to disc 

import pickle

# Specify the file path
model_file_path = "model.pkl"

with open(model_file_path, 'wb') as file:
    pickle.dump(nbrs, file)


# In[ ]:




