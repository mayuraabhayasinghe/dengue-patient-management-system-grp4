const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference to User
  age: Number,
  weight: Number,
  gender: String,
  bystanderName: String,
  bystanderAddress: String,
  admissionDate: Date,
  admissionTime: String,
  bedNumber: String,
  dischargeDate: { type: Date, default: null }, // initially null
});

module.exports = mongoose.model("PatientDetails", patientSchema);
