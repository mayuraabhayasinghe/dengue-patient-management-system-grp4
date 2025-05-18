const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const staffDetails = require("../models/staffModel");
const { validationResult } = require("express-validator"); // Express validator for input validation


const addStaff = async (req, res) => {
  try {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullname,
      staffEmail,
      staffRole,
      age,
      phoneNumber,
      gender,
    } = req.body;

    // Generate raw password
    const namePart = fullname.slice(0, 3).toLowerCase();
    const agePart = String(age).slice(-2);
    const emailPart = staffEmail.slice(0, 3).toLowerCase();
    const randomPart = Math.floor(10 + Math.random() * 90);
    const rawPassword = `${namePart}${agePart}${emailPart}#${randomPart}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Create user
    const newUser = await User.create({
      name: fullname,
      email: staffEmail,
      password: hashedPassword,
      role: staffRole,
    });

    if (!newUser) {
      return res.status(500).json({ message: "User creation failed" });
    }

    // Create staff details
    const newStaffDetails = await staffDetails.create({
      user: newUser._id,
      fullName: fullname,
      age,
      gender,
      phoneNumber,
    });

    if (!newStaffDetails) {
      return res.status(500).json({ message: "Staff details creation failed" });
    }

    // Email notification
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
      text: `Hello ${fullname},\n\nHere is the login password for Staff (Role: ${staffRole}):\n\nPassword: ${rawPassword}\n\nPlease keep it safe.\n\nThank you.`,
    };

    await transporter.sendMail(mailFormat);

    // Success response
    return res.status(201).json({ message: "Staff registered successfully." });
  } catch (error) {
    console.error("Error in addStaff:", error);
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};


module.exports = { addStaff };
