import React, { use, useState } from 'react';
import { loginUser } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    lastDigits: '',
    role: 'patient', // Default to patient
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // console.log(formData)

    try {
        console.log("step1");
        // const {email, lastDigits, role} = formData;
      const response = await loginUser({formData});
      // console.log(response)
      // console.log("step2");
    

      if (response.success) {
        
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userRole', formData.role);
        if (formData.role === 'caretaker') {
          localStorage.setItem('caretakerEmail', formData.email);
        } else {
          localStorage.setItem('patientEmail', formData.email);
        }

        // Store additional data if available in response
        if (response.name) {
          localStorage.setItem('userName', response.name);
        }
        console.log(formData.role)

        // Redirect based on role
        navigate(
          formData.role === 'patient'
            ? '/patient-dashboard'
            : '/professional-dashboard'
        );
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <p>Please enter your details to login</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>I am a:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="patient">Patient</option>
            <option value="caretaker">Caregiver</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last 4 Digits of Phone Number</label>
          <input
            type="text"
            name="lastDigits"
            value={formData.lastDigits}
            onChange={handleChange}
            maxLength="4"
            pattern="\d{4}"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="register-link">
        <p>
          New user? You'll be automatically registered when you fill out the
          forms
        </p>
      </div>
    </div>
  );
};

export default Login;
