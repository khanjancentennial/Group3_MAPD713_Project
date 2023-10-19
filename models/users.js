const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schema for user collection
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    select: false
    // required: true,
  },
  hash: {
    type: String,
    select: false
    // required: true,
  },
//   password: {
//     type: String,
//     required: true,
//   },
});

module.exports = mongoose.model('User', userSchema);
