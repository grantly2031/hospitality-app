const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    patientEmail: {
      type: String,
      required: true,
    },
    caregiverEmail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Message', messageSchema);
