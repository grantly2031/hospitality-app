const mongoose = require('mongoose');

const CaretakerSchema = new mongoose.Schema({
    authDigits: {
    type: String,
    required: true,
    select: false // Don't return this field by default
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fieldOfStudy: {
    type: [String],
    required: true,
  },
  availableDays: {
    type: [String],
    required: true,
  },
  timeSlots: {
    morning: Boolean,
    afternoon: Boolean,
    evening: Boolean,
  },
  experience: {
    type: String,
    required: true,
  },
  certifications: [String],
  languages: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Caretaker', CaretakerSchema);
