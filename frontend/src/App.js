import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import PatientDashboard from './pages/PatientDashboard';
import PatientForm from './pages/PatientForm';
import CaretakerForm from './pages/CaretakerForm';
import LoadingSpinner from './components/LoadingSpinner';
import CaregiverSearch from './pages/CaregiverSearch';
import CaregiverDetail from './pages/CaregiverDetail';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/Login';

const FormWrapper = ({ Component, redirectPath }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage with appropriate key
      const storageKey = redirectPath.includes('professional') ? 'caretakerData' : 'patientData';
      localStorage.setItem(storageKey, JSON.stringify(formData));
      
      navigate(redirectPath);
    } catch (error) {
      setError(error.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      {isSubmitting && <LoadingSpinner />}
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}
      <Component onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* Dashboard Routes */}
        <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        
        {/* Form Routes */}
        <Route 
          path="/patient-form" 
          element={
            <FormWrapper 
              Component={PatientForm} 
              redirectPath="/patient-dashboard"
            />
          } 
        />
        <Route 
          path="/caretaker-form" 
          element={
            <FormWrapper 
              Component={CaretakerForm} 
              redirectPath="/professional-dashboard"
            />
          } 
        />

        <Route path='/login' element={<Login />} />
        
        {/* Caregiver Routes */}
        <Route path="/caregivers" element={<CaregiverSearch />} />
        <Route path="/caregivers/:id" element={<CaregiverDetail />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<div className="not-found">Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;