const Ward = require("../models/wardModel");

// Create a new ward
const createWard = async (req, res) => {
  try {
    const ward = new Ward(req.body);
    const saved = await ward.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating ward", error: error.message });
  }
};

// Get all wards
const getWards = async (req, res) => {
  try {
    const wards = await Ward.find();
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wards", error: error.message });
  }
};

// Get a single ward by ID
const getWardById = async (req, res) => {
  try {
    const ward = await Ward.findById(req.params.id);
    if (!ward) {
      return res.status(404).json({ message: "Ward not found" });
    }
    res.status(200).json(ward);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ward", error: error.message });
  }
};

// Update a ward by ID
const updateWard = async (req, res) => {
  try {
    const updatedWard = await Ward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWard) {
      return res.status(404).json({ message: "Ward not found to update" });
    }
    res.status(200).json(updatedWard);
  } catch (error) {
    res.status(400).json({ message: "Failed to update ward", error: error.message });
  }
};

// Delete a ward by ID
const deleteWard = async (req, res) => {
  try {
    const deletedWard = await Ward.findByIdAndDelete(req.params.id);
    if (!deletedWard) {
      return res.status(404).json({ message: "Ward not found to delete" });
    }
    res.status(200).json({ message: "Ward deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ward", error: error.message });
  }
};

module.exports = {
  createWard,
  getWards,
  getWardById,
  updateWard,
  deleteWard,
};

