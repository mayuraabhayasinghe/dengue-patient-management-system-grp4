const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  age: {
    type: Number,
    required: [true, 'Please add an age'],
    min: [0, 'Age must be at least 0'],
    max: [120, 'Age must be less than 120']
  },
  status: {
    type: String,
    required: [true, 'Please add a status'],
    enum: [
      'Active',
      'Recovered',
      'Critical',
      'Monitoring'
    ],
    default: 'Active'
  },
  ward: {
    type: String,
    required: [true, 'Please add a ward'],
    trim: true
  },
  bloodType: {
    type: String,
    required: [true, 'Please add a blood type'],
    enum: [
      'A+',
      'A-',
      'B+',
      'B-',
      'AB+',
      'AB-',
      'O+',
      'O-'
    ]
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);