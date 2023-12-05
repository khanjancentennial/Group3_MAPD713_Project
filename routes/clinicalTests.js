const express = require('express');
const router = express.Router();
const clinicalTestController = require('../controllers/clinicalTestController');

// Create a new clinical test record
router.post('/clinical-tests', clinicalTestController.createClinicalTest);

// Get all clinical test records
router.get('/clinical-tests', clinicalTestController.getAllClinicalTests);

// Get clinical test records for a specific patient
router.get('/clinical-tests/:patientId', clinicalTestController.getClinicalTestsForPatient);

// Update a clinical test record
router.put('/clinical-tests/:testId', clinicalTestController.updateClinicalTest);

// Get a specific clinical test by ID
router.get('/clinical-testsById/:testId', clinicalTestController.getClinicalTestById);

// Delete a clinical test record
router.delete('/clinical-tests/:testId', clinicalTestController.deleteClinicalTest);

// Search clinical test records by patient's first name or last name
router.get('/clinical-tests/search/:name', clinicalTestController.searchClinicalTestsByName);

// Get all critical patients with the latest test
router.get('/critical-patients', clinicalTestController.getSortedCollection);


module.exports = router;
