import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGO_DB_URL);
let db;

export const connectDB = async() => {
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME);
    console.log("connected to mongodb");
}

export const getDB = () => {
    return db;
}
