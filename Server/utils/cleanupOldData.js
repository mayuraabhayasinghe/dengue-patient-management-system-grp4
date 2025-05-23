// utils/cleanupOldData.js
const Notification = require("../models/NotificationModel");
const SpecialAttentionPatient = require("../models/AttentionNeededModel");

/**
 * Removes:
 * - Notifications older than 1 day
 * - Special attention patients older than 4 days
 */
const cleanupOldData = async () => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);

  try {
    // Delete old notifications
    const deletedNotifications = await Notification.deleteMany({
      timestamp: { $lt: oneDayAgo },
    });

    // Delete special attention patients older than 4 days
    const deletedAttentionPatients = await SpecialAttentionPatient.deleteMany({
      timestamp: { $lt: fourDaysAgo },
    });

    console.log(
      `[cleanup] Deleted ${deletedNotifications.deletedCount} old notifications and ${deletedAttentionPatients.deletedCount} special attention records.`
    );
  } catch (error) {
    console.error("[cleanup] Error while cleaning old data:", error);
  }
};

module.exports = cleanupOldData;
