const { ObjectId } = require('mongodb'); // or mongoose.Types.ObjectId
const Caretaker = require('../models/caretaker.model');

exports.createCaretaker = async (req, res) => {
  try {
    const newCaretaker = new Caretaker(req.body);
    await newCaretaker.save();
    res.status(201).json({
      success: true,
      message: 'Caretaker profile created successfully',
      data: newCaretaker,
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

exports.getAllCaretakers = async (req, res) => {
  try {
    const caretakers = await Caretaker.find();
    res.status(200).json({
      success: true,
      count: caretakers.length,
      data: caretakers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


exports.getCaretakerByID = async (req, res) => {
  try {
    // Check if ID is valid MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid ID format' });
    }
    // console.log(req.params.id);
    const caretaker = await Caretaker.findById(req.params.id);
    if (!caretaker) {
      return res
        .status(404)
        .json({ success: false, message: 'Caretaker not found' });
    }
    res.status(200).json({ success: true, data: caretaker });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





// Add these new methods
exports.getCaretakerByEmail = async (req, res) => {
  try {
    // console.log("here")
    const caretaker = await Caretaker.findOne({ email: req.params.email });
    if (!caretaker) {
      return res.status(404).json({
        success: false,
        message: 'Caretaker not found',
      });
    }
    res.status(200).json({
      success: true,
      data: caretaker,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// exports.getCaretakerByID = async (req, res) => {
//   try {
//     const { id } = req.params.id;
//     // console.log(id)


//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid caretaker ID format',
//       });
//     }
// console.log(id)
//     const caretaker = await Caretaker.findById(id);

//     if (!caretaker) {
//       return res.status(404).json({
//         success: false,
//         message: 'Caretaker not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: caretaker,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };







exports.updateCaretaker = async (req, res) => {
  try {
    const caretaker = await Caretaker.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!caretaker) {
      return res.status(404).json({
        success: false,
        message: 'Caretaker not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Caretaker updated successfully',
      data: caretaker,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


exports.getCaregiversByEmails = async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({
        success: false,
        message: 'Emails array is required',
      });
    }

    const caregivers = await Caretaker.find({
      email: { $in: emails },
    })// Only get needed fields

    res.status(200).json({
      success: true,
      data: caregivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch caregivers',
      error: error.message,
    });
  }
};
