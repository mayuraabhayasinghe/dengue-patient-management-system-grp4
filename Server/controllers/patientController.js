const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const PatientDetails = require("../models/patientModel");
const { validationResult } = require("express-validator"); // Express validator for input validation
const Bed = require("../models/bedModel");

const addPatient = async (req, res) => {
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
    } = req.body;

    // // Check if email already exists in the system
    // const existingUser = await User.findOne({ email: bystanderEmail });
    // if (existingUser) {
    //   return res.status(400).json({ message: "Bystander's email is already in use." });
    // }

    // // Check if bystander's address already exists
    // const existingAddress = await PatientDetails.findOne({ bystanderAddress });
    // if (existingAddress) {
    //   return res.status(400).json({ message: "Bystander's address is already associated with another patient." });
    // }

    // Check if bed number already exists
    const existingBedNumber = await PatientDetails.findOne({ bedNumber });
    if (existingBedNumber) {
      return res.status(400).json({ message: "Bed number is already in use." });
    }

    // // Validate age (ensure it's a positive number and within a realistic range)
    // if (age <= 0 || age > 120) {
    //   return res.status(400).json({ message: "Invalid age entered." });
    // }

    // Validate weight (ensure it's a positive number)
    if (weight <= 0) {
      return res.status(400).json({ message: "Invalid weight entered." });
    }

    // Validate admission and discharge dates if present
    if (admissionDate && new Date(admissionDate) > new Date()) {
      return res
        .status(400)
        .json({ message: "Admission date cannot be in the future." });
    }

    // Generating the password
    const namePart = name.slice(0, 3).toLowerCase();
    const agePart = String(age).slice(-2);
    const emailPart = bystanderEmail.slice(0, 3).toLowerCase();
    const randomPart = Math.floor(10 + Math.random() * 90); // 2-digit number
    const rawPassword = `${namePart}${agePart}${emailPart}#${randomPart}`;

    // Hash the password to store in the user collection
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Create user entry
    const newUser = await User.create({
      name,
      email: bystanderEmail,
      password: hashedPassword,
      role: "patient",
    });

    // Create PatientDetails entry
    const newPatientDetails = await PatientDetails.create({
      user: newUser.id,
      age,
      weight,
      gender,
      bystanderName,
      bystanderAddress,
      admissionDate,
      admissionTime,
      bedNumber,
    });

    // Update the bed with patient ID
    const updatedBed = await Bed.findOneAndUpdate(
      { number: bedNumber },
      {
        patient: newPatientDetails.id,
        status: "occupied",
      },
      { new: true }
    );

    if (!updatedBed) {
      return res
        .status(404)
        .json({ message: "Bed not found to update with patient" });
    }

    // Send email to bystander with the raw password
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
      text: `Hello ${bystanderName},\n\nHere is the login password for patient ${name}:\n\nPassword: ${rawPassword}\n\nPlease keep it safe.\n\nThank you.`,
    };

    await transporter.sendMail(mailFormat);
    res.status(201).json({ message: "Patient registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

//Fetch all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await PatientDetails.find({
      dischargeDate: null,
    })
      .populate("user", "name email")
      .lean(); // Convert to plain JS object for better performance;

    // Format the data for frontend display
    const formattedPatients = patients.map((patient) => {
      return {
        id: patient._id,
        userId: patient.user._id,
        name: patient.user.name,
        email: patient.user.email,
        weight: patient.weight,
        age: patient.age,
        bystanderAddress: patient.bystanderAddress,
        bedNumber: patient.bedNumber,
        admissionDate: patient.admissionDate,
        gender: patient.gender,
        // Add more fields as needed
      };
    });

    res.status(200).json({
      success: true,
      count: formattedPatients.length,
      data: formattedPatients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve patients" });
  }
};

// Get patient details by ID
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await PatientDetails.findById(id)
      .populate("user", "name email")
      .lean();

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: patient._id,
        userId: patient.user._id,
        name: patient.user.name,
        email: patient.user.email,
        age: patient.age,
        weight: patient.weight,
        gender: patient.gender,
        bystanderName: patient.bystanderName,
        bystanderAddress: patient.bystanderAddress,
        admissionDate: patient.admissionDate,
        admissionTime: patient.admissionTime,
        bedNumber: patient.bedNumber,
        dischargeDate: patient.dischargeDate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// Get patient details by user ID
const getPatientByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find patient details where the user field matches the provided userId
    const patient = await PatientDetails.findOne({ user: userId })
      .populate("user", "name email")
      .lean();

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: "Patient not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: patient._id,
        userId: patient.user._id,
        name: patient.user.name,
        email: patient.user.email,
        age: patient.age,
        weight: patient.weight,
        gender: patient.gender,
        bystanderName: patient.bystanderName,
        bystanderAddress: patient.bystanderAddress,
        admissionDate: patient.admissionDate,
        admissionTime: patient.admissionTime,
        bedNumber: patient.bedNumber,
        dischargeDate: patient.dischargeDate,
      },
    });
  } catch (error) {
    console.error("Error fetching patient by user ID:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  addPatient,
  getAllPatients,
  getPatientById,
  getPatientByUserId,
};
