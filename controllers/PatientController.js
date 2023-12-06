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

// Function to edit patient details by ID
exports.editPatientById = async (req, res) => {
  // Check the Content-Type header
  if (req.get('Content-Type') !== 'application/json') {
    return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
  }

  try {
    const patientId = req.params.patientId;

    // Find the patient document by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    // Validation for first name
    if (!req.body.firstName.trim()) {
      console.log('Validation error: First name is required.');
      return res.status(400).json({ success: false, message: 'First name is required.' });
    }

    // Validation for last name
    if (!req.body.lastName.trim()) {
      console.log('Validation error: Last name is required.');
      return res.status(400).json({ success: false, message: 'Last name is required.' });
    }

    // Validation for email
    if (!req.body.email.trim() || !isValidEmail(req.body.email)) {
      console.log('Validation error: Invalid email address.');
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Validation for phone number
    if (!req.body.phoneNumber || !/^\d{10}$/.test(req.body.phoneNumber)) {
      console.log('Validation error: Invalid phone number format.');
      return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
    }

    // Update patient properties
    patient.firstName = req.body.firstName;
    patient.lastName = req.body.lastName;
    patient.email = req.body.email;
    patient.phoneNumber = req.body.phoneNumber;
    patient.weight = req.body.weight || patient.weight;
    patient.height = req.body.height || patient.height;
    patient.address = req.body.address || patient.address;
    patient.gender = req.body.gender !== undefined ? req.body.gender : patient.gender;

    await patient.save();

    console.log('Patient details updated successfully.');
    res.status(200).json({ success: true, message: 'Patient details updated successfully.' });
  } catch (err) {
    console.error('Error updating patient details:', err);
    res.status(500).json({ success: false, message: 'Error updating patient details.' });
  }
};

// Function to validate email address format
function isValidEmail(email) {
  // Add your email validation logic here
  // For a simple example, check if it contains '@'
  return email.includes('@');
}

