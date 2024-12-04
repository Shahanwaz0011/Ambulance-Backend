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
  origin: ["https://ambulace-frontend.vercel.app", "http://localhost:5173"], // Replace with your frontend domains
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Enable cookies for cross-origin requests if needed
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware setup to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import routes for authentication
const authRoutes = require("./routes/authRoutes");

// Use routes for authentication and user-related requests
app.use("/api/auth", authRoutes);

// Export the app to be used as a serverless function handler
module.exports = app;
