const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);  

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
