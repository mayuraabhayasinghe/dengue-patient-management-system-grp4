const mongoose = require("mongoose");

const specialAttentionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientDetails",
    required: true,
  },
  reason: { type: String }, // optional reason for special attention
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "SpecialAttentionPatient",
  specialAttentionSchema
);
