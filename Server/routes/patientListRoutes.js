const express = require('express');
const patientListController = require('../controllers/patientListController');
const router = express.Router();

// Patient List Routes
router
  .route('/')
  .get(patientListController.getAllPatients)
  .post(patientListController.createPatient);

router
  .route('/stats')
  .get(patientListController.getPatientStats);

router
  .route('/:id')
  .get(patientListController.getPatient)
  .patch(patientListController.updatePatient)
  .delete(patientListController.deletePatient);

module.exports = router;