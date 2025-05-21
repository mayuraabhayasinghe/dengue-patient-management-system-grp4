const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  status: {
    type: String,
    enum: ['Active', 'Recovered', 'Critical', 'Monitoring'],
    default: 'Active'
  },
  ward: {
    type: String,
    required: true,
    trim: true
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
  diagnosis: {
    type: String,
    trim: true
  },
  treatment: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for frequently queried fields
patientSchema.index({ name: 1, status: 1, ward: 1 });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;