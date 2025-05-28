const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Test route
app.get("/", (req, res) => {
  res.send("DengueGuard API is running...");
});

// Routes:
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/patients", require("./routes/patientsRoutes")); // Using our consolidated routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/vitals", require("./routes/patientVitalsRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});