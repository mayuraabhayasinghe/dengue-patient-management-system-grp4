const Fluid = require("../models/FluidData");


const submitFluidData = async (req, res) => {
  try {
    const { fluidKind, intakeType, intakeVolume, urineOutput, outputTypes } = req.body;

    if (!fluidKind || !intakeType || !intakeVolume || !urineOutput) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const fluidData = new Fluid({
      fluidKind,
      intakeType,
      intakeVolume: parseFloat(intakeVolume),
      urineOutput: parseFloat(urineOutput),
      outputTypes,
    });

    await fluidData.save();

    res.status(201).json({ message: "Fluid data submitted successfully." });
  } catch (err) {
    console.error("Error saving fluid data:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { submitFluidData };