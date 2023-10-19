const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

// Add Patient
router.post('/add', PatientController.addPatient);
// Get patient details by ID
router.get('/view/:patientId', PatientController.getPatientById);
// Get patient details by name
router.get('/viewByName/:patientName', PatientController.getPatientByName);
// Get patient details by email
router.get('/viewByEmail/:patientEmail', PatientController.getPatientByEmail);
// Get a list of all patients
router.get('/list', PatientController.getAllPatients);

module.exports = router;
