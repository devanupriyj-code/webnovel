const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const novelRoutes = require("./routes/novel");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Debug route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/novels", novelRoutes);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));