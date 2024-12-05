const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS setup
const corsOptions = {
  origin: ["https://ambulace-frontend.vercel.app", "http://localhost:5173"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Include PATCH
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies/authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware for JSON parsing
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import routes for authentication
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test PATCH route for driver status
app.patch("/api/auth/driver/set-status/:id", (req, res) => {
  // Simulate status update logic
  res.status(200).json({ message: "Driver status updated successfully" });
});

// Export the app for serverless deployment
module.exports = app;
