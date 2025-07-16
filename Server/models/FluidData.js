const mongoose = require("mongoose");

const FluidSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientDetails",
    required: true,
  },
  fluidKind: { type: String, default: "Not mentioned" },
  intakeType: { type: String, default: "Not mentioned" },
  intakeVolume: { type: Number, default: 0 },
  urineOutput: { type: Number, default: 0 },
  outputTypes: { type: [String], default: [] },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FluidData", FluidSchema);
