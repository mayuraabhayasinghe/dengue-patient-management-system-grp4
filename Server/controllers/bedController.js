const Bed = require("../models/bedModel");
const Ward = require("../models/wardModel");
const Patient = require("../models/patientModel"); // Import Patient model

// Get all beds
const getAllBeds = async (req, res) => {
    try {
        const beds = await Bed.find()
            .populate("ward")
            .populate({
                path: "patient",
                select: "age user gender admissionDate",
                populate: {
                    path: "user", // populate the `user` field inside `patient`
                    select: "name email role" // fields you want from the user model
                }
            });
        res.status(200).json(beds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get a single bed by ID
const getBedById = async (req, res) => {
    try {
        const bed = await Bed.findById(req.params.id)
            .populate("ward", "name type")
            .populate("patient", "name age gender"); // Add fields as needed
        if (!bed) return res.status(404).json({ message: "Bed not found" });
        res.status(200).json(bed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new bed
const createBed = async (req, res) => {
    const { number, ward } = req.body;
    try {
        const existingBed = await Bed.findOne({ number });
        if (existingBed) {
            return res.status(400).json({ message: "Bed with this number already exists" });
        }
        // Check if the ward exists
        const wardExists = await Ward.findById(ward);
        if (!wardExists) {
            return res.status(400).json({ message: "Ward not found" });
        }
        const newBed = new Bed({
            number,
            ward,
            status: "available", // Default status
            patient: null, // Initially no patient assigned
            admissionDate: null, // Initially no admission date
        });

        await newBed.save();
        const savedBed = await Bed.findById(newBed._id)
            .populate("ward", "name type")
            .populate("patient", "name age gender");

        res.status(201).json(savedBed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a bed
const updateBed = async (req, res) => {
    try {
        const updatedBed = await Bed.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .populate("ward", "name type")
            .populate("patient", "name age gender");

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

module.exports = {
    getAllBeds,
    getBedById,
    createBed,
    updateBed,
    deleteBed,
};
