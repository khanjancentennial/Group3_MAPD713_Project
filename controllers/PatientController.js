const Patient = require('../models/patient');

// Function to create a new patient
exports.addPatient = async (req, res) => {
  if (req.get('Content-Type') !== 'application/json') {
    return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
  }

  const {
    name,
    dateOfBirth,
    gender,
    address,
    primaryPhone,
    emergencyContact,
    email,
    insurance,
    medicalHistory,
    personalInformation,
    familyHistory,
    legalInformation,
    additionalDetails,
  } = req.body;

  if (!name || !dateOfBirth || !gender || !address || !primaryPhone || !emergencyContact || !email || !insurance || !medicalHistory || !personalInformation || !familyHistory || !legalInformation || !additionalDetails) {
    return res.status(400).json({ success: false, message: 'Please provide all required patient details.' });
  }

  try {
    // Create the patient document
    const newPatient = new Patient({
      name,
      dateOfBirth,
      gender,
      address,
      primaryPhone,
      emergencyContact,
      email,
      insurance,
      medicalHistory,
      personalInformation,
      familyHistory,
      legalInformation,
      additionalDetails,
    });

    await newPatient.save();

    res.status(201).json({ success: true, message: 'Patient added successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding patient.' });
  }
};
// Function to get patient details by ID
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
      const patient = await Patient.find({ name: req.params.patientName });
  
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
