const ClinicalTest = require('../models/clinicalTest');
const Patient = require('../models/patient');


// Create a new clinical test record
exports.createClinicalTest = async (req, res) => {
    if (req.get('Content-Type') !== 'application/json') {
        return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
      }
    
      // Retrieve data from the request body
      const {
        bloodPressure,
        respiratoryRate,
        bloodOxygenLevel,
        heartbeatRate,
        chiefComplaint,
        pastMedicalHistory,
        medicalDiagnosis,
        medicalPrescription,
        creationDateTime,
        patientId, // Reference to the patient
      } = req.body;
    
      // Check if the required fields are not empty
      if (
        !bloodPressure ||
        !respiratoryRate ||
        !bloodOxygenLevel ||
        !heartbeatRate ||
        !creationDateTime
      ) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
      }
    
      // Additional checks for data type validation can be added here.
    
      try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found.' });
        }
        const clinicalTest = new ClinicalTest({
          bloodPressure,
          respiratoryRate,
          bloodOxygenLevel,
          heartbeatRate,
          chiefComplaint,
          pastMedicalHistory,
          medicalDiagnosis,
          medicalPrescription,
          creationDateTime,
          patient: {
            _id: patientId,
            firstName: patient.firstName,
            lastName: patient.lastName,
          },
           // Assign the patient reference
        });
    
        await clinicalTest.save();
    
        res.status(201).json({ success: true, message: 'Clinical test created successfully.' });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating clinical test.' });
        console.log(err);
      }
}

// Get all clinical test records
exports.getAllClinicalTests = async (req, res) => {
    try {
      const clinicalTests = await ClinicalTest.find();
  console.log('Clinical Tests:');
      res.status(200).json({ success: true, data: clinicalTests });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error retrieving clinical tests.' });
    }
  }

