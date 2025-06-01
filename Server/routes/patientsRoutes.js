const express = require("express");
const router = express.Router();
const {
  addPatient,
  getAllPatients,
  getPatientById,
} = require("../controllers/patientController");

router.post("/register-patient", addPatient);
router.get("/", getAllPatients);
router.get("/:id",getPatientById);

module.exports = router;
