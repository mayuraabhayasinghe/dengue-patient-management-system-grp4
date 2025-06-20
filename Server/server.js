const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables
connectDB();     // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For JSON body
app.use(bodyParser.urlencoded({ extended: true })); // For form data

// Default test route
app.get("/", (req, res) => {
  res.send("DengueGuard API is running...");
});

// Routes
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/patients", require("./routes/patientsRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/fluid", require("./routes/fluid"));
app.use("/api/wards", require("./routes/wardRoutes")); // ✅ Make sure this file exists and is correct
app.use("/api/beds", require("./routes/bedRoutes")); // ✅ Make sure this file exists and is correct
app.use("/api/inventory", require("./routes/inventoryRoutes")); // ✅ Also make sure this file exists

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
