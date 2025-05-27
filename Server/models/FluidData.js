const mongoose = require("mongoose");

const FluidSchema = new mongoose.Schema({
  fluidKind: String,
  intakeType: String,
  intakeVolume: Number,
  urineOutput: Number,
  outputTypes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FluidData", FluidSchema);