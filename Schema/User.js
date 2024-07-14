const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  keepLoggedIn: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});


const User = mongoose.model('User', userSchema);


module.exports = User;
