import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import { connectDB, getDB } from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running 🚀" });
});

// ------------------ AUTH ------------------

// Register user
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const db = await getDB();
    const users = db.collection(process.env.MONGO_DB_USER);

    // Prevent duplicate accounts
    const existingUser = await users.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };

    await users.insertOne(newUser);
    res.status(201).json({ message: "Successfully registered!" });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ error: "Failed to sign up" });
  }
});

// Login user
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const db = await getDB();
    const users = db.collection(process.env.MONGO_DB_USER);

    const user = await users.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "User logged in!" });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// ------------------ PRODUCTS ------------------

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const db = await getDB();
    const products = await db
      .collection(process.env.MONGO_DB_COLLECTION)
      .find({})
      .toArray();

    res.json(products);
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ error: "Error fetching all products" });
  }
});

// Search products
app.get("/api/products/search", async (req, res) => {
  try {
    const { q } = req.query; 
    if (!q) return res.status(400).json({ error: "Search query required" });

    const db = await getDB();
    const products = await db
      .collection(process.env.MONGO_DB_COLLECTION)
      .find({ "product name": new RegExp(q, "i") })
      .toArray();

    res.json(products);
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ error: "Error searching products" });
  }
});

// Get product by ID
app.get("/api/products/:sku", async (req, res) => {
  try {
    const { sku } = req.params;
    const db = await getDB();

    const product = await db
      .collection(process.env.MONGO_DB_COLLECTION)
      .findOne({ sku });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// ------------------ ORDERS ------------------

// Submit new order
app.post("/api/orders", async (req, res) => {
  try {
    const { products, price, shipping_address } = req.body;

    if (!products || !price || !shipping_address) {
      return res.status(400).json({ error: "Missing order fields" });
    }

    const db = await getDB();
    const order = { products, price, shipping_address, createdAt: new Date() };

    await db.collection(process.env.MONGO_DB_ORDERS).insertOne(order);

    res.status(201).json({ message: "Order submitted successfully!" });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ error: "Error submitting order" });
  }
});

// ------------------ START SERVER ------------------

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});