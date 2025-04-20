const Patient = require('../models/patient.model');
const Caretaker = require('../models/caretaker.model');

// exports.login = async (req, res) => {
//   const { email, lastDigits } = req.body;
// //   console.log('Login attempt for:', email);

//   try {
//     // console.log('Searching for patient...');
//     const patient = await Patient.findOne({ email })
//       .select('+authDigits')
//       .lean();
//     // console.log('Patient query completed');

//     // console.log('Searching for caretaker...');
//     const caretaker = await Caretaker.findOne({ email })
//       .select('+authDigits')
//       .lean();
//     // console.log('Caretaker query completed');

//     const user = patient || caretaker;
//     console.log('User resolved:', user ? 'Found' : 'Not found');

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'User not found' });
//     }

//     console.log(
//       'Comparing digits - DB:',
//       user.authDigits,
//       'Input:',
//       lastDigits
//     );
//     if (user.authDigits !== lastDigits) {
//       return res
//         .status(401)
//         .json({ success: false, message: 'Invalid credentials' });
//     }

//     // Remove sensitive data
//     delete user.authDigits;

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       user: user,
//       role: patient ? 'patient' : 'caretaker',
//     });
//   } catch (error) {
//     console.error('Full error details:', {
//       message: error.message,
//       stack: error.stack,
//       name: error.name,
//     });
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined,
//     });
//   }
// };



// In your auth controller
exports.login = async (req, res) => {
  console.log('Login request body:', req.body); // Log the request body for debugging
  
  try {
    const { email, lastDigits, role } = req.body.formData;
    console.log('Login attempt for:', req.body.formData.email, 'Role:', role);
    
    // Find user based on email and role
    const user = await (role === 'patient' ? Patient : Caretaker).findOne(
      email);
      console.log(user)


    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    res.json({
      success: true,
      role,
      name: user.firstName // Optional: return user's name
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};