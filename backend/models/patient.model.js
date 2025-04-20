const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  authDigits: {
    type: String,
    required: true,
    select: false, // Don't return this field by default
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  assistanceType: {
    type: [String],
    required: true,
  },
  availabilityStartDate: {
    type: Date,
    required: true,
  },
  availabilityEndDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  caregivers: [
    {
      type: String, // Changed from ObjectId to String
    },
  ],
  additionalNotes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Patient', PatientSchema);
