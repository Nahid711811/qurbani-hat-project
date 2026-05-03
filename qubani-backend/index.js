require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// MongoDB URI (SAFE)
// =====================
const uri = `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASS)}@cluster0.zmsujfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// =====================
// Mongo Options
// =====================
const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// =====================
// Cached DB Connection (Vercel Safe)
// =====================
let cachedClient = null;
let cachedDb = null;

async function connectDB() {
  if (cachedClient && cachedDb) {
    return { db: cachedDb };
  }

  cachedClient = new MongoClient(uri, clientOptions);

  await cachedClient.connect();
  await cachedClient.db("admin").command({ ping: 1 }); // 🔥 important

  cachedDb = cachedClient.db("qurbanihat");

  console.log("MongoDB connected");

  return { db: cachedDb };
}

// =====================
// REGISTER
// =====================
app.post("/register", async (req, res) => {
  try {
    const { db } = await connectDB();
    const users = db.collection("users");

    const { name, email, photo, password } = req.body;

    const exists = await users.findOne({ email });
    if (exists) {
      return res.status(400).send({ message: "User exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email,
      photo,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.send({ success: true, message: "Registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).send({ message: error.message });
  }
});

// =====================
// LOGIN
// =====================
app.post("/login", async (req, res) => {
  try {
    const { db } = await connectDB();
    const users = db.collection("users");

    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).send({ message: "Use Google login" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ message: "Wrong password" });
    }

    res.send({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).send({ message: error.message });
  }
});

// =====================
// GET USER
// =====================
app.get("/user/:email", async (req, res) => {
  try {
    const { db } = await connectDB();
    const users = db.collection("users");

    const user = await users.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      name: user.name,
      email: user.email,
      photo: user.photo,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// =====================
// UPDATE USER
// =====================
app.put("/user/:email", async (req, res) => {
  try {
    const { db } = await connectDB();
    const users = db.collection("users");

    const { name, photo } = req.body;

    const result = await users.updateOne(
      { email: req.params.email },
      { $set: { name, photo } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ success: true, message: "Profile updated" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// =====================
// ME (TEMP - NOT SECURE)
// =====================
app.get("/me", async (req, res) => {
  try {
    const { db } = await connectDB();
    const users = db.collection("users");

    const email = req.headers.email;

    if (!email) {
      return res.status(401).send({ message: "No email" });
    }

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      name: user.name,
      email: user.email,
      photo: user.photo,
    });
  } catch {
    res.status(500).send({ message: "Server error" });
  }
});

// =====================
// GOOGLE LOGIN
// =====================
app.post("/google_login", async (req, res) => {
  try {
    const { db } = await connectDB();
    const users = db.collection("users");

    const { name, email, photo } = req.body;

    await users.updateOne(
      { email },
      {
        $setOnInsert: {
          name,
          email,
          photo,
          provider: "google",
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    const user = await users.findOne({ email });

    res.send({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
    res.status(500).send({ message: error.message });
  }
});

// =====================
app.get("/", (req, res) => {
  res.send("Server running");
});

// =====================
module.exports = app;