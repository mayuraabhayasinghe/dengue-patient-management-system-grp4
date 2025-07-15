const Notification = require("../models/NotificationModel"); // create this model for notifications
const SpecialAttentionPatient = require("../models/AttentionNeededModel"); // optional separate collection
const PatientDetails = require("../models/patientModel");
// const User = require("../models/userModel");

// Emit to all connected clients
let ioInstance;
function setIO(io) {
  ioInstance = io;
}

// Save and emit notification
async function emitNotification({ patientId, vital, value, condition }) {
  try {
    const patientDetails = await PatientDetails.findOne({
      user: patientId,
    }).populate("user");

    if (!patientDetails) {
      console.error("Patient details not found for ID:", patientId);
      return;
    }

    // Debug log
    console.log("Found patient details:", patientDetails.user.name);

    const name = patientDetails.user.name;
    const bedNumber = patientDetails.bedNumber;
    const message = `${name}'s ${vital} is critical - ${value}. Condition: ${condition}`;

    const newNotification = await Notification.create({
      patientId: patientId,
      message: message,
      timestamp: new Date(),
      vital: vital,
      value: value,
      condition: condition,
    });

    // Emit to dashboard clients
    if (ioInstance) {
      ioInstance.emit("notification", newNotification);
    }

    // Add to special attention list
    await SpecialAttentionPatient.updateOne(
      { patient: patientId },
      { patient: patientId, name, bedNumber, lastCritical: new Date() },
      { upsert: true }
    );

    if (ioInstance) {
      // Emit updated special attention list to all clients
      const specialAttentionList = await SpecialAttentionPatient.find({}).sort({
        lastCritical: -1,
      });
      ioInstance.emit("specialAttentionUpdate", specialAttentionList);
    }
  } catch (err) {
    console.error("Notification error:", err);
  }
}

// Cleanup notifications older than 1 day and special attention patients older than 4 days
async function cleanupOldData() {
  const now = new Date();
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const fourDaysAgo = new Date(now - 4 * 24 * 60 * 60 * 1000);

  try {
    await Notification.deleteMany({ timestamp: { $lt: oneDayAgo } });
    await SpecialAttentionPatient.deleteMany({
      lastCritical: { $lt: fourDaysAgo },
    });
  } catch (err) {
    console.error("Cleanup error:", err);
  }
}

module.exports = { emitNotification, setIO, cleanupOldData };
