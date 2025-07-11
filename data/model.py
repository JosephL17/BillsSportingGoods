#!/usr/bin/env python
# coding: utf-8

# In[10]:


from dotenv import load_dotenv
from pymongo import MongoClient
from sklearn.neighbors import NearestNeighbors
import pandas as pd
import os


# In[11]:


# Retrieve the data from mongo db 

load_dotenv()
client = MongoClient(os.getenv("MONGO_DB_URL"))
db = client[os.getenv("MONGO_DB_NAME")]
collection = db['products']
product_data = list(collection.find())


# In[12]:


# Clean the data and place it in a dataframe
df = pd.DataFrame(product_data)
df = df.drop(columns=["_id"])
df.head()


# In[ ]:


# Encode the data so it can be passed to the model
x_encoded = pd.get_dummies(df)

# Fit the model and adjust to find the 3 closest neighbors 
nbrs = NearestNeighbors(n_neighbors=4, algorithm='auto')
nbrs.fit(x_encoded)


# In[16]:


# Save the model to disc 

import pickle

# Specify the file path
model_file_path = "model.pkl"

with open(model_file_path, 'wb') as file:
    pickle.dump(nbrs, file)

