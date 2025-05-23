const PatientVital = require("../models/staffPatientVitals");
const Notification = require("../models/NotificationModel");
const PatientDetails = require("../models/patientModel");
const User = require("../models/userModel");

// Pass your initialized socket instance when calling this function
exports.submitVitals = async (req, res, next, io) => {
  try {
    const { user, enteredBy, vitals } = req.body;

    // Save vitals to the database
    const newVitals = new PatientVital({ user, enteredBy, vitals });
    await newVitals.save();

    // Fetch patient's name and bed number for notification messages
    const patient = await PatientDetails.findOne({ user }).populate("user");
    if (!patient) return res.status(404).json({ error: "Patient not found." });

    const notifications = [];
    const now = new Date();

    // Conditions to evaluate
    const rules = [
      {
        field: "bodyTemperature",
        condition: (v) => v > 37.5,
        message: (v) => `${patient.user.name}’s body temperature is high - ${v}°C` ,
      },
      {
        field: "wbc",
        condition: (v) => v < 5000,
        message: (v) => `${patient.user.name} has low WBC - ${v}/mm³` ,
      },
      {
        field: "plt",
        condition: (v) => v < 130000,
        message: (v) => `${patient.user.name} has low platelet count - ${v}/mm³` ,
      },
      {
        field: "hctPvc",
        condition: (v) => v > 20,
        message: (v) => `${patient.user.name} has high HCT/PVC - ${v}%` ,
      },
      {
        field: "bloodPressureSupine.systolic",
        condition: (v) => v < 90,
        message: (v) => `${patient.user.name}'s supine systolic BP is low - ${v} mmHg` ,
      },
      {
        field: "bloodPressureSupine.meanArterialPressure",
        condition: (v) => v < 60,
        message: (v) => `${patient.user.name}'s MAP is low - ${v} mmHg` ,
      },
      {
        field: "bloodPressureSupine.pulsePressure",
        condition: (v) => v <= 20,
        message: (v) => `${patient.user.name}'s pulse pressure is critically low - ${v} mmHg` ,
      },
      {
        field: "pulseRate",
        condition: (v) => v > 100,
        message: (v) => `${patient.user.name}'s pulse rate is high - ${v}/min` ,
      },
      {
        field: "respiratoryRate",
        condition: (v) => v > 15,
        message: (v) => `${patient.user.name}'s respiratory rate is elevated - ${v}/min` ,
      },
      {
        field: "capillaryRefillTime",
        condition: (v) => v > 2.5,
        message: (v) => `${patient.user.name}'s CRFT is prolonged - ${v} sec` ,
      },
    ];

    for (const rule of rules) {
      // Support nested fields (e.g., bloodPressureSupine.systolic)
      const path = rule.field.split(".");
      let value = vitals;
      for (const key of path) {
        value = value?.[key];
      }
      if (value !== undefined && rule.condition(value)) {
        const message = rule.message(value);
        const notification = new Notification({
          patientId: patient._id,
          message,
          vital: rule.field,
          value,
          condition: rule.condition.toString(),
          timestamp: now,
        });
        await notification.save();

        // Emit via Socket.IO
        io.emit("new_notification", {
          patientId: patient._id,
          name: patient.user.name,
          bedNumber: patient.bedNumber,
          message,
          time: now,
        });

        notifications.push(notification);
      }
    }

    res.status(201).json({ message: "Vitals submitted", notifications });
  } catch (error) {
    console.error("Vitals Submission Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const addVitals = async (req, res) => {
//   try {
//     const newVitals = new PatientVitals(req.body);
//     await newVitals.save();
//     res.status(201).json({ message: "PatientVitals saved successfully!" });
//   } catch (error) {
//     console.error("❌ Error saving vitals:", error);
//     res.status(500).json({ message: "Failed to save vitals" });
//   }
// };

// const getAllVitals = async (req, res) => {
//   try {
//     const vitals = await PatientVitals.find();
//     res.status(200).json(vitals);
//   } catch (error) {
//     console.error("❌ Error retrieving vitals:", error);
//     res.status(500).json({ message: "Failed to fetch vitals" });
//   }
// };

module.exports = { addVitals };

