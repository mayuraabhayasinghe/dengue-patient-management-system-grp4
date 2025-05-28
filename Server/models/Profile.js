const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  avatar: {
    type: String
  },
  phoneNumber: {
    type: String,
    match: [/^[0-9]+$/, 'Please enter a valid phone number']
  },
  address: {
    street: String,
    city: String,
    province: String,
    postalCode: String
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  specialization: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    from: Date,
    to: Date
  }],
  experience: [{
    hospital: String,
    position: String,
    from: Date,
    to: Date,
    description: String
  }],
  certifications: [{
    name: String,
    authority: String,
    year: Number
  }],
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // If profile belongs to a staff
  staffDetails: {
    staffId: String,
    schedule: [{
      day: String,
      startTime: String,
      endTime: String
    }]
  },
  // If profile belongs to a patient caretaker
  caretakerDetails: {
    relation: String,
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    }
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);