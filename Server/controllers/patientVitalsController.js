const PatientVitals = require("../models/PatientVitals");

const addVitals = async (req, res) => {
  try {
    const newVitals = new PatientVitals(req.body);
    await newVitals.save();
    res.status(201).json({ message: "PatientVitals saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving vitals:", error);
    res.status(500).json({ message: "Failed to save vitals" });
  }
};

const getAllVitals = async (req, res) => {
  try {
    const vitals = await PatientVitals.find();
    res.status(200).json(vitals);
  } catch (error) {
    console.error("❌ Error retrieving vitals:", error);
    res.status(500).json({ message: "Failed to fetch vitals" });
  }
};

module.exports = { addVitals, getAllVitals };
