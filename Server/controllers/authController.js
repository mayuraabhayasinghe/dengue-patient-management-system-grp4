const userModel = require("../models/userModel");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const Staff = require("../models/staffModel");
const Patient = require("../models/patientModel");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Missing email or password
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find users with this email
    const users = await User.find({ email });

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    // Check if any user's password matches
    const matchedUser = await Promise.any(
      users.map(async (user) => {
        const isMatch = await user.matchPassword(password);
        if (isMatch) return user;
        throw new Error("Password mismatch");
      })
    ).catch(() => null);

    if (!matchedUser) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Success - send token and user info
    const token = generateToken(matchedUser._id, matchedUser.role);

    res.status(200).json({
      token,
      user: {
        id: matchedUser._id,
        name: matchedUser.name,
        role: matchedUser.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const staff = await Staff.find()
      .populate("user") // joins user data
      .sort({ createdAt: -1 });

    const patients = await Patient.find()
      .populate("user") // joins user data
      .sort({ createdAt: -1 });

    // Combine all into one array
    const allUsers = [...staff, ...patients];

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "Failed to fetch Users details" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Try finding in Staff first
    let user = await Staff.findOne({ user: userId }).populate("user");
    if (!user) {
      // If not found in Staff, try Patient
      user = await Patient.findOne({ user: userId }).populate("user");
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

