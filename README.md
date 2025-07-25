# 🦆 DuckRacer: Sporting Goods for the Extreme World of Duck Racing

**A MERN + Machine Learning web app that recommends gear for your duck — based on past purchases.**
Created as part of a team project for a learning accelerator.

---

## 🚀 About the Project

This project was built by our team during a learning accelerator program. Between sessions, we held *duck races* to blow off steam — so we decided to build a web app inspired by that fun:
A **sporting goods store for elite competitive ducks** 🦆💨

The app allows users to:

* Browse and shop duck racing equipment
* See product recommendations powered by a **K-Nearest Neighbors (KNN)** machine learning model based on purchase history
* Manage products and orders via a full-stack dashboard

---

## 🧠 Tech Stack

* **Frontend**: React, Bootstrap
* **Backend**: Node.js, Express
* **Database**: MongoDB 
* **Machine Learning**: Python (KNN using scikit-learn, served via Flask)

---

## 🧪 Features

* 🛕️ Interactive product catalog for duck racing gear
* 🧠 ML-driven product recommendations based on user purchases
* 🔐 User authentication and session management
* 📊 Admin dashboard to view orders and inventory
* 🎨 Themed UI tailored for the high-octane duck racing world

---

## 🛠️ Getting Started

To run the project locally:

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/duckracer.git
   cd duckracer
   ```

2. Install dependencies for both server and client:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Start the app:

   ```bash
   # In one terminal for backend
   cd server
   npm start

   # In another terminal for frontend
   cd client
   npm start
   ```

4. (Optional) Set up the Python ML model:

   ```bash
   cd ml
   pip install -r requirements.txt
   python app.py
   ```

---

## 📁 Project Structure

```
duckracer/
├── client/         # React frontend
├── server/         # Express backend
├── ml/             # Python ML service (KNN)
├── .gitignore
├── README.md
└── ...
```

---

## 🧠 How Recommendations Work

Our ML recommendation system uses the **K-Nearest Neighbors (KNN)** algorithm to analyze users’ purchase history and suggest similar products. The model is lightweight and trained on sample data for simplicity — but can be scaled with real user data and retraining pipelines.

---

## ✨ Inspiration

> What started as a joke — racing rubber ducks — became a creative way to learn full-stack dev and basic ML together as a team.

We hope DuckRacer brings a smile to your face, and maybe some inspiration for your next project.

---


