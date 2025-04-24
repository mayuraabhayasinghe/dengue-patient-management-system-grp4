const express = require("express");
const router = express.router();

router.post("/register-patient", addPatient);

module.exports = router;
