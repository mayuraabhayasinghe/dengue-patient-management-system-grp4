const Notification = require("../models/NotificationModel");
const SpecialAttentionPatient = require("../models/AttentionNeededModel");

// Get recent notifications
exports.getNotifications = async (req, res) => {
  try {
    // Get the most recent notifications (limited to 10)
    const notifications = await Notification.find({})
      .populate("patientId", "name bedNumber") // Populate patient details
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// Get patients needing special attention
exports.getSpecialAttentionPatients = async (req, res) => {
  try {
    // Get all special attention patients sorted by most recently critical
    const specialAttentionPatients = await SpecialAttentionPatient.find(
      {}
    ).sort({ lastCritical: -1 });

    res.status(200).json(specialAttentionPatients);
  } catch (error) {
    console.error("Error fetching special attention patients:", error);
    res
      .status(500)
      .json({ message: "Error fetching special attention patients" });
  }
};
