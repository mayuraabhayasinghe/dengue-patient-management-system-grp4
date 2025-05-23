const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatientStats,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientListController');

// Patient List Routes
router.route('/')
  .get(getAllPatients)
  .post(createPatient);

router.route('/stats')
  .get(getPatientStats);

router.route('/:id')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;