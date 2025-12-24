const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

const app = express();

// 🔹 Middleware
app.use(
  cors({
    origin: "*", // frontend deployed separately
    credentials: true,
  })
);
app.use(express.json());

// 🔹 Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Connect MongoDB
connectDB();

// 🔹 API Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// 🔹 Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "EasyCart Backend Running 🚀",
  });
});

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🔹 Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
