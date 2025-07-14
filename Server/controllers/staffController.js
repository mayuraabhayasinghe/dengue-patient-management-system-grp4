const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Staff = require("../models/staffModel");
const { validationResult } = require("express-validator");

// Add Staff 
const addStaff = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fullname, staffEmail, staffRole, age, phoneNumber, gender } = req.body;

    const rawPassword = `${fullname.slice(0, 3).toLowerCase()}${String(age).slice(-2)}${staffEmail.slice(0, 3).toLowerCase()}#${Math.floor(10 + Math.random() * 90)}`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await User.create({
      name: fullname,
      email: staffEmail,
      password: hashedPassword,
      role: staffRole,
    });

    const newStaff = await Staff.create({
      user: newUser._id,
      fullName: fullname,
      age,
      gender,
      phoneNumber,
      staffStatus: 'inactive'
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailFormat = {
      from: process.env.EMAIL_USER,
      to: staffEmail,
      subject: "DengueGuard Staff Login",
      text: `Hello ${fullname},\n\nHere is your login password (Role: ${staffRole}):\nPassword: ${rawPassword}\n\nPlease keep it safe.\n\nThanks.`,
    };

    await transporter.sendMail(mailFormat);
    res.status(201).json({ message: "Staff registered successfully." });

  } catch (error) {
    console.error("Error in addStaff:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Get All Staff
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate("user", "email role");
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff", error: error.message });
  }
};

// Get Staff by ID
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("user", "email role");
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff", error: error.message });
  }
};

// Update Staff
const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json({ message: "Staff updated successfully", staff: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    // Optional: Also delete associated user account
    await User.findByIdAndDelete(staff.user);

    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};

module.exports = {
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
