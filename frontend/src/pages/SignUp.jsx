import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      {/* Background Image Element */}
      <div className="background-image"></div>

      <h2 className="signup-heading">
        Are you joining as a Caretaker or a Senior in need of assistance?
      </h2>
      <div className="role-selection-buttons">
        <button
          className="role-button caretakers"
          onClick={() => navigate('/caretaker-form')}
        >
          Caretaker
        </button>
        <button
          className="role-button patient"
          onClick={() => navigate('/patient-form')}
        >
          Patient
        </button>
      </div>
    </div>
  );
};

export default SignUp;
