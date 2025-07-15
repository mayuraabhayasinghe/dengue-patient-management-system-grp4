const mongoose = require("mongoose");
const Vitals = require("../models/staffPatientVitals");
const PatientDetails = require("../models/patientModel");

const reminderIntervals = {
  bodyTemperature: 4 * 60 * 60 * 1000, // 4 hours
  hctPvc: 6 * 60 * 60 * 1000, // 6 hours
  pulseRate: 3 * 60 * 60 * 1000, // 3 hours
  bloodPressureSupine: 3 * 60 * 60 * 1000, // 3 hours
};

const reminderMessages = {
  bodyTemperature: "Time to measure body temperature.",
  hctPvc: "Time to measure HCT/PVC.",
  pulseRate: "Time to measure pulse rate.",
  bloodPressureSupine: "Time to measure blood pressure.",
};

// Main reminder scheduler function
function startReminderScheduler(io) {
  setInterval(async () => {
    try {
      const patients = await PatientDetails.find({
        dischargeDate: null,
      }).populate("user");

      for (const patient of patients) {
        const patientId = patient.user._id;
        const bedNumber = patient.bedNumber;
        const name = patient.user.name;

        // Find the latest vitals record for the patient
        const latest = await Vitals.findOne({ user: patientId }).sort({
          timestamp: -1,
        });

        const now = new Date();

        for (const vital in reminderIntervals) {
          if (reminderIntervals.hasOwnProperty(vital)) {
            let lastEntryTime;

            if (latest && latest.vitals[vital]) {
              lastEntryTime = latest.timestamp;
            } else {
              // If no entry found, treat as never entered
              lastEntryTime = new Date(0);
            }

            const elapsed = now - lastEntryTime;
            if (elapsed >= reminderIntervals[vital]) {
              io.emit("reminder", {
                message: `${name} (${bedNumber}): ${reminderMessages[vital]}`,
                vitalType: vital,
                patientId: patientId,
                timestamp: new Date(),
              });
            }
          }
        }
      }
    } catch (err) {
      console.error("Reminder scheduler error:", err);
    }
  }, 60 * 1000); // check every minute
}

module.exports = startReminderScheduler;
