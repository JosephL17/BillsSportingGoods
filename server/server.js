import express from "express";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs'

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;
const order_collection = process.env.MONGO_DB_ORDERS;
const user_collection = process.env.MONGO_DB_USER;

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Hello World")
});

// Endpoint for users to register
app.post('/api/register', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = {
            "email" : req.body.email,
            "password": hashedPassword
        };
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(user_collection);
        await collection.insertOne(newUser);
        res.status(201).json({ message: "Successfully Registered!" });
    } catch (err) {
        console.log('ERROR: ', err);
        res.status(400).send("FAILED SIGN UP");
    };
});

// Endpoint for users to login
app.post('/api/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(user_collection);
        const user = await collection.findOne({ "email" : email });
        const isMatch = await bcrypt.compare(password, user.password);
        isMatch ? res.status(200).send("User Logged In!") : res.status(400).send("INVALID CREDENTIALS")
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send("Failed To Login")
    }
})
//  All products endpoint that returns everything
app.get('/api/all_products', async(req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(500).send("ERROR fetching all products!")
    }
});

// Search endpoint that returns products matching search term
app.post('/api/products/search', async(req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        const products = await collection.find({ "product name": regex}).toArray(); 
        res.json(products)
    } catch (err) {
        console.log("ERROR: ", err)
        res.status(404).send("ITEM NOT FOUND", searchTerm);
    }
});

// Endpoint that returns a single product based on product id
app.get('/api/products/:product_id', async(req, res) => {
    try {
        const { product_id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const item = await collection.findOne({ "sku": product_id});
        res.send(item)
    } catch (err) {
        console.log("ERROR: ITEM NOT FOUND")
        res.status(404).send("ITEM NOT FOUND")
    }
});

// Endpoint to submit orders
app.post('/api/orders', async(req, res) => {
    try {
        const { products, price, shipping_address } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(order_collection);
        const order = {
            "products": products,
            "price": price,
            "shipping_address": shipping_address,
        };
        const result = await collection.insertOne(order);
        res.status(201).send("Order Submited Succesfully!");
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(500).send("INTERNAL SERVER ERROR")
    }
});

// TODO: PREDICT ENDPOINT BROKEN, CURRENT FIX IS TO BYPASS EXPRESS AND USE FLASK SERVER DIRECTLY

// Endpoint that sends input to ML model and returns prediction
// app.post('/api/predict', async(req, res) => {
//     try {
//         const { data } = req.body;
//         const flaskResponse = await fetch(process.env.MODEL_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ input_data: data }),
//         });
//         const flaskResult = await flaskResponse.json();
//         res.send({ prediction : flaskResult.prediction });
//     } catch (err) {
//         console.log('ERROR: ', err)
//         res.status(500).send("INTERNAL SERVER ERROR")
//     }
// });

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});