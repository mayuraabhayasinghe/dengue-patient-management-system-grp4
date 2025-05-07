const express = require("express");
const router = express.Router();
const { addPatient } = require("../controllers/patientController");

router.post("/register-patient", addPatient);

module.exports = router;
