const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  registeredId: String,
  email: String,
  phone: String,
  password: String,
  dob: Date,
});

module.exports = mongoose.model('User', userSchema);
