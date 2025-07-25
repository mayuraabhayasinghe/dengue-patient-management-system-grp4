const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const startReminderScheduler = require("./utils/reminderScheduler");
// const cleanupOldData = require("./utils/cleanupOldData");
const { setIO, cleanupOldData } = require("./utils/notificationManager");

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
//socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

setIO(io);

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
app.use("/api/vitals", require("./routes/patientVitalsRoutes"));
app.use("/api", require("./routes/notificationRoutes"));
app.use("/api/fluid", require("./routes/fluid"));
app.use("/api/wards", require("./routes/wardRoutes"));
app.use("/api/beds", require("./routes/bedRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  startReminderScheduler(io); // Start the reminder checker

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(cleanupOldData, 60 * 60 * 1000);

// ✅ Start cleanup interval after the server is running
// setInterval(() => {
//   cleanupOldData();
// }, 24 * 60 * 60 * 1000); // Every 1 day
