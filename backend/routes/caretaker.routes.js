const express = require('express');
const router = express.Router();
const caretakerController = require('../controllers/caretaker.controller');

router.post('/', caretakerController.createCaretaker);
router.get('/:id', caretakerController.getCaretakerByID);
router.get('/email/:email', caretakerController.getCaretakerByEmail);
router.put('/email/:email', caretakerController.updateCaretaker);
router.get('/', caretakerController.getAllCaretakers);
router.post('/by-emails', caretakerController.getCaregiversByEmails);

module.exports = router;
