const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

// No authentication middleware needed
router.post('/send', messageController.sendMessage);
router.get('/:patientEmail/:caregiverEmail', messageController.getMessages);
router.post('/remove', messageController.removeCaregiver);

module.exports = router;
