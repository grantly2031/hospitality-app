const Patient = require('../models/patient.model');

exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({
      success: true,
      message: 'Patient profile created successfully',
      data: newPatient,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.addCaregiver = async (req, res) => {
  try {
    const { patientEmail, caregiverEmail } = req.body;

    // Validate input
    if (!patientEmail || !caregiverEmail) {
      return res.status(400).json({
        success: false,
        message: 'Both patientEmail and caregiverEmail are required',
      });
    }

    // Add caregiver to patient's list (using $addToSet to prevent duplicates)
    const updatedPatient = await Patient.findOneAndUpdate(
      { email: patientEmail },
      { $addToSet: { caregivers: caregiverEmail } },
      { new: true, upsert: true } // upsert: true creates patient if doesn't exist
    );

    res.status(200).json({
      success: true,
      message: 'Caregiver added successfully',
      data: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add caregiver',
      error: error.message,
    });
  }
};


// Add these new methods
exports.getPatientByEmail = async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.email });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};