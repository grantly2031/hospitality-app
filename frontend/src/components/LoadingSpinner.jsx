// components/LoadingSpinner.jsx
import React from 'react';
import '../styles/LoadingSpinner.css'; // Create this CSS file

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Submitting...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;