import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collection = process.env.MONGO_DB_COLLECTION;
const order_collection = process.env.MONGO_DB_ORDERS;

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON bodies
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello World")
});

//  All products endpoint that returns everything
app.get('/api/all_products', async(req, res) => {
    try {
        const client = MongoClient.connect(url);
        const db = client(dbName);
        const collection = client(collection);
        const products = await collection.find({}).array();
        res.json(products);
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(500).send("ERROR fetching all products!")
    }
});

// Search endpoint that returns products matching search term
app.get('/api/products/search/', async(req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = MongoClient.connect(url);
        const db = client(dbName);
        const collection = client(collection);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        const products = await collection.find({ "category": regex}).array(); 
        res.json(products)
    } catch (err) {
        console.log("ERROR: ", err)
        res.status(404).send("ITEM NOT FOUND");
    }
});

// Endpoint that returns a single product based on product id
app.get('/api/products/:product_id', async(req, res) => {
    try {
        const { product_id } = req.params;
        const client = MongoClient.connect(url);
        const db = client(dbName);
        const collection = client(collection);
        const item = await collection.findOne({ "category": product_id});
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
        const client = MongoClient.connect(url);
        const db = client(dbName);
        const collection = client(order_collection);
        const order = {"category.orders": {
            "products": products,
            "price": price,
            "shipping_address": shipping_address,
        }};
        const result = await collection.insert(order);
        res.status(201).send("Order Submited Succesfully!");
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(500).send("INTERNAL SERVER ERROR")
    }
});

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});