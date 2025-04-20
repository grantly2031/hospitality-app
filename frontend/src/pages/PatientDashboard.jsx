import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboardStyles.css';
import ChatBox from "../components/chat/ChatBox";
import CaregiverSearch from './CaregiverSearch';
import { getCaregiversByEmails, getPatient, removeCaregiver } from '../services/api';
import MessageDialog from '../components/MessageDialogue';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    careSchedule: [],
    assistanceNeeds: [],
    caregivers: []
  });

  const [activeSection, setActiveSection] = useState('schedule');
  const [currentChat, setCurrentChat] = useState(null);
  const [showCaregiverSearch, setShowCaregiverSearch] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [caregivers, setCaregivers] = useState([]);
  const [chatcaregiver, setChatCaregiver] = useState(
    localStorage.getItem('caregiverEmail')
  );
    const [showChat, setShowChat] = useState(false);
  const [insuranceFormData, setInsuranceFormData] = useState({
    phone: '',
    bestTime: '',
    bestDate: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const patientEmail = localStorage.getItem('patientEmail');



  useEffect(() => {
    // const savedData = JSON.parse(localStorage.getItem('patientData') || '{}');
    // const caregivers = JSON.parse(localStorage.getItem('caregivers') || '[]');

    const fetchPatientData = async () => {
      try {
          // Get email from localStorage or auth context
      const email = localStorage.getItem('patientEmail');
      if (!email) {
        navigate('/patient-form');
        return;
      }

      const response = await getPatient(email);
      // console.log(response)
      const savedData = response.data;

    
    setPatientData({
      id: savedData.id || `pat_${Date.now()}`,
      name: `${savedData.firstName || ''} ${savedData.lastName || ''}`.trim(),
      phone: savedData.phoneNumber || '',
      email: savedData.email || '',
      assistanceNeeds: savedData.assistanceType || [],
      careSchedule: formatCareSchedule(savedData),
      caregivers: savedData.caregivers,
    });

   } catch (err) {
        console.error('Failed to fetch patient data:', err);
        setError('Failed to load patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [navigate]);



  
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        setLoading(true);
        // console.log(patientData.caregivers);
        const response = await getCaregiversByEmails(patientData.caregivers);
        // console.log(response.data);
        setCaregivers(response.data);
        // console.log(caregivers;
        // console.log('Caregivers:', caregivers.data);  
      } catch (err) {
        setError('Failed to load caregivers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (patientData.caregivers?.length > 0) {
      fetchCaregivers();
    } else {
      setCaregivers([]);
      setLoading(false);
    }
  }, [patientData.caregivers, caregivers]);






  // }, []);

  const formatCareSchedule = (data) => {
    if (!data.availabilityStartDate || !data.availabilityEndDate) return [];
    const startDate = new Date(data.availabilityStartDate);
    const endDate = new Date(data.availabilityEndDate);
    const days = [];
    
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      days.push({
        date: day.toISOString().split('T')[0],
        dayName: day.toLocaleDateString('en-US', { weekday: 'long' }),
        timeSlot: `${data.startTime} - ${data.endTime}`,
        needs: data.assistanceType
      });
    }
    return days;
  };

  const getFriendlyNeedName = (need) => {
    const names = {
      personalCare: 'Personal Care',
      medicalSupport: 'Medical Support',
      specializedCare: 'Specialized Care',
      mobilitySupport: 'Mobility Support',
      mentalSupport: 'Mental Support',
      mealPrep: 'Meal Preparation',
      housekeeping: 'Housekeeping',
      transportation: 'Transportation'
    };
    return names[need] || need;
  };
  const handleShowCaregiverSearch = () => {
    navigate('/caregivers');
    // setShowCaregiverSearch(true);
    // setShowPaymentForm(false);
    // setShowInsuranceForm(false);
  };

  const handleAddCaregiver = (caregiver) => {
    const updatedCaregivers = [...patientData.caregivers, caregiver];
    setPatientData(prev => ({
      ...prev,
      caregivers: updatedCaregivers
    }));
    localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
    setShowCaregiverSearch(false);
  };

  const handleRemoveCaregiver = (caregiverId) => {
    const updatedCaregivers = patientData.caregivers.filter(c => c.id !== caregiverId);
    setPatientData(prev => ({
      ...prev,
      caregivers: updatedCaregivers
    }));
    localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
  };

  const handleDeleteChat = (caregiverId) => {
    const updatedCaregivers = patientData.caregivers.filter(c => c.id !== caregiverId);
    setPatientData(prev => ({
      ...prev,
      caregivers: updatedCaregivers
    }));
    localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
  };

  const handleInsuranceFormChange = (e) => {
    const { name, value } = e.target;
    setInsuranceFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInsuranceSubmit = (e) => {
    e.preventDefault();
    alert('Insurance request submitted! We will contact you soon.');
    setShowInsuranceForm(false);
    setInsuranceFormData({
      phone: '',
      bestTime: '',
      bestDate: '',
      notes: ''
    });
  };

    const handleStartChat = (caregiverEmail) => {
      console.log('Starting chat with:', caregiverEmail);
      setChatCaregiver(caregiverEmail);

  
    // Open the chat
    setShowChat(true);
  };

    const handleRemove = async (caregiverId) => {
      try {
        console.log('Removing caregiver with ID:', patientEmail, caregiverId);
        await removeCaregiver(patientEmail, caregiverId);
        alert('Caregiver removed successfully');
        window.location.reload();
        // onClose();
      } catch (err) {
        setError('Failed to remove caregiver. Please try again.');
        console.error(err);
      }
    };


  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('patientData');
    localStorage.removeItem('caregivers');
    // Redirect to home page or login page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {!showCaregiverSearch && !showPaymentForm && !showInsuranceForm ? (
        <>
          <div className="dashboard-sidebar">
            <div className="sidebar-header">
              <h3>My Dashboard</h3>
              <div className="user-avatar">
                {patientData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <p className="user-name">{patientData.name}</p>
              <p className="user-role">Patient</p>
            </div>

            <nav className="sidebar-nav">
              <button
                className={activeSection === 'schedule' ? 'active' : ''}
                onClick={() => setActiveSection('schedule')}
              >
                <i className="fas fa-calendar-alt"></i> My Care Schedule
              </button>
              <button
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => setActiveSection('profile')}
              >
                <i className="fas fa-user"></i> Profile
              </button>
              <button
                className={activeSection === 'caregivers' ? 'active' : ''}
                onClick={() => setActiveSection('caregivers')}
              >
                <i className="fas fa-hands-helping"></i> My Caregivers
              </button>
              <button
                className={activeSection === 'messages' ? 'active' : ''}
                onClick={() => setActiveSection('messages')}
              >
                <i className="fas fa-envelope"></i> Messages
              </button>
              <button
                className={activeSection === 'payments' ? 'active' : ''}
                onClick={() => setActiveSection('payments')}
              >
                <i className="fas fa-credit-card"></i> Payments
              </button>
            </nav>

            {/* Logout Button */}
            <div className="sidebar-footer">
              <button className="btn-logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>

          {/* Rest of your existing JSX remains the same */}
          <div className="dashboard-main">
            {activeSection === 'profile' && (
              <div className="dashboard-section">
                <h2>
                  <i className="fas fa-user"></i> My Profile
                </h2>
                <div className="info-card">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{patientData.name || 'Not provided'}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone Number</label>
                    <p>{patientData.phone || 'Not provided'}</p>
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    <p>{patientData.email || 'Not provided'}</p>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => navigate('/patient-form')}
                    >
                      <i className="fas fa-edit"></i> Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'schedule' && (
              <div className="dashboard-section">
                <h2>
                  <i className="fas fa-calendar-alt"></i> My Care Schedule
                </h2>
                <div className="info-card">
                  <h3>Upcoming Care Days</h3>
                  {patientData.careSchedule.length > 0 ? (
                    <div className="care-needs-container">
                      {patientData.careSchedule
                        .slice(0, 3)
                        .map((day, index) => (
                          <div key={index} className="care-day-card">
                            <div className="care-day-header">
                              <div className="care-day-title">
                                {new Date(day.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'long',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </div>
                              <span className="care-type-badge">
                                {day.timeSlot}
                              </span>
                            </div>
                            <ul className="care-details-list">
                              {patientData.assistanceNeeds.map((need, i) => (
                                <li key={i}>
                                  <i className="fas fa-check-circle"></i>
                                  {getFriendlyNeedName(need)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="no-schedule">
                      <p>No care schedule set up yet</p>
                      <button
                        className="btn-action"
                        onClick={() => navigate('/patient-form')}
                      >
                        <i className="fas fa-plus"></i> Create Care Schedule
                      </button>
                    </div>
                  )}
                </div>

                {patientData.careSchedule.length > 0 && (
                  <>
                    <div className="info-card">
                      <h3>Weekly View</h3>
                      <div className="calendar-view">
                        {[
                          'Sunday',
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                        ].map((day) => {
                          const hasCare = patientData.careSchedule.some(
                            (d) => d.dayName === day
                          );
                          return (
                            <div
                              key={day}
                              className={`calendar-day ${
                                hasCare ? 'active' : ''
                              }`}
                            >
                              <div className="calendar-day-header">
                                {day.substring(0, 3)}
                              </div>
                              {hasCare && (
                                <>
                                  <div>
                                    <i className="fas fa-clock"></i>{' '}
                                    {patientData.careSchedule[0].timeSlot}
                                  </div>
                                  <div>
                                    <i className="fas fa-user-nurse"></i> Care
                                    Scheduled
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => navigate('/patient-form')}
                      >
                        <i className="fas fa-edit"></i> Update Schedule
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {showChat && (
              <MessageDialog
                caregiverEmail={chatcaregiver}
                onClose={() => setShowChat(false)}
              />
            )}

            {activeSection === 'caregivers' && (
              <div className="dashboard-section">
                <h2>
                  <i className="fas fa-hands-helping"></i> My Caregivers
                </h2>
                <div className="caregiver-grid">
                  {caregivers.length > 0 ? (
                    caregivers.map((caregiver) => (
                      <div
                        key={caregiver.id}
                        className="info-card caregiver-card"
                      >
                        <div className="caregiver-info">
                          {/* <div className="user-avatar sm">
                            {caregiver.name.split(' ').map(n => n[0]).join('')}
                          </div> */}
                          <div>
                            <h3>{caregiver.firstName}</h3>
                            <p className="specialty">{caregiver.about}</p>
                          </div>
                        </div>
                        <div className="caregiver-actions">
                          <button
                            className="btn-action"
                            onClick={() => handleStartChat(caregiver.email)}
                          >
                            Message
                          </button>
                          <button
                            className="btn-remove"
                            onClick={() => handleRemove(caregiver.email)}
                          >
                            <i className="fas fa-trash-alt"></i> Remove
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="info-card">
                      <p>Your assigned caregivers will appear here</p>
                    </div>
                  )}
                </div>
                <div className="action-buttons">
                  <button
                    className="btn-action"
                    onClick={() => handleShowCaregiverSearch()}
                  >
                    <i className="fas fa-search"></i> Find Caregivers
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'messages' && (
              <div className="dashboard-section">
                <h2>
                  <i className="fas fa-envelope"></i> Messages
                </h2>
                {/* <div className="message-list">
                  {caregivers.length > 0 ? (
                    caregivers.map((caregiver) => (
                      <div
                        key={caregiver.id}
                        className="info-card message-card"
                      >
                        <div
                          className="message-content"
                          onClick={() => handleStartChat(caregiver.email)}
                        >
                          <div className="caregiver-info">
                            <div>
                              <h3>{caregiver.firstName}</h3>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(caregiver.email)}
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="info-card">
                      <p>No messages yet</p>
                    </div>
                  )}
                </div> */}

                <div className="message-list-container">
                  {caregivers.length > 0 ? (
                    <div className="message-grid">
                      {caregivers.map((caregiver) => (
                        <div key={caregiver.id} className="message-card">
                          <div
                            className="message-content"
                            onClick={() => handleStartChat(caregiver.email)}
                          >
                            <div className="avatar-container">
                              <div className="avatar">
                                {caregiver.firstName.charAt(0)}
                              </div>
                            </div>
                            <div className="caregiver-details">
                              <h3 className="caregiver-name">
                                {caregiver.firstName} {caregiver.lastName}
                              </h3>
                              <p className="caregiver-email">
                                {caregiver.email}
                              </p>
                            </div>
                          </div>
                          <button
                            className="remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemove(caregiver.email);
                            }}
                            aria-label="Remove caregiver"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-comment-alt"></i>
                      <p>No messages yet</p>
                      <small>Start a conversation with a caregiver</small>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'payments' && (
              <div className="dashboard-section">
                <h2>
                  <i className="fas fa-credit-card"></i> Payment Options
                </h2>
                <div className="info-card">
                  <h3>Choose Payment Method</h3>
                  <div className="payment-options">
                    <button
                      className="btn-payment"
                      onClick={() => setShowPaymentForm(true)}
                    >
                      <i className="fas fa-credit-card"></i> Pay with Credit
                      Card
                    </button>
                    <button
                      className="btn-payment"
                      onClick={() => setShowInsuranceForm(true)}
                    >
                      <i className="fas fa-file-invoice-dollar"></i> Pay with
                      Insurance
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {currentChat && (
            <ChatBox
              currentUser={currentChat.patient}
              otherUser={currentChat.caregiver}
              onClose={() => setCurrentChat(null)}
            />
          )}
        </>
      ) : showCaregiverSearch ? (
        <div className="caregiver-search-view">
          <div className="search-header">
            <button
              className="back-button"
              onClick={() => setShowCaregiverSearch(false)}
            >
              <i className="fas fa-arrow-left"></i> Back to Dashboard
            </button>
            <h1>Find Caregivers</h1>
          </div>
          <CaregiverSearch
            onSelectCaregiver={handleAddCaregiver}
            patientNeeds={patientData.assistanceNeeds}
            patientAvailability={patientData.careSchedule}
          />
        </div>
      ) : showInsuranceForm ? (
        <div className="payment-form-view">
          <div className="form-header">
            <button
              className="back-button"
              onClick={() => setShowInsuranceForm(false)}
            >
              <i className="fas fa-arrow-left"></i> Back to Payments
            </button>
            <h1>Insurance Payment Request</h1>
          </div>
          <form className="insurance-form" onSubmit={handleInsuranceSubmit}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={insuranceFormData.phone}
                onChange={handleInsuranceFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Best Time to Contact</label>
              <select
                name="bestTime"
                value={insuranceFormData.bestTime}
                onChange={handleInsuranceFormChange}
                required
              >
                <option value="">Select a time</option>
                <option value="Morning (9am-12pm)">Morning (9am-12pm)</option>
                <option value="Afternoon (12pm-5pm)">
                  Afternoon (12pm-5pm)
                </option>
                <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Best Date to Contact</label>
              <input
                type="date"
                name="bestDate"
                value={insuranceFormData.bestDate}
                onChange={handleInsuranceFormChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={insuranceFormData.notes}
                onChange={handleInsuranceFormChange}
                placeholder="Any special instructions or details about your insurance..."
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Request
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowInsuranceForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        showPaymentForm && (
          <div className="payment-form-view">
            <div className="form-header">
              <button
                className="back-button"
                onClick={() => setShowPaymentForm(false)}
              >
                <i className="fas fa-arrow-left"></i> Back to Payments
              </button>
              <h1>Credit Card Payment</h1>
            </div>
            <div className="info-card">
              <p>
                Payment processing would be implemented here with a service like
                Stripe or PayPal in a real application.
              </p>
              <div className="action-buttons">
                <button
                  className="btn-action"
                  onClick={() => setShowPaymentForm(false)}
                >
                  <i className="fas fa-arrow-left"></i> Back to Payments
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PatientDashboard;