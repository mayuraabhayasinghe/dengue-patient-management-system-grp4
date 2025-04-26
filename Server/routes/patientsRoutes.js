const express = require("express");
const router = express.router();
const addPatient = require("../controllers/patientController");

router.post("/register-patient", addPatient);

module.exports = router;
