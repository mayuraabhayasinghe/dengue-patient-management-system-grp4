const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference to User
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, required: true },
  bystanderName: { type: String, required: true },
  bystanderAddress: { type: String, required: true },
  admissionDate: { type: Date, required: true },
  admissionTime: { type: String, required: true },
  bedNumber: { type: String, required: true },
  dischargeDate: { type: Date, default: null }, // initially null
});

module.exports = mongoose.model("PatientDetails", patientSchema);
