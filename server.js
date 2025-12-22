  const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

const app = express();

// 🔹 Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
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

// 🔹 Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "EasyCart Backend Running 🚀",
  });
});

// 🔹 Serve frontend (ONLY IN PRODUCTION)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // React Router fallback (SAFE)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
}

// 🔹 Global error handler (LAST)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
