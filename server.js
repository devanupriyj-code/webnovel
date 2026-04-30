const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const novelRoutes = require("./routes/novel");

const app = express();

// 🔥 MUST BE BEFORE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/novels", novelRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));