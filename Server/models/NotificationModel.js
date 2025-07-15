const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bedNumber: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  vital: String,
  value: mongoose.Schema.Types.Mixed,
  condition: String,
});

module.exports = mongoose.model("Notification", notificationSchema);
