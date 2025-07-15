const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Get recent notifications
router.get("/notifications", notificationController.getNotifications);

// Get patients needing special attention
router.get(
  "/special-attention-patients",
  notificationController.getSpecialAttentionPatients
);

module.exports = router;
