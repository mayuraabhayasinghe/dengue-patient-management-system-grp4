const PatientVital = require("../models/staffPatientVitals");
const { emitNotification } = require("../utils/notificationManager");

// Define vital thresholds and conditions
const vitalRules = {
  bodyTemperature: { threshold: 37.5, condition: (v) => v > 37.5, unit: "°C" },
  wbc: { threshold: 5000, condition: (v) => v < 5000, unit: "/mm³" },
  plt: { threshold: 130000, condition: (v) => v < 130000, unit: "/mm³" },
  hctPvc: { threshold: 20, condition: (v) => v > 20, unit: "%" },
  "bloodPressureSupine.systolic": {
    threshold: 90,
    condition: (v) => v < 90,
    unit: "mmHg",
  },
  "bloodPressureSupine.meanArterialPressure": {
    threshold: 60,
    condition: (v) => v < 60,
    unit: "mmHg",
  },
  "bloodPressureSupine.pulsePressure": {
    threshold: 20,
    condition: (v) => v <= 20,
    unit: "mmHg",
  },
  pulseRate: { threshold: 100, condition: (v) => v > 100, unit: "/min" },
  respiratoryRate: { threshold: 15, condition: (v) => v > 15, unit: "/min" },
  capillaryRefillTime: {
    threshold: 2.5,
    condition: (v) => v > 2.5,
    unit: "sec",
  },
};

