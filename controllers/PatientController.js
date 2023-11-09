const Patient = require('../models/patient');
const ClinicalTest = require('../models/clinicalTest');


// Function to create a new patient
exports.addPatient = async (req, res) => {
  if (req.get('Content-Type') !== 'application/json') {
    return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    weight,
    height,
    address,
    gender
  } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !weight || !height || !address || gender === undefined ) {
    return res.status(400).json({ success: false, message: 'Please provide all required patient details.' });
  }

  try {
    // Create the patient document
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      phoneNumber,
      weight,
      height,
      address,
      gender
    });

    await newPatient.save();

    res.status(201).json({ success: true, message: 'Patient added successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding patient.' });
  }
};

// Function to get patient details by id
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    // Send the patient details in the response
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving patient details.' });
  }
};


// Function to get patient details by name
exports.getPatientByName = async (req, res) => {
  try {
    const patient = await Patient.find({ firstName: req.params.patientName });

    if (!patient || patient.length === 0) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    // Send the patient details in the response
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving patient details.' });
  }
};

// Function to get patient details by email
exports.getPatientByEmail = async (req, res) => {
  try {
    const patient = await Patient.find({ email: req.params.patientEmail });

    if (!patient || patient.length === 0) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    // Send the patient details in the response
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving patient details.' });
  }
};

// Function to get a list of all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patient = await Patient.find();

    if (!patient || patient.length === 0) {
      return res.status(404).json({ success: false, message: 'No patients found.' });
    }

    // Send the list of patients in the response
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving patient list.' });
  }
};

// Function to delete a patient by name
// exports.deletePatientByName = async (req, res) => {
//   try {
//     const patient = await Patient.findOneAndRemove({ firstName: req.params.patientName });

//     if (!patient) {
//       return res.status(404).json({ success: false, message: 'Patient not found.' });
//     }

//     res.status(200).json({ success: true, message: 'Patient deleted successfully.' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error deleting patient.' });
//   }
// };

// Function to delete a patient by ID
exports.deleteById = async (req, res) => {
  // try {
  //     const patient = await Patient.findByIdAndRemove(req.params.patientId);
      
  //     if (!patient) {
  //         return res.status(404).json({ success: false, message: 'Patient not found.' });
  //     }
      
  //     res.status(200).json({ success: true, message: 'Patient deleted successfully.' });
  // } catch (err) {
  //     res.status(500).json({ success: false, message: 'Error deleting patient.' });
  // }
  try {
    const patientId = req.params.patientId;

    // Find and remove all clinical tests associated with the patient
    const clinicalTests = await ClinicalTest.find({ 'patient._id': patientId });
    for (const clinicalTest of clinicalTests) {
      await ClinicalTest.findByIdAndRemove(clinicalTest._id);
    }

    // Now, remove the patient
    const patient = await Patient.findByIdAndRemove(patientId);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    res.status(200).json({ success: true, message: 'Patient and related clinical tests deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting patient and related clinical tests.' });
  }
};

// Function to delete a patient by email
exports.deletePatientByEmail = async (req, res) => {
  try {
    const patient = await Patient.findOneAndRemove({ email: req.params.patientEmail });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    res.status(200).json({ success: true, message: 'Patient deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting patient.' });
  }
};

// Function to delete all patients
// exports.deleteAllPatients = async (req, res) => {
//   try {
//     await Patient.deleteMany({}); // Delete all patient documents

//     res.status(200).json({ success: true, message: 'All patients deleted successfully.' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error deleting all patients.' });
//   }
// };
