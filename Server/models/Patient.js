const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Recovered', 'Critical', 'Monitoring'],
    default: 'Active'
  },
  ward: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  diagnosis: String,
  treatment: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);