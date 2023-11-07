const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  weight: String,
  height: String,
  address: String,
  gender: Number,
  // Additional patient information fields
});

module.exports = mongoose.model('Patient', patientSchema);
