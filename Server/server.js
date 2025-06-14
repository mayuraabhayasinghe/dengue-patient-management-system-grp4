const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const inventoryRoutes = require("./routes/inventoryRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
//app.use(cors());
const corsOptions = {
  origin: [
    "http://localhost:5173",   // Add your React dev server port here
    "http://localhost:3000",   // Optional: other dev frontend ports
    "https://yourfrontenddomain.com"  // Production domain if any
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("DengueGuard API is running...");
});

// Routes:
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/patients", require("./routes/patientsRoutes")); // Updated this line
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/fluid", require("./routes/fluid"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});