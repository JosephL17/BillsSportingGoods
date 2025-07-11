import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;
const order_collection = process.env.MONGO_DB_ORDERS;

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Hello World")
});

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

// Endpoint that sends input to ML model and returns prediction
app.post('/api/predict', async(req, res) => {
    try {
        const { data } = req.body;

        console.log(data);
        const flaskResponse = await fetch(process.env.MODEL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input_data: data }),
        });
        const flaskResult = await flaskResponse.json();
        res.send({ prediction : flaskResult.prediction });
    } catch (err) {
        console.log('ERROR: ', err)
        res.status(500).send("INTERNAL SERVER ERROR")
    }
});

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});