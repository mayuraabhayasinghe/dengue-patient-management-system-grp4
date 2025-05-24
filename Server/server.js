const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("DengueGuard API is running...");
});

// Future routes:
//app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/fluid", require("./routes/fluid"));


// app.use("/api/patients", require("./routes/patientRoutes"));

// Routes:
app.use("/api/feedback", require("./routes/feedbackRoutes"));
//app.use("/api/patients", require("./routes/patientsRoutes")); // Updated this line
//app.use("/api/auth", require("./routes/authRoutes"));
//app.use("/api/staff", require("./routes/staffRoutes"));

// Routes:
app.use("/api/feedback", require("./routes/feedbackRoutes"));
//app.use("/api/patients", require("./routes/patientsRoutes")); // Updated this line
//app.use("/api/auth", require("./routes/authRoutes"));
//app.use("/api/staff", require("./routes/staffRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
