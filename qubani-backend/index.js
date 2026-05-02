require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

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
  await client.connect();

  const userCollection = client.db("qurbanihat").collection("users");

  // ✅ REGISTER
  app.post("/register", async (req, res) => {
    const { name, email, photo, password } = req.body;

    const exists = await userCollection.findOne({ email });
    if (exists) return res.status(400).send({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      photo,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await userCollection.insertOne(user);

    res.send({ success: true, message: "Registered successfully" });
  });

  // ✅ LOGIN
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send({ message: "Wrong password" });

    res.send({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    });
  });

  app.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const user = await userCollection.findOne({ email });

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

  // ✅ UPDATE USER PROFILE (name + photo only)
app.put("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const { name, photo } = req.body;

    const result = await userCollection.updateOne(
      { email },
      {
        $set: { name, photo },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

  // get user from database
  app.get("/me", async (req, res) => {
    const email = req.headers.email;

    if (!email) return res.status(401).send({ message: "No email" });

    const user = await userCollection.findOne({ email });

    if (!user) return res.status(404).send({ message: "No user found" });

    res.send({
      name: user.name,
      email: user.email,
      photo: user.photo,
    });
  });

  // google login
  app.post("/google_login", async (req, res) => {
  const { name, email, photo } = req.body;

  let user = await userCollection.findOne({ email });

  if (!user) {
    const newUser = {
      name,
      email,
      photo,
      createdAt: new Date(),
      provider: "google",
    };

    await userCollection.insertOne(newUser);
    user = newUser;
  }

  res.send({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      photo: user.photo,
    },
  });
});
}

run().catch(console.dir);

app.get("/", (req, res) => console.log("Server running"));

app.listen(port, () => console.log("Running on", port));