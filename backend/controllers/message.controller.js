const Message = require('../models/message.model');
const Patient = require('../models/patient.model');

// exports.sendMessage = async (req, res) => {
//   try {
//     const { patientEmail, caregiverEmail, content } = req.body;

//     // Validate input
//     if (!patientEmail || !caregiverEmail || !content) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Missing required fields: patientEmail, caregiverEmail, or content',
//       });
//     }

//     // Create and save message
//     const newMessage = new Message({
//       patientEmail,
//       caregiverEmail,
//       content,
//       timestamp: new Date(),
//     });

//     const savedMessage = await newMessage.save();

//     // Add caregiver to patient's list if not already present
//     await Patient.findOneAndUpdate(
//       { email: patientEmail },
//       { $addToSet: { caregivers: caregiverEmail } },
//       { upsert: true }
//     );

//     res.status(201).json({
//       success: true,
//       message: 'Message sent successfully',
//       data: savedMessage,
//     });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send message',
//       error: error.message,
//     });
//   }
// };

// exports.getMessages = async (req, res) => {
//   try {
//     const { patientEmail, caregiverEmail } = req.params;

//     const messages = await Message.find({
//       patientEmail,
//       caregiverEmail,
//     }).sort({ timestamp: 1 });

//     res.status(200).json({
//       success: true,
//       data: messages,
//     });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch messages',
//       error: error.message,
//     });
//   }
// };



























// For getMessages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      patientEmail: req.params.patientEmail,
      caregiverEmail: req.params.caregiverEmail
    }).sort({ timestamp: 1 });
    
    res.status(200).json(messages); // Return array directly
    
  } catch (error) {
    res.status(500).json([]); // Return empty array on error
  }
};

// For sendMessage
exports.sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage); // Return message object directly
    
  } catch (error) {
    res.status(500).json(null);
  }
};





















exports.removeCaregiver = async (req, res) => {
  try {
    const { patientEmail, caregiverEmail } = req.body;

    await Patient.findOneAndUpdate(
      { email: patientEmail },
      { $pull: { caregivers: caregiverEmail } } // Now works with strings
    );

    res.status(200).json({
      success: true,
      message: 'Caregiver removed successfully',
    });
  } catch (error) {
    console.error('Error removing caregiver:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove caregiver',
      error: error.message,
    });
  }
};
