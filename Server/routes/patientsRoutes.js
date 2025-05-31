const express = require("express");
const router = express.Router();
const {
  addPatient,
  getAllPatients,
} = require("../controllers/patientController");

router.post("/register-patient", addPatient);
router.get("/", getAllPatients);

module.exports = router;
