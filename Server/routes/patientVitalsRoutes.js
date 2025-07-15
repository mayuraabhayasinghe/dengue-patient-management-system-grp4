const express = require("express");
const router = express.Router();
const {
  submitVitals,
  getPatientVitals,
} = require("../controllers/patientVitalsController");

router.post("/add", submitVitals);
router.get("/patient/:patientId", getPatientVitals);

module.exports = router;
