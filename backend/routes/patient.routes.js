const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.post('/', patientController.createPatient);
router.post('/add-caregiver', patientController.addCaregiver);
router.get('/:email', patientController.getPatientByEmail);
router.put('/:email', patientController.updatePatient);

module.exports = router;
