const express = require("express");
const router = express.Router();
const {
  addPatient,
  getAllPatients,
  getPatientById,
  getPatientByUserId,
} = require("../controllers/patientController");

router.post("/register-patient", addPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.get("/user/:userId", getPatientByUserId);

module.exports = router;
