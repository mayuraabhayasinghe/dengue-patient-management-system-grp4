const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const PatientDetails = require("../models/patientModel");
const { validationResult } = require("express-validator"); // Express validator for input validation

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
      user: newUser._id,
      age,
      weight,
      gender,
      bystanderName,
      bystanderAddress,
      admissionDate,
      admissionTime,
      bedNumber,
    });

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

module.exports = { addPatient };