exports.submitVitals = async (req, res) => {
  try {
    const { user, vitals } = req.body;

    // Debug log
    console.log("Received vital submission for user:", user);
    console.log("Vitals data:", vitals);

    // Check if user ID is valid before proceeding
    if (!user) {
      return res.status(400).json({
        error: "User ID is required for vital signs submission",
      });
    }

    // Save vitals to the database
    const newVitals = new PatientVital({ user, vitals });
    await newVitals.save();
    console.log("Vitals saved successfully");

    // Process all vitals (both regular and nested)
    await processAllVitals(user, vitals);

    // // Check each vital sign against thresholds
    // for (const [field, value] of Object.entries(vitals)) {
    //   const rule = vitalRules[field];
    //   if (!rule) continue;

    //   // Handle nested fields (e.g., bloodPressureSupine.systolic)
    //   const fieldParts = field.split(".");
    //   let actualValue = value;
    //   if (fieldParts.length > 1) {
    //     actualValue = fieldParts.reduce((obj, key) => obj?.[key], vitals);
    //   }

    //   if (actualValue !== undefined && rule.condition(actualValue)) {
    //     await emitNotification({
    //       patientId: user,
    //       vital: field,
    //       value: `${actualValue}${rule.unit}`,
    //       condition: `Critical - ${
    //         actualValue > rule.threshold ? "High" : "Low"
    //       }`,
    //     });
    //   }
    // }

    res.status(201).json({
      message: "Vitals submitted successfully",
      data: newVitals,
    });
  } catch (error) {
    console.error("Vitals Submission Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to process all vitals
async function processAllVitals(userId, vitals) {
  try {
    // Process flat (non-nested) vitals
    for (const [field, value] of Object.entries(vitals)) {
      // Skip empty values or objects (we'll handle nested objects separately)
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        typeof value === "object"
      ) {
        continue;
      }

      // Convert to number for proper comparison
      const numValue = Number(value);
      if (isNaN(numValue)) continue;

      // Check if this field has a rule
      const rule = vitalRules[field];
      if (!rule) continue;

      // Check if the condition is met
      if (rule.condition(numValue)) {
        console.log(
          `Critical vital detected: ${field} = ${numValue}${rule.unit}`
        );

        await emitNotification({
          patientId: userId,
          vital: field,
          value: `${numValue}${rule.unit}`,
          condition: `Critical - ${numValue > rule.threshold ? "High" : "Low"}`,
        });
      }
    }

    // Process nested objects
    const nestedFields = Object.keys(vitals).filter(
      (key) => typeof vitals[key] === "object" && vitals[key] !== null
    );

    for (const nestedField of nestedFields) {
      const nestedObj = vitals[nestedField];

      for (const [subField, value] of Object.entries(nestedObj)) {
        // Skip empty values
        if (value === "" || value === null || value === undefined) {
          continue;
        }

        // Convert to number
        const numValue = Number(value);
        if (isNaN(numValue)) continue;

        // Construct full field name for rule lookup (e.g., "bloodPressureSupine.systolic")
        const fullFieldName = `${nestedField}.${subField}`;
        const rule = vitalRules[fullFieldName];

        if (!rule) continue;

        // Check if condition is met
        if (rule.condition(numValue)) {
          console.log(
            `Critical nested vital detected: ${fullFieldName} = ${numValue}${rule.unit}`
          );

          await emitNotification({
            patientId: userId,
            vital: fullFieldName,
            value: `${numValue}${rule.unit}`,
            condition: `Critical - ${
              numValue > rule.threshold ? "High" : "Low"
            }`,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error processing vitals:", error);
    // We don't throw the error so the main function can still complete
  }
}

exports.getVitals = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitals = await PatientVital.find({ user: patientId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(vitals);
  } catch (error) {
    console.error("Error fetching vitals:", error);
    res.status(500).json({ error: "Failed to fetch vitals" });
  }
};

// const PatientVital = require("../models/staffPatientVitals");
// const Notification = require("../models/NotificationModel");
// const PatientDetails = require("../models/patientModel");
// // const User = require("../models/userModel");

// // Pass your initialized socket instance when calling this function
// exports.submitVitals = async (req, res, next, io) => {
//   try {
//     const { user, enteredBy, vitals } = req.body;

//     // Save vitals to the database
//     const newVitals = new PatientVital({ user, enteredBy, vitals });
//     await newVitals.save();

//     // Fetch patient's name and bed number for notification messages
//     const patient = await PatientDetails.findOne({ user }).populate("user");
//     if (!patient) return res.status(404).json({ error: "Patient not found." });

//     const notifications = [];
//     const now = new Date();

//     // Conditions to evaluate
//     const rules = [
//       {
//         field: "bodyTemperature",
//         condition: (v) => v > 37.5,
//         message: (v) =>
//           `${patient.user.name}’s body temperature is high - ${v}°C`,
//       },
//       {
//         field: "wbc",
//         condition: (v) => v < 5000,
//         message: (v) => `${patient.user.name} has low WBC - ${v}/mm³`,
//       },
//       {
//         field: "plt",
//         condition: (v) => v < 130000,
//         message: (v) =>
//           `${patient.user.name} has low platelet count - ${v}/mm³`,
//       },
//       {
//         field: "hctPvc",
//         condition: (v) => v > 20,
//         message: (v) => `${patient.user.name} has high HCT/PVC - ${v}%`,
//       },
//       {
//         field: "bloodPressureSupine.systolic",
//         condition: (v) => v < 90,
//         message: (v) =>
//           `${patient.user.name}'s supine systolic BP is low - ${v} mmHg`,
//       },
//       {
//         field: "bloodPressureSupine.meanArterialPressure",
//         condition: (v) => v < 60,
//         message: (v) => `${patient.user.name}'s MAP is low - ${v} mmHg`,
//       },
//       {
//         field: "bloodPressureSupine.pulsePressure",
//         condition: (v) => v <= 20,
//         message: (v) =>
//           `${patient.user.name}'s pulse pressure is critically low - ${v} mmHg`,
//       },
//       {
//         field: "pulseRate",
//         condition: (v) => v > 100,
//         message: (v) => `${patient.user.name}'s pulse rate is high - ${v}/min`,
//       },
//       {
//         field: "respiratoryRate",
//         condition: (v) => v > 15,
//         message: (v) =>
//           `${patient.user.name}'s respiratory rate is elevated - ${v}/min`,
//       },
//       {
//         field: "capillaryRefillTime",
//         condition: (v) => v > 2.5,
//         message: (v) => `${patient.user.name}'s CRFT is prolonged - ${v} sec`,
//       },
//     ];

//     for (const rule of rules) {
//       // Support nested fields (e.g., bloodPressureSupine.systolic)
//       const path = rule.field.split(".");
//       let value = vitals;
//       for (const key of path) {
//         value = value?.[key];
//       }
//       if (value !== undefined && rule.condition(value)) {
//         const message = rule.message(value);
//         const notification = new Notification({
//           patientId: patient._id,
//           message,
//           vital: rule.field,
//           value,
//           condition: rule.condition.toString(),
//           timestamp: now,
//         });
//         await notification.save();

//         // Emit via Socket.IO
//         io.emit("new_notification", {
//           patientId: patient._id,
//           name: patient.user.name,
//           bedNumber: patient.bedNumber,
//           message,
//           time: now,
//         });

//         notifications.push(notification);
//       }
//     }

//     res.status(201).json({ message: "Vitals submitted", notifications });
//   } catch (error) {
//     console.error("Vitals Submission Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
