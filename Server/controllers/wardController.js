const Ward = require("../models/wardModel");

// Create ward
const createWard = async (req, res) => {
  try {
    const ward = new Ward(req.body);
    const saved = await ward.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating ward", error });
  }
};

// Get all wards
const getWards = async (req, res) => {
  try {
    const wards = await Ward.find();
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wards", error });
  }
};

module.exports = { createWard, getWards };
