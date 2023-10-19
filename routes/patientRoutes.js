const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

// Add Patient
router.post('/add', PatientController.addPatient);
// Get patient details by ID
router.get('/view/:patientId', PatientController.getPatientById);
// Get patient details by name
router.get('/viewByName/:patientName', PatientController.getPatientByName);

module.exports = router;
