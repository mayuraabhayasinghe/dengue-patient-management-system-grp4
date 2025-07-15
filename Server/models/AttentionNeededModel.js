const mongoose = require("mongoose");

const specialAttentionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bedNumber: {
    type: String,
    required: true,
  },
  lastCritical: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  "SpecialAttentionPatient",
  specialAttentionSchema
);

// const specialAttentionSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "PatientDetails",
//     required: true,
//   },
//   reason: { type: String }, // optional reason for special attention
//   timestamp: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model(
//   "SpecialAttentionPatient",
//   specialAttentionSchema
// );
