const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const novelRoutes = require("./routes/novel");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT
app.use("/api/auth", authRoutes);
app.use("/api/novels", novelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));