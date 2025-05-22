const express = require("express");
const router = express.Router();
const { submitVitals } = require("../controllers/patientVitalsController");

router.post("/add", submitVitals);
// router.get("/all", getAllVitals);

module.exports = router;
