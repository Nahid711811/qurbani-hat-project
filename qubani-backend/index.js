require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmsujfj.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const userCollection = client.db("qurbanihat").collection("users");

  // ✅ REGISTER API
  app.post("/register", async (req, res) => {
    try {
      const { name, email, photo, password } = req.body;

      const existingUser = await userCollection.findOne({ email });

      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        name,
        email,
        photo,
        password: hashedPassword,
        createdAt: new Date(),
      };

      const result = await userCollection.insertOne(user);

      res.send({
        success: true,
        message: "User registered successfully",
        insertedId: result.insertedId,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // ✅ LOGIN API
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      res.send({
        success: true,
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
          photo: user.photo,
        },
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("qurbani hat is running");
});

app.listen(port, () => {
  console.log(`qurbani hat is running on port ${port}`);
});