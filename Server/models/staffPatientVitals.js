const mongoose = require("mongoose");

const staffPatientVitalsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional: nurse/doctor ID
  timestamp: { type: Date, default: Date.now },
  vitals: {
    bodyTemperature: Number,
    pulseRate: Number,
    hctPvc: Number,
    bloodPressureSupine: {
      systolic: Number,
      diastolic: Number,
      meanArterialPressure: Number,
      pulsePressure: Number,
    },
    bloodPressureSitting: {
      systolic: Number,
      diastolic: Number,
    },
    respiratoryRate: Number,
    capillaryRefillTime: Number,
    wbc: Number,
    plt: Number,
    observation: String,
  },
});

module.exports = mongoose.model("staffPatientVital", staffPatientVitalsSchema);
