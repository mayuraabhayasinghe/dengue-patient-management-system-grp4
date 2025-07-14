const Bed = require("../models/bedModel");
const Ward = require("../models/wardModel");

// Get all beds
const getAllBeds = async (req, res) => {
    try {
        const beds = await Bed.find().populate("ward", "name type");
        res.status(200).json(beds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single bed by ID
const getBedById = async (req, res) => {
    try {
        const bed = await Bed.findById(req.params.id).populate("ward", "name type");
        if (!bed) return res.status(404).json({ message: "Bed not found" });
        res.status(200).json(bed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new bed
const createBed = async (req, res) => {
    const { number, status, patient, admissionDate, ward } = req.body;
    try {
        // Check if the ward exists
        const wardExists = await Ward.findById(ward);
        if (!wardExists) {
            return res.status(400).json({ message: "Ward not found" });
        }

        const newBed = new Bed({
            number,
            status,
            patient,
            admissionDate,
            ward,
        });

        await newBed.save();
        res.status(201).json(newBed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a bed
const updateBed = async (req, res) => {
    try {
        const updatedBed = await Bed.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBed) return res.status(404).json({ message: "Bed not found" });
        res.status(200).json(updatedBed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a bed
const deleteBed = async (req, res) => {
    try {
        const deletedBed = await Bed.findByIdAndDelete(req.params.id);
        if (!deletedBed) return res.status(404).json({ message: "Bed not found" });
        res.status(200).json({ message: "Bed deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { deleteBed, updateBed, getAllBeds, getBedById, createBed }