const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS setup to allow only your custom domain
const corsOptions = {
  origin: "https://yourdomain.com", // Replace with your production domain
  methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
};

// Apply CORS middleware with the custom domain restrictions
app.use(cors(corsOptions));

// Middleware setup to parse incoming JSON requests
app.use(express.json());

// MongoDB connection (updated to remove deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import routes for authentication
const authRoutes = require("./routes/authRoutes");

// Use routes for authentication and user-related requests
app.use("/api/auth", authRoutes);

// Export the app to be used as a serverless function handler
module.exports = app;
