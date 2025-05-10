const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find users with this email
    const users = await User.find({ email });

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
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
      return res.status(401).json({ message: "Invalid email or password" });
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
