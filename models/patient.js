const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: String,
  dateOfBirth: Date,
  gender: String,
  address: String,
  primaryPhone: String,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  email: String,
  insurance: {
    provider: String,
    policyNumber: String,
    groupNumber: String,
  },
  medicalHistory: {
    previousConditions: [String],
    currentMedications: [String],
    allergies: [String],
  },
  personalInformation: {
    maritalStatus: String,
    occupation: String,
  },
  familyHistory: {
    conditions: [String],
  },
  legalInformation: {
    consentToTreatment: Boolean,
    organDonationConsent: Boolean,
  },
  additionalDetails: {
    primaryCarePhysician: String,
    preferredPharmacy: String,
    dietaryRestrictions: String,
  },
  // Additional patient information fields
});

module.exports = mongoose.model('Patient', patientSchema);
