// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Your backend URL
// });

// // Caretaker API
// export const createCaretaker = (caretakerData) =>
//   API.post('/caretakers', caretakerData);
// export const getCaretakers = () => API.get('/caretakers');

// // Patient API
// export const createPatient = (patientData) =>
//   API.post('/patients', patientData);
// export const getPatients = () => API.get('/patients');

// export default API;
















import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Patient endpoints
export const createPatient = (patientData) => API.post('/patients', patientData);
export const getPatient = (email) => API.get(`/patients/${email}`);
export const updatePatient = (email, patientData) => API.put(`/patients/${email}`, patientData);

// Caretaker endpoints
export const createCaretaker = (caretakerData) => API.post('/caretakers', caretakerData);
export const getCaregiverById = (id) => API.get(`/caretakers/${id}`);
export const getCaretaker = (email) => API.get(`/caretakers/email/${email}`);
export const getCaretakers = () => API.get('/caretakers/');
export const updateCaretaker = (email, caretakerData) => API.put(`/caretakers/${email}`, caretakerData);
export const getCaregiversByEmails = (emails) =>
  API.post('/caretakers/by-emails', { emails });

export const loginUser = (formData) =>
  API.post('/auth/login', {formData});


// Add this normalization function
const normalizeMessages = (response) => {
  // If response is already an array
  if (Array.isArray(response)) return response;
  
  // If response has data array
  if (response.data && Array.isArray(response.data)) return response.data;
  
  // If single message object
  if (response._id) return [response];
  
  // If response has data object
  if (response.data && response.data._id) return [response.data];
  
  // Default to empty array
  return [];
};

// Update your API functions
export const getMessages = async (patientEmail, caregiverEmail) => {
  const response = await API.get(`/messages/${patientEmail}/${caregiverEmail}`);
  return normalizeMessages(response);
};

export const sendMessage = async (patientEmail, caregiverEmail, content) => {
  const response = await API.post('/messages/send', { patientEmail, caregiverEmail, content });
  return normalizeMessages(response)[0]; // Return single message
};

export const addCaregiver = (patientEmail, caregiverEmail) =>
  API.post('/patients/add-caregiver', { patientEmail, caregiverEmail });

export const removeCaregiver = (patientEmail, caregiverEmail) =>
  API.post('/messages/remove', {
    patientEmail,
    caregiverEmail,
  });


// In your api.js
API.interceptors.response.use(
  response => {
    // Ensure data is always an array for messages
    if (response.config.url.includes('/messages/')) {
      return Array.isArray(response.data) ? response.data : [response.data];
    }
    return response.data;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

// Add response interceptor for error handling
// API.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

export default API;
