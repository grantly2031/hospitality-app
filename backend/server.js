require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const caretakerRoutes = require('./routes/caretaker.routes');
const patientRoutes = require('./routes/patient.routes');
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
// app.use(express.json());


// Add these middleware BEFORE your routes
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data




app.use('/api/auth', authRoutes);
// Define Routes
app.use('/api/caretakers', caretakerRoutes);
app.use('/api/patients', patientRoutes);
// Make sure this comes after other middleware but before error handling
app.use('/api/messages', messageRoutes);
// app.use('/api/messages', messageRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hospital App API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
