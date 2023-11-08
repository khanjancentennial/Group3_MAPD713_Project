const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicalTestSchema = new Schema({
  bloodPressure: Number,
  respiratoryRate: Number,
  bloodOxygenLevel: Number,
  heartbeatRate: Number,
  chiefComplaint: String,
  pastMedicalHistory: String,
  medicalDiagnosis: String,
  medicalPrescription: String,
  creationDateTime: Date,
  patient: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'patients', // Reference to the patient
    },
    firstName: String,
    lastName: String,
  },
});

module.exports = mongoose.model('ClinicalTest', clinicalTestSchema);
