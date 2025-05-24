const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
// const { setupReminders } = require("./utils/reminderLogic");
const cleanupOldData = require("./utils/cleanupOldData");

dotenv.config();
connectDB();

const app = express();
//socket server
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("DengueGuard API is running...");
});

// Routes:
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/patients", require("./routes/patientListRoutes")); // Updated this line
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/vitals", require("./routes/patientVitalsRoutes"));

io.on("connection", (socket) => {
  console.log("New client connected");
  setupReminders(io); // Start the reminder checker

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Start cleanup interval after the server is running
setInterval(() => {
  cleanupOldData();
}, 24 * 60 * 60 * 1000); // Every 1 day
