const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getRegisteredPatients,
  getPatientStats,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  registerPatient
} = require('../controllers/patientController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Patient Routes
router.route('/')
  .get(protect, getAllPatients)
  .post(protect, createPatient);

router.route('/registered')
  .get(protect, getRegisteredPatients);

router.route('/stats')
  .get(protect, getPatientStats);

router.route('/register-patient')
  .post(registerPatient);

router.route('/:id')
  .get(protect, getPatient)
  .put(protect, updatePatient)
  .delete(protect, deletePatient);

module.exports = router;
