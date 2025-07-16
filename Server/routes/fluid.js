const express = require("express");
const router = express.Router();
const {
  submitFluidData,
  getPatientFluidData,
} = require("../controllers/fluidController");

router.post("/submit", submitFluidData);
router.get("/patient/:patientId", getPatientFluidData);

module.exports = router;
