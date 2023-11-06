const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

// Add Patient
router.post('/add', PatientController.addPatient);

// Get patient details by id
router.get('/view/:patientId', PatientController.getPatientById);
// Get patient details by name
router.get('/viewByName/:patientName', PatientController.getPatientByName);
// Get patient details by email
router.get('/viewByEmail/:patientEmail', PatientController.getPatientByEmail);
// Get a list of all patients
router.get('/list', PatientController.getAllPatients);

// Delete patient by name
// router.delete('/deleteByName/:patientName', PatientController.deletePatientByName);
// Delete patient by id
router.delete('/delete/:patientId', PatientController.deleteById);
// Delete patient by email
// router.delete('/deleteByEmail/:patientEmail', PatientController.deletePatientByEmail);
// Delete all patients
// router.delete('/deleteAll', PatientController.deleteAllPatients);

module.exports = router;
