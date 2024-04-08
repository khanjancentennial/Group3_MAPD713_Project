const ClinicalTest = require('../models/clinicalTest');
const Patient = require('../models/patient');


// Create a new clinical test record
exports.createClinicalTest = async (req, res) => {
    // if (req.get('Content-Type') !== 'application/json') {
    //     return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
    //   }
    
      // Retrieve data from the request body
//       const {
//         bloodPressure,
//         respiratoryRate,
//         bloodOxygenLevel,
//         heartbeatRate,
//         chiefComplaint,
//         pastMedicalHistory,
//         medicalDiagnosis,
//         medicalPrescription,
//         creationDateTime,
//         patientId, // Reference to the patient
//       } = req.body;
      
//       // Check if the required fields are not empty
//       if (
//         !bloodPressure ||
//         !respiratoryRate ||
//         !bloodOxygenLevel ||
//         !heartbeatRate ||
//         !creationDateTime
//       ) {
//         return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
//       }

//       // Validate and check if they are grater than or equal to 800
//       if (
//         bloodPressure >= 800||
//         respiratoryRate >= 800 ||
//         bloodOxygenLevel >= 800 ||
//         heartbeatRate >= 800
//       ) {
//         return res.status(400).json({ success: false, message: 'Blood pressure value or respiratory Rate value or bloodOxygen Level value or heartbeat Rate value is not valid.' });
//       }
    
    
//       // Additional checks for data type validation can be added here.
    
//       try {
//         const patient = await Patient.findById(patientId);

//         if (!patient) {
//             return res.status(404).json({ success: false, message: 'Patient not found.' });
//         }
//         const clinicalTest = new ClinicalTest({
//           bloodPressure,
//           respiratoryRate,
//           bloodOxygenLevel,
//           heartbeatRate,
//           chiefComplaint,
//           pastMedicalHistory,
//           medicalDiagnosis,
//           medicalPrescription,
//           creationDateTime,
//           patient: {
//             _id: patientId,
//             firstName: patient.firstName,
//             lastName: patient.lastName,
//           },
//            // Assign the patient reference
//         });
    
//         await clinicalTest.save();
    
//         res.status(201).json({ success: true, message: 'Clinical test created successfully.' });
//       } catch (err) {
//         res.status(500).json({ success: false, message: 'Error creating clinical test.' });
//         console.log(err);
//       }
// }

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
    patientId // Reference to the patient
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

  // Validate and check if they are greater than or equal to 800
  if (
    bloodPressure >= 800 ||
    respiratoryRate >= 800 ||
    bloodOxygenLevel >= 800 ||
    heartbeatRate >= 800
  ) {
    return res.status(400).json({ success: false, message: 'Blood pressure value or respiratory Rate value or bloodOxygen Level value or heartbeat Rate value is not valid.' });
  }

  // Determine status based on provided values
  let status = 'normal';
  if (
    bloodPressure > 140 ||
    respiratoryRate > 30 ||
    bloodOxygenLevel < 90 ||
    heartbeatRate > 100
  ) {
    status = 'critical';
  }

  try {
    // Update patient's status in the Patients collection
    const patient = await Patient.findByIdAndUpdate(patientId, { status }, { new: true });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    // Create a new clinical test document
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
      status,
      patient: {
        _id: patientId,
        firstName: patient.firstName,
        lastName: patient.lastName,
      },
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


// Update a clinical test record
// exports.updateClinicalTest = async (req, res) => {
//   // Check the Content-Type header
// //  if (req.get('Content-Type') !== 'application/json') {
// //    return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
// //  }
//  try {
//    const testId = req.params.testId;

//    // Find the clinical test record by ID
//    const clinicalTest = await ClinicalTest.findById(testId);

//    if (!clinicalTest) {
//      return res.status(404).json({ success: false, message: 'Clinical test not found.' });
//    }

//    // Check if the required fields are not empty
//    if (
//      !req.body.bloodPressure ||
//      !req.body.respiratoryRate ||
//      !req.body.bloodOxygenLevel ||
//      !req.body.heartbeatRate ||
//      !req.body.creationDateTime
//    ) {
//      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
//    }

//    // Additional checks for data type validation can be added here.

//    // Update clinical test properties
//    clinicalTest.bloodPressure = req.body.bloodPressure;
//    clinicalTest.respiratoryRate = req.body.respiratoryRate;
//    clinicalTest.bloodOxygenLevel = req.body.bloodOxygenLevel;
//    clinicalTest.heartbeatRate = req.body.heartbeatRate;
//    clinicalTest.chiefComplaint = req.body.chiefComplaint;
//    clinicalTest.pastMedicalHistory = req.body.pastMedicalHistory;
//    clinicalTest.medicalDiagnosis = req.body.medicalDiagnosis;
//    clinicalTest.medicalPrescription = req.body.medicalPrescription;
//    clinicalTest.creationDateTime = req.body.creationDateTime;
//    // If you want to update the patient reference, you can do that here as well.
//      let status = 'normal';
//   if (
//     bloodPressure > 140 ||
//     respiratoryRate > 30 ||
//     bloodOxygenLevel < 90 ||
//     heartbeatRate > 100
//   ) {
//     status = 'critical';
//   }
//      const patient = await Patient.findByIdAndUpdate(patientId, { status }, { new: true });

//    await clinicalTest.save();

     

//    res.status(200).json({ success: true, message: 'Clinical test updated successfully.' });
//  } catch (err) {
//    res.status(500).json({ success: false, message: 'Error updating clinical test.' });
//  }
//  }

exports.updateClinicalTest = async (req, res) => {
  try {
    const testId = req.params.testId;

    // Find the clinical test record by ID
    const clinicalTest = await ClinicalTest.findById(testId);

    if (!clinicalTest) {
      return res.status(404).json({ success: false, message: 'Clinical test not found.' });
    }

    // Check if the required fields are not empty
    if (
      !req.body.bloodPressure ||
      !req.body.respiratoryRate ||
      !req.body.bloodOxygenLevel ||
      !req.body.heartbeatRate ||
      !req.body.creationDateTime
    ) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

      // Calculate status based on updated values
    let status = 'normal';
    if (
      clinicalTest.bloodPressure > 140 ||
      clinicalTest.respiratoryRate > 30 ||
      clinicalTest.bloodOxygenLevel < 90 ||
      clinicalTest.heartbeatRate > 100
    ) {
      status = 'critical';
    }
    // Additional checks for data type validation can be added here.

    // Update clinical test properties
    clinicalTest.bloodPressure = req.body.bloodPressure;
    clinicalTest.respiratoryRate = req.body.respiratoryRate;
    clinicalTest.bloodOxygenLevel = req.body.bloodOxygenLevel;
    clinicalTest.heartbeatRate = req.body.heartbeatRate;
    clinicalTest.chiefComplaint = req.body.chiefComplaint;
    clinicalTest.pastMedicalHistory = req.body.pastMedicalHistory;
    clinicalTest.medicalDiagnosis = req.body.medicalDiagnosis;
    clinicalTest.medicalPrescription = req.body.medicalPrescription;
    clinicalTest.creationDateTime = req.body.creationDateTime;
    clinicalTest.status = status;

    

    // Update clinical test document
    await clinicalTest.save();

    // Update patient's status in the Patients collection
    const patient = await Patient.findByIdAndUpdate(
      clinicalTest.patient._id,
      { status },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    res.status(200).json({ success: true, message: 'Clinical test updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating clinical test.' });
  }
}


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


    
  
