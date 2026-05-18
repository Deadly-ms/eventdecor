require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const mongoose = require("mongoose");


const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");

const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(clerkMiddleware());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/images", imageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/services", serviceRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err.message);
  res.status(500).json({ error: "Server crashed" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


