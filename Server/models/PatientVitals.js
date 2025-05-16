const mongoose = require("mongoose");

const patientVitalsSchema = new mongoose.Schema({
  patientName: String,
  admissionDate: String,
  recordTime: String,
  recordDate: String,
  bodyTemperature: String,
  hct: String,
  pulseRate: String,
  wbc: String,
  plt: String,
  systolicSupine: String,
  diastolicSupine: String,
  pulsePressure: String,
  meanArterialPressure: String,
  systolicSitting: String,
  diastolicSitting: String,
  respiratoryRate: String,
  capillaryRefillTime: String,
  observation: String
}, { timestamps: true });

module.exports = mongoose.model("PatientVitals", patientVitalsSchema);
