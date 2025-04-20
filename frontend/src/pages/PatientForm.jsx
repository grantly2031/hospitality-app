import React, { useState } from 'react';
import '../styles/caretakerForm.css';
import { createPatient } from '../services/api';

const PatientForm = ({ onSubmit, isSubmitting }) => {
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    assistanceType: [],
    availabilityStartDate: '',
    availabilityEndDate: '',
    startTime: '',
    endTime: '',
    totalHours: 0,
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPatientData((prev) => {
      const updated = checked
        ? [...prev.assistanceType, name]
        : prev.assistanceType.filter((item) => item !== name);
      return { ...prev, assistanceType: updated };
    });
  };

  const calculateTotalHours = () => {
    if (patientData.startTime && patientData.endTime) {
      const start = new Date(`1970-01-01T${patientData.startTime}:00`);
      const end = new Date(`1970-01-01T${patientData.endTime}:00`);
      const diff = (end - start) / (1000 * 60 * 60);
      setPatientData((prev) => ({ ...prev, totalHours: diff.toFixed(1) }));
    }
  };

  // In your parent component
  const handleSubmit = async (e) => {
    try {
      // Validate required fields
      if (
        !patientData.availabilityStartDate ||
        !patientData.availabilityEndDate
      ) {
        alert('Please select your availability dates');
        return;
      }

      e.preventDefault();

      // Extract last 4 digits of phone
      const authDigits = patientData.phoneNumber.slice(-4);
      const patientData1 = { ...patientData, authDigits };

      // await createPatient(patientData);

      const response = await createPatient(patientData1);

      // Store email for future reference
      localStorage.setItem('patientEmail', patientData1.email);
      localStorage.setItem('userRole', 'patient');
      // console.log('Patient created:', response.data);

      onSubmit(patientData, '/patient-dashboard');

      // Redirect or show success message
    } catch (error) {
      console.error('Error creating patient:', error);
      // Show error message to user
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validate required fields
  //   if (
  //     !patientData.availabilityStartDate ||
  //     !patientData.availabilityEndDate
  //   ) {
  //     alert('Please select your availability dates');
  //     return;
  //   }
  //   console.log('Submitting patient data:', patientData);
  //   onSubmit(patientData);
  // };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Welcome, Senior!</h2>
      <p className="form-subtitle">
        Please fill out the following information to create your profile.
      </p>

      <div className="form-columns">
        {/* Personal Information Column */}
        <div className="form-column personal-info">
          <div className="input-group">
            <div className="name-container">
              <div className="input-field">
                <label htmlFor="firstName">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={patientData.firstName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={patientData.lastName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                type="text"
                id="dob"
                name="dob"
                value={patientData.dob}
                onChange={handleChange}
                placeholder="MM/DD/YYYY"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="input-field">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="phoneNumber">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={patientData.phoneNumber}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="input-field">
              <label htmlFor="address">
                Street Address <span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={patientData.address}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="address-group">
              <div className="input-field">
                <label htmlFor="city">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={patientData.city}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="input-field">
                <label htmlFor="postalCode">
                  Postal Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={patientData.postalCode}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services & Availability Column */}
        <div className="form-column services-availability">
          <div className="input-group">
            <h3 className="section-title">
              What type of assistance are you needing?
            </h3>
            <div className="assistance-grid">
              {[
                {
                  id: 'personalCare',
                  label: 'Personal Care (Bathing, grooming, dressing, toilet)',
                },
                {
                  id: 'medicalSupport',
                  label: 'Medical Support (Wound care, vitals, medication)',
                },
                {
                  id: 'specializedCare',
                  label: "Specialized Care (Dementia/Alzheimer's care)",
                },
                {
                  id: 'mobilitySupport',
                  label: 'Mobility Support (Stretching, movement)',
                },
                {
                  id: 'mentalSupport',
                  label: 'Mental Support (Stress, anxiety, grief)',
                },
                { id: 'mealPrep', label: 'Meal Preparation' },
                { id: 'housekeeping', label: 'Light Housekeeping' },
                { id: 'transportation', label: 'Transportation Assistance' },
              ].map(({ id, label }) => (
                <label key={id} className="checkbox-label">
                  <input
                    type="checkbox"
                    name={id}
                    checked={patientData.assistanceType.includes(id)}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  {label}
                </label>
              ))}
            </div>

            <h3 className="section-title">When are you available for care?</h3>
            <div className="date-range-container">
              <div className="input-field">
                <label htmlFor="availabilityStartDate">
                  From Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="availabilityStartDate"
                  name="availabilityStartDate"
                  value={patientData.availabilityStartDate}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="input-field">
                <label htmlFor="availabilityEndDate">
                  To Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="availabilityEndDate"
                  name="availabilityEndDate"
                  value={patientData.availabilityEndDate}
                  onChange={handleChange}
                  min={patientData.availabilityStartDate}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="time-range-container">
              <div className="input-field">
                <label htmlFor="startTime">
                  Start Time <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={patientData.startTime}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="input-field">
                <label htmlFor="endTime">
                  End Time <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={patientData.endTime}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="button-group">
              <button
                type="button"
                className="btn btn-calculate"
                onClick={calculateTotalHours}
                disabled={isSubmitting}
              >
                Calculate Total Hours
              </button>
              <div className="total-hours-display">
                Total Hours: <strong>{patientData.totalHours}</strong> hrs per
                day
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="additionalNotes">Additional Notes</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={patientData.additionalNotes}
                onChange={handleChange}
                rows="4"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button
          type="submit"
          className="btn btn-success"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