// Get clinical test records for a specific patient
exports.getClinicalTestsForPatient = async (req, res) => {
  const patientId = req.params.patientId; // Assuming 'patientId' is the route parameter

  try {
    const clinicalTests = await ClinicalTest.find({ 'patient._id': patientId });

    res.status(200).json({ success: true, data: clinicalTests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving clinical tests.' });
  }
}

// Get clinical test record by ID
exports.getClinicalTestById = async (req, res) => {
  const testId = req.params.testId; // Assuming 'clinicalTestId' is the route parameter

  try {
    const clinicalTest = await ClinicalTest.findById(testId);

    if (!clinicalTest) {
      return res.status(404).json({ success: false, message: 'Clinical test not found.' });
    }

    res.status(200).json({ success: true, data: clinicalTest });
  } catch (err) {
    console.error('Error retrieving clinical test:', err);
    res.status(500).json({ success: false, message: 'Error retrieving clinical test.' });
  }
};

// // Get clinical test record by ID
// exports.getClinicalTestById = async (req, res) => {
//   const testId = req.params.testId;

//   console.log('Received testId:', testId);

//   try {
//     const clinicalTest = await ClinicalTest.findById(testId);

//     if (!clinicalTest) {
//       console.log('Clinical test not found.');
//       return res.status(404).json({ success: false, message: 'Clinical test not found.' });
//     }

//     res.status(200).json({ success: true, data: clinicalTest });
//   } catch (err) {
//     console.error('Error retrieving clinical test:', err);
//     res.status(500).json({ success: false, message: 'Error retrieving clinical test.' });
//   }
// };

// Function to add clinical test details
exports.addClinicalTest = async (req, res) => {
  // Check the Content-Type header
  if (req.get('Content-Type') !== 'application/json') {
    return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
  }

  try {
    const {
      bloodPressure,
      respiratoryRate,
      bloodOxygenLevel,
      heartbeatRate,
      chiefComplaint,
      pastMedicalHistory,
      medicalDiagnosis,
      medicalPrescription,
      creationDateTime,
      patientId,
    } = req.body;

    // Validation for bloodPressure, respiratoryRate, bloodOxygenLevel, and heartbeatRate
    if (
      bloodPressure > 800 ||
      respiratoryRate > 800 ||
      bloodOxygenLevel > 800 ||
      heartbeatRate > 800
    ) {
      console.log('Validation error: Values are not valid.');
      return res.status(400).json({ success: false, message: 'Values are not valid.' });
    }

    // Validation for chiefComplaint, pastMedicalHistory, medicalDiagnosis, and medicalPrescription
    if (!chiefComplaint || !pastMedicalHistory || !medicalDiagnosis || !medicalPrescription) {
      console.log('Validation error: Please fill in all relevant fields.');
      return res.status(400).json({ success: false, message: 'Please fill in all relevant fields.' });
    }

    // Additional validations for other fields can be added here

    // Create a new clinical test object
    const newClinicalTest = {
      bloodPressure: parseInt(bloodPressure),
      respiratoryRate: parseInt(respiratoryRate),
      bloodOxygenLevel: parseInt(bloodOxygenLevel),
      heartbeatRate: parseInt(heartbeatRate),
      chiefComplaint,
      pastMedicalHistory,
      medicalDiagnosis,
      medicalPrescription,
      creationDateTime,
      patientId,
    };

    // Save the clinical test
    // You should replace the following code with your logic to save the clinical test
    // Example:
    // const savedClinicalTest = await ClinicalTest.create(newClinicalTest);

    console.log('Clinical test added successfully!');
    res.status(200).json({ success: true, message: 'Clinical test added successfully!' });
  } catch (err) {
    console.error('Error adding clinical test:', err);
    res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again.' });
  }
};

  
  // Delete a clinical test record
  exports.deleteClinicalTest = async (req, res) => {
    try {
        const testId = req.params.testId;
    
        // Use deleteOne to remove the clinical test record by ID
        const result = await ClinicalTest.deleteOne({ _id: testId });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Clinical test not found.' });
        }
    
        res.status(200).json({ success: true, message: 'Clinical test deleted successfully.' });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting clinical test.' });
      }
  }
  


  // Search clinical test records by patient's first name or last name
exports.searchClinicalTestsByName = async (req, res) => {
    const { name } = req.params;
    try {
      const clinicalTests = await ClinicalTest.find({
        $or: [
          { 'patient.firstName': { $regex: name, $options: 'i' } }, // Case-insensitive search for first name
          { 'patient.lastName': { $regex: name, $options: 'i' } }, // Case-insensitive search for last name
        ],
      });
  
      res.status(200).json({ success: true, data: clinicalTests });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error searching clinical tests.' });
    }
  }

  exports.getSortedCollection = async (req, res) => {
    try {
      // Use an aggregation pipeline to group and find the latest clinical test for each patient
      const aggregationPipeline = [
        {
          $lookup: {
            from: 'patients', // Use the name of your patients collection
            localField: 'patient._id',
            foreignField: '_id',
            as: 'patientInfo',
          },
        },
        {
          $unwind: '$patientInfo',
        },
        {
          $sort: {
            'patientInfo.firstName': 1, // Sort by first name in ascending order
            'patientInfo.lastName': 1, // Then, sort by last name in ascending order
            'creationDateTime': -1, // Sort by creationDateTime in descending order (latest first)
          },
        },
        {
          $group: {
            _id: '$patient._id', // Group by patient ID
            latestTest: { $first: '$$ROOT' }, // Get the first (latest) test for each patient
          },
        },
        {
          $replaceRoot: { newRoot: '$latestTest' }, // Replace the root document with the latest test
        },
       
      ];
  
      const criticalPatients = await ClinicalTest.aggregate(aggregationPipeline);
      const filteredCriticalPatients = criticalPatients
      .filter(patient => patient.bloodPressure > 140&&
        patient.respiratoryRate > 30 && patient.bloodOxygenLevel > 90 && patient.heartbeatRate > 100);

    console.log('Filtered Critical Patients:');
    filteredCriticalPatients.forEach(patient => {
      console.log(patient);
    });

    res.status(200).json({ success: true, data: filteredCriticalPatients });
    
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving and sorting the collection.' });
      console.error(error);
    }
  };
  