const PatientVitals = require("../models/staffPatientVitals");

// controllers/vitalsController.js
const Vitals = require("../models/staffPatientVitals");
const Notification = require("../models/NotificationModel");
const AttentionNeeded = require("../models/AttentionNeededModel");
const User = require("../models/userModel");
const PatientDetails = require("../models/patientModel");

// Helper to check conditions and return messages
const checkConditions = (vitals) => {
  const messages = [];

  if (vitals.bodyTemperature > 37.5)
    messages.push({
      condition: "body temperature",
      value: vitals.bodyTemperature,
    });
  if (vitals.wbc < 5000) messages.push({ condition: "WBC", value: vitals.wbc });
  if (vitals.plt < 130000)
    messages.push({ condition: "PLT", value: vitals.plt });
  if (vitals.hctPvc > 20)
    messages.push({ condition: "HCT PVC", value: vitals.hctPvc });

  const bp = vitals.bloodPressureSupine;
  if (bp?.systolic < 90)
    messages.push({ condition: "Supine Systolic BP", value: bp.systolic });
  if (bp?.meanArterialPressure < 60)
    messages.push({ condition: "MAP", value: bp.meanArterialPressure });
  if (bp?.pulsePressure <= 20)
    messages.push({ condition: "Pulse Pressure", value: bp.pulsePressure });

  if (vitals.pulseRate > 100)
    messages.push({ condition: "Pulse Rate", value: vitals.pulseRate });
  if (vitals.respiratoryRate > 15)
    messages.push({
      condition: "Respiratory Rate",
      value: vitals.respiratoryRate,
    });
  if (vitals.capillaryRefillTime > 2.5)
    messages.push({ condition: "CRFT", value: vitals.capillaryRefillTime });

  return messages;
};

const addVitals = async (req, res) => {
  try {
    const { user, enteredBy, vitals } = req.body;

    // Save vitals
    const newVitals = new Vitals({ user, enteredBy, vitals });
    await newVitals.save();

    // Check for alert conditions
    const triggeredConditions = checkConditions(vitals);

    if (triggeredConditions.length > 0) {
      const patient = await User.findById(user);
      const patientDetails = await PatientDetails.findOne({ user });

      // Save each triggered notification
      for (let condition of triggeredConditions) {
        const message = `${patient.name}’s ${condition.condition} is abnormal - ${condition.value}`;
        await Notification.create({
          user,
          message,
          condition: condition.condition,
        });
      }

      // Add to special attention list if not already there
      const exists = await AttentionNeeded.findOne({ user });
      if (!exists) {
        await AttentionNeeded.create({ user });
      }
    }

    res
      .status(201)
      .json({ message: "Vitals saved successfully", data: newVitals });
  } catch (error) {
    console.error("Error in addVitals:", error);
    res.status(500).json({ message: "Internal server error" });
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
