const express = require("express");
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require("../controllers/feedbackController");

// POST: Submit all feedbacks
router.post("/", submitFeedback);

// GET: Fetch all feedbacks
router.get("/", getAllFeedbacks);


module.exports = router;
