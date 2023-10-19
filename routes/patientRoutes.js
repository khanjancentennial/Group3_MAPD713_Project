const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

// Add Patient
router.post('/add', PatientController.addPatient);

module.exports = router;
