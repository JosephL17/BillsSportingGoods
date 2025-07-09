import express from "express"
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collection = process.env.MONGO_DB_COLLECITON;


const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON bodies
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello World")
});

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

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});