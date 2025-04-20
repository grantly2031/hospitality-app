import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/caretakerForm.css';
import { createCaretaker } from '../services/api';

const CaretakerForm = ({ onSubmit, isSubmitting }) => {
  const [caretakerData, setCaretakerData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    email: '',
    about: '',
    education: '',

    fieldOfStudy: [],
    availableDays: [],
    timeSlots: {
      morning: false,
      afternoon: false,
      evening: false
    },
    experience: '',
    certifications: [],
    languages: [],
  });

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const certificationOptions = [
    'First Aid',
    'CPR',
    'Nursing Certification',
    'Personal Support Worker',
    'Other'
  ];
  const languagesOptions = [
    'English',
    'French',
    'Spanish',
    'Mandarin',
    'Arabic',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaretakerData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCaretakerData(prev => {
      const updated = checked
        ? [...prev.fieldOfStudy, name]
        : prev.fieldOfStudy.filter(item => item !== name);
      return { ...prev, fieldOfStudy: updated };
    });
  };

  const handleDayChange = (day) => {
    setCaretakerData(prev => {
      const updated = prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: updated };
    });
  };

  const handleTimeSlotChange = (slot) => {
    setCaretakerData(prev => ({
      ...prev,
      timeSlots: { ...prev.timeSlots, [slot]: !prev.timeSlots[slot] }
    }));
  };

  const handleCertificationChange = (cert) => {
    setCaretakerData(prev => {
      const updated = prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert];
      return { ...prev, certifications: updated };
    });
  };
  const handleLanguageChange = (lang) => {
    console.log(caretakerData.languages);
    setCaretakerData(prev => {
      const updated = prev.languages.includes(lang)
        ? prev.certifications.filter(c => c !== lang)
        : [...prev.languages, lang];
      return { ...prev, languages: updated };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Extract last 4 digits of phone
      const authDigits = caretakerData.phoneNumber.slice(-4);
      const caretakerData1 = { ...caretakerData, authDigits };

      // await createPatient(patientData);

      const response = await createCaretaker(caretakerData1);

      // Store email for future reference
      localStorage.setItem('caretakerEmail', caretakerData1.email);
      localStorage.setItem('userRole', 'caretaker');
      // console.log('Patient created:', response.data);

      onSubmit(caretakerData, '/professional-dashboard');

      // Redirect or show success message
    } catch (error) {
      console.error('Error creating patient:', error);
      // Show error message to user
    }

    // // Store email for future reference
    // localStorage.setItem('caretakerEmail', caretakerData.email);
    // localStorage.setItem('userRole', 'caretaker');
    // onSubmit(caretakerData, '/professional-dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Welcome, Caretaker!</h2>
      <p className="form-subtitle">
        Please fill out the following information to create your profile.
      </p>

      <div className="form-columns">
        {/* Personal Information Column */}
        <div className="form-column">
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
                  value={caretakerData.firstName}
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
                  value={caretakerData.lastName}
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
                value={caretakerData.dob}
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
                value={caretakerData.gender}
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
                value={caretakerData.phoneNumber}
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
                value={caretakerData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="input-field">
              <label htmlFor="about">
                About <span className="required">*</span>
              </label>
              <input
                type="about"
                id="about"
                name="about"
                value={caretakerData.about}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="input-field">
              <label htmlFor="education">
                Education <span className="required">*</span>
              </label>
              <input
                type="education"
                id="education"
                name="education"
                value={caretakerData.education}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <h4 className="section-title">Languages</h4>
            <div className="checkbox-group">
              {languagesOptions.map((lang) => (
                <label key={lang} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={caretakerData.languages.includes(lang)}
                    onChange={() => handleLanguageChange(lang)}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  {lang}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Information Column */}
        <div className="form-column">
          <div className="input-group">
            <h3 className="section-title">Professional Information</h3>

            <div className="input-field">
              <label htmlFor="experience">
                Years of Experience <span className="required">*</span>
              </label>
              <select
                id="experience"
                name="experience"
                value={caretakerData.experience}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <h4 className="section-title">
              Field of Study <span className="required">*</span>
            </h4>
            <div className="checkbox-group">
              {[
                'Nursing',
                'Nursing Assistant',
                'Personal Support Worker',
                'Physiotherapy',
                'Occupational Therapy',
                'Social Work',
                'Psychology',
                'Other Healthcare Field',
              ].map((field) => (
                <label key={field} className="checkbox-label">
                  <input
                    type="checkbox"
                    name={field}
                    checked={caretakerData.fieldOfStudy.includes(field)}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  {field}
                </label>
              ))}
            </div>

            <h4 className="section-title">Certifications</h4>
            <div className="checkbox-group">
              {certificationOptions.map((cert) => (
                <label key={cert} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={caretakerData.certifications.includes(cert)}
                    onChange={() => handleCertificationChange(cert)}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  {cert}
                </label>
              ))}
            </div>

            <h3 className="section-title">Availability</h3>
            <div className="days-selection">
              <h4>
                Available Days <span className="required">*</span>
              </h4>
              <div className="days-container">
                {daysOfWeek.map((day) => (
                  <label key={day} className="day-checkbox-label">
                    <input
                      type="checkbox"
                      checked={caretakerData.availableDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                      disabled={isSubmitting}
                    />
                    <span className="custom-checkbox"></span>
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div className="time-slots-selection">
              <h4>
                Available Time Slots <span className="required">*</span>
              </h4>
              <div className="time-slots-container">
                <label className="time-slot-label">
                  <input
                    type="checkbox"
                    checked={caretakerData.timeSlots.morning}
                    onChange={() => handleTimeSlotChange('morning')}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  Morning (8AM - 12PM)
                </label>
                <label className="time-slot-label">
                  <input
                    type="checkbox"
                    checked={caretakerData.timeSlots.afternoon}
                    onChange={() => handleTimeSlotChange('afternoon')}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  Afternoon (12PM - 5PM)
                </label>
                <label className="time-slot-label">
                  <input
                    type="checkbox"
                    checked={caretakerData.timeSlots.evening}
                    onChange={() => handleTimeSlotChange('evening')}
                    disabled={isSubmitting}
                  />
                  <span className="custom-checkbox"></span>
                  Evening (5PM - 9PM)
                </label>
              </div>
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

export default CaretakerForm;