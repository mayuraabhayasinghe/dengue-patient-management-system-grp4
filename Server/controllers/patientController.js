const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Patient = require('../models/Patient');
const PatientDetails = require('../models/patientModel');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');

// @desc    Get all patients with filtering
// @route   GET /api/patients
// @access  Private
exports.getAllPatients = async (req, res) => {
  try {
    // Basic filtering
    const query = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach(el => delete query[el]);

    let patients = Patient.find(query);

    // Sorting
    if (req.query.sort) {
      patients = patients.sort(req.query.sort);
    } else {
      patients = patients.sort('-createdAt');
    }

    // Execute query
    const result = await patients;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get only registered patients (Active or Monitoring)
// @route   GET /api/patients/registered
// @access  Private
exports.getRegisteredPatients = async (req, res) => {
  try {
    // Find patients that have status 'Active' or 'Monitoring'
    const patients = await Patient.find({ 
      status: { $in: ['Active', 'Monitoring'] }
    }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get patient statistics
// @route   GET /api/patients/stats
// @access  Private
exports.getPatientStats = async (req, res) => {
  try {
    const stats = await Patient.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Register new patient
// @route   POST /api/patients/register-patient
// @access  Public
exports.registerPatient = async (req, res) => {
  try {
    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      age,
      weight,
      gender,
      bystanderName,
      bystanderAddress,
      bystanderEmail,
      admissionDate,
      admissionTime,
      bedNumber,
      dischargeDate
    } = req.body;

    // Validate required fields
    if (!name || !age || !weight || !gender || !bystanderName || !bystanderAddress || 
        !bystanderEmail || !admissionDate || !admissionTime || !bedNumber) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate weight (ensure it's a positive number)
    if (weight <= 0) {
      return res.status(400).json({ message: "Invalid weight entered." });
    }

    // Check if bed number already exists
    const existingBed = await Patient.findOne({ bedNumber });
    if (existingBed) {
      return res.status(400).json({
        success: false, 
        message: 'Bed number is already in use'
      });
    }

    // Generate a password for the user
    const namePart = name.slice(0, 3).toLowerCase();
    const agePart = String(age).slice(-2);
    const emailPart = bystanderEmail.slice(0, 3).toLowerCase();
    const randomPart = Math.floor(10 + Math.random() * 90); // 2-digit number
    const tempPassword = `${namePart}${agePart}${emailPart}#${randomPart}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create user
    const newUser = await User.create({
      name,
      email: bystanderEmail,
      password: hashedPassword,
      role: 'patient'
    });

    // Create patient record in Patient model for dashboard
    const newPatient = await Patient.create({
      name,
      email: bystanderEmail,
      age: parseInt(age),
      status: 'Active',
      ward: bedNumber.toString().startsWith('W') ? bedNumber.substring(0, 2) : 'W1',
      bloodType: 'O+', // Default value, can be updated later
      admissionDate: new Date(admissionDate),
      bedNumber,
      diagnosis: 'Suspected dengue, pending confirmation',
      treatment: 'Monitoring',
      notes: `Bystander: ${bystanderName}, Contact: ${bystanderEmail}, Address: ${bystanderAddress}`
    });

    // Create detailed patient record
    const newPatientDetails = await PatientDetails.create({
      user: newUser._id,
      age: parseInt(age),
      weight: parseFloat(weight),
      gender,
      bystanderName,
      bystanderAddress,
      admissionDate: new Date(admissionDate),
      admissionTime,
      bedNumber,
      dischargeDate: dischargeDate ? new Date(dischargeDate) : null
    });

    // Send email to bystander with the password (if email service is configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailFormat = {
          from: process.env.EMAIL_USER,
          to: bystanderEmail,
          subject: "DengueGuard Patient Login",
          text: `Hello ${bystanderName},\n\nHere is the login password for patient ${name}:\n\nPassword: ${tempPassword}\n\nPlease keep it safe.\n\nThank you.`,
        };

        await transporter.sendMail(mailFormat);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue with registration even if email fails
      }
    }

    console.log('Patient registered successfully:', {
      user: newUser._id,
      patientId: newPatient._id,
      detailsId: newPatientDetails._id,
      tempPassword // This would normally not be logged in production
    });

    res.status(201).json({
      success: true,
      data: {
        patientId: newPatient._id,
        name,
        bedNumber,
        tempPassword // This would normally not be sent in production
      },
      message: 'Patient registered successfully'
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error'
    });
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};