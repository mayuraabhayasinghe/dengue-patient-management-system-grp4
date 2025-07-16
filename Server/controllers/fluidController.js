const Fluid = require("../models/FluidData");

const submitFluidData = async (req, res) => {
  try {
    const {
      fluidKind,
      intakeType,
      intakeVolume,
      urineOutput,
      outputTypes,
      patientId,
    } = req.body;

    // if (!fluidKind || !intakeType || !intakeVolume || !urineOutput) {
    //   return res.status(400).json({ error: "All required fields must be filled." });
    // }

    const fluidData = new Fluid({
      fluidKind,
      intakeType,
      intakeVolume: parseFloat(intakeVolume),
      urineOutput: parseFloat(urineOutput),
      outputTypes,
      patientId,
    });

    await fluidData.save();

    res.status(201).json({ message: "Fluid data submitted successfully." });
  } catch (err) {
    console.error("Error saving fluid data:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get fluid data for a patient
const getPatientFluidData = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required",
      });
    }

    // Get all fluid data for this patient, sorted by timestamp (newest first)
    const fluidData = await FluidData.find({ patientId })
      .sort({ timestamp: -1 })
      .lean();

    // Format the data for frontend display
    const formattedData = fluidData.map((entry) => ({
      ...entry,
      formattedDate: new Date(entry.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      formattedTime: new Date(entry.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      // Flag to identify if this entry has input data
      hasInputData:
        entry.fluidKind !== "Not mentioned" ||
        entry.intakeType !== "Not mentioned" ||
        entry.intakeVolume !== 0,
      // Flag to identify if this entry has output data
      hasOutputData: entry.urineOutput !== 0 || entry.outputTypes.length > 0,
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching fluid data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { submitFluidData, getPatientFluidData };
