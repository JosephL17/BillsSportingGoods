import express from "express"
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON bodies
app.use(express.json());
dotenv.config();


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});