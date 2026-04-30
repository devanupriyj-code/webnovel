const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

// 🔹 Prisma setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 🔹 Router
const router = express.Router();


// 🔐 REGISTER
router.post("/register", async (req, res) => {
  console.log("BODY RECEIVED:", req.body); // 👈 DEBUG

  try {
    if (!req.body) {
      return res.status(400).json("No body received");
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json("Missing fields");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.json(user);
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json("Error registering user");
  }
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json("Error logging in");
  }
});

module.exports = router;