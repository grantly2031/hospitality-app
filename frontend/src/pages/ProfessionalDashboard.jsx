// // import React, { useState, useEffect } from 'react';
// // import '../styles/dashboardStyles.css'; // We'll create this new CSS file

// // const ProfessionalDashboard = () => {
// //   // Load data from localStorage (set when form is submitted)
// //   const [professionalData, setProfessionalData] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     availability: [],
// //     certifications: [],
// //     seniorsHelped: 0
// //   });

// //   useEffect(() => {
// //     // Load saved data when component mounts
// //     const savedData = localStorage.getItem('caretakerData');
// //     if (savedData) {
// //       const parsedData = JSON.parse(savedData);
// //       setProfessionalData({
// //         name: `${parsedData.firstName} ${parsedData.lastName}`,
// //         phone: parsedData.phoneNumber,
// //         email: parsedData.email,
// //         availability: getFormattedAvailability(parsedData),
// //         certifications: parsedData.certifications || [],
// //         seniorsHelped: Math.floor(Math.random() * 50) + 1 // Random for demo
// //       });
// //     }
// //   }, []);

// //   const getFormattedAvailability = (data) => {
// //     const days = data.availableDays || [];
// //     const slots = [];
// //     if (data.timeSlots?.morning) slots.push('Morning (8AM-12PM)');
// //     if (data.timeSlots?.afternoon) slots.push('Afternoon (12PM-5PM)');
// //     if (data.timeSlots?.evening) slots.push('Evening (5PM-9PM)');
    
// //     return days.map(day => slots.map(slot => `${day} ${slot}`)).flat();
// //   };

// //   const [activeSection, setActiveSection] = useState('profile');

// //   return (
// //     <div className="dashboard-container">
// //       <div className="dashboard-sidebar">
// //         <div className="sidebar-header">
// //           <h3>My Dashboard</h3>
// //           <div className="user-avatar">
// //             {professionalData.name.split(' ').map(n => n[0]).join('')}
// //           </div>
// //           <p className="user-name">{professionalData.name}</p>
// //           <p className="user-role">Licensed Professional</p>
// //         </div>
        
// //         <nav className="sidebar-nav">
// //           <button 
// //             className={activeSection === 'profile' ? 'active' : ''}
// //             onClick={() => setActiveSection('profile')}
// //           >
// //             <i className="fas fa-user"></i> My Profile
// //           </button>
// //           <button 
// //             className={activeSection === 'availability' ? 'active' : ''}
// //             onClick={() => setActiveSection('availability')}
// //           >
// //             <i className="fas fa-calendar-alt"></i> Availability
// //           </button>
// //           <button 
// //             className={activeSection === 'communication' ? 'active' : ''}
// //             onClick={() => setActiveSection('communication')}
// //           >
// //             <i className="fas fa-envelope"></i> Communication
// //           </button>
// //           <button 
// //             className={activeSection === 'stats' ? 'active' : ''}
// //             onClick={() => setActiveSection('stats')}
// //           >
// //             <i className="fas fa-chart-line"></i> Statistics
// //           </button>
// //         </nav>
// //       </div>

// //       <div className="dashboard-main">
// //         {activeSection === 'profile' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-user"></i> My Professional Profile</h2>
// //             <div className="info-card">
// //               <div className="info-item">
// //                 <label>Full Name</label>
// //                 <p>{professionalData.name || 'Not provided'}</p>
// //               </div>
// //               <div className="info-item">
// //                 <label>Phone Number</label>
// //                 <p>{professionalData.phone || 'Not provided'}</p>
// //               </div>
// //               <div className="info-item">
// //                 <label>Email Address</label>
// //                 <p>{professionalData.email || 'Not provided'}</p>
// //               </div>
// //               <div className="action-buttons">
// //                 <button className="btn-edit">
// //                   <i className="fas fa-edit"></i> Edit Profile
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeSection === 'availability' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-calendar-alt"></i> My Availability</h2>
// //             <div className="info-card">
// //               <h3>Scheduled Availability</h3>
// //               {professionalData.availability.length > 0 ? (
// //                 <ul className="availability-list">
// //                   {professionalData.availability.map((slot, index) => (
// //                     <li key={index}>
// //                       <i className="fas fa-clock"></i> {slot}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p className="no-availability">No availability set yet</p>
// //               )}
// //               <div className="action-buttons">
// //                 <button className="btn-edit">
// //                   <i className="fas fa-edit"></i> Update Availability
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeSection === 'communication' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-envelope"></i> Communication</h2>
// //             <div className="action-card-container">
// //               <div className="action-card">
// //                 <i className="fas fa-inbox"></i>
// //                 <h3>Inbox</h3>
// //                 <p>View and respond to messages</p>
// //                 <button className="btn-action">Open Inbox</button>
// //               </div>
// //               <div className="action-card">
// //                 <i className="fas fa-paper-plane"></i>
// //                 <h3>New Message</h3>
// //                 <p>Send a message to a senior or colleague</p>
// //                 <button className="btn-action">Compose</button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeSection === 'stats' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-chart-line"></i> My Statistics & Credentials</h2>
// //             <div className="stats-container">
// //               <div className="stat-card">
// //                 <div className="stat-value">{professionalData.seniorsHelped}</div>
// //                 <div className="stat-label">Seniors Helped</div>
// //               </div>
// //               <div className="stat-card">
// //                 <div className="stat-value">{professionalData.certifications.length}</div>
// //                 <div className="stat-label">Certifications</div>
// //               </div>
// //             </div>
            
// //             <div className="info-card">
// //               <h3>My Certifications</h3>
// //               {professionalData.certifications.length > 0 ? (
// //                 <ul className="certification-list">
// //                   {professionalData.certifications.map((cert, index) => (
// //                     <li key={index}>
// //                       <i className="fas fa-certificate"></i> {cert}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p className="no-certifications">No certifications added yet</p>
// //               )}
// //               <div className="action-buttons">
// //                 <button className="btn-edit">
// //                   <i className="fas fa-edit"></i> Update Credentials
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfessionalDashboard;

































































































































// // import React, { useState, useEffect } from 'react';
// // import '../styles/dashboardStyles.css'; // We'll create this new CSS file

// // const ProfessionalDashboard = () => {
// //   // Load data from localStorage (set when form is submitted)
// //   const [professionalData, setProfessionalData] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     availability: [],
// //     certifications: [],
// //     seniorsHelped: 0
// //   });

// //   useEffect(() => {
// //     // Load saved data when component mounts
// //     const savedData = localStorage.getItem('caretakerData');
// //     if (savedData) {
// //       const parsedData = JSON.parse(savedData);
// //       setProfessionalData({
// //         name: `${parsedData.firstName} ${parsedData.lastName}`,
// //         phone: parsedData.phoneNumber,
// //         email: parsedData.email,
// //         availability: getFormattedAvailability(parsedData),
// //         certifications: parsedData.certifications || [],
// //         seniorsHelped: Math.floor(Math.random() * 50) + 1 // Random for demo
// //       });
// //     }
// //   }, []);

// //   const getFormattedAvailability = (data) => {
// //     const days = data.availableDays || [];
// //     const slots = [];
// //     if (data.timeSlots?.morning) slots.push('Morning (8AM-12PM)');
// //     if (data.timeSlots?.afternoon) slots.push('Afternoon (12PM-5PM)');
// //     if (data.timeSlots?.evening) slots.push('Evening (5PM-9PM)');
    
// //     return days.map(day => slots.map(slot => `${day} ${slot}`)).flat();
// //   };

// //   const [activeSection, setActiveSection] = useState('profile');

// //   return (
// //     <div className="dashboard-container">
// //       <div className="dashboard-sidebar">
// //         <div className="sidebar-header">
// //           <h3>My Dashboard</h3>
// //           <div className="user-avatar">
// //             {professionalData.name.split(' ').map(n => n[0]).join('')}
// //           </div>
// //           <p className="user-name">{professionalData.name}</p>
// //           <p className="user-role">Licensed Professional</p>
// //         </div>
        
// //         <nav className="sidebar-nav">
// //           <button 
// //             className={activeSection === 'profile' ? 'active' : ''}
// //             onClick={() => setActiveSection('profile')}
// //           >
// //             <i className="fas fa-user"></i> My Profile
// //           </button>
// //           <button 
// //             className={activeSection === 'availability' ? 'active' : ''}
// //             onClick={() => setActiveSection('availability')}
// //           >
// //             <i className="fas fa-calendar-alt"></i> Availability
// //           </button>
// //           <button 
// //             className={activeSection === 'communication' ? 'active' : ''}
// //             onClick={() => setActiveSection('communication')}
// //           >
// //             <i className="fas fa-envelope"></i> Communication
// //           </button>
// //           <button 
// //             className={activeSection === 'stats' ? 'active' : ''}
// //             onClick={() => setActiveSection('stats')}
// //           >
// //             <i className="fas fa-chart-line"></i> Statistics
// //           </button>
// //         </nav>
// //       </div>

// //       <div className="dashboard-main">
// //         {activeSection === 'profile' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-user"></i> My Professional Profile</h2>
// //             <div className="info-card">
// //               <div className="info-item">
// //                 <label>Full Name</label>
// //                 <p>{professionalData.name || 'Not provided'}</p>
// //               </div>
// //               <div className="info-item">
// //                 <label>Phone Number</label>
// //                 <p>{professionalData.phone || 'Not provided'}</p>
// //               </div>
// //               <div className="info-item">
// //                 <label>Email Address</label>
// //                 <p>{professionalData.email || 'Not provided'}</p>
// //               </div>
// //               <div className="action-buttons">
// //                 <button className="btn-edit">
// //                   <i className="fas fa-edit"></i> Edit Profile
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeSection === 'availability' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-calendar-alt"></i> My Availability</h2>
// //             <div className="info-card">
// //               <h3>Scheduled Availability</h3>
// //               {professionalData.availability.length > 0 ? (
// //                 <ul className="availability-list">
// //                   {professionalData.availability.map((slot, index) => (
// //                     <li key={index}>
// //                       <i className="fas fa-clock"></i> {slot}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p className="no-availability">No availability set yet</p>
// //               )}
// //               <div className="action-buttons">
// //                 <button className="btn-edit">
// //                   <i className="fas fa-edit"></i> Update Availability
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeSection === 'communication' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-envelope"></i> Communication</h2>
// //             <div className="action-card-container">
// //               <div className="action-card">
// //                 <i className="fas fa-inbox"></i>
// //                 <h3>Inbox</h3>
// //                 <p>View and respond to messages</p>
// //                 <button className="btn-action">Open Inbox</button>
// //               </div>
// //               <div className="action-card">
// //                 <i className="fas fa-paper-plane"></i>
// //                 <h3>New Message</h3>
// //                 <p>Send a message to a senior or colleague</p>
// //                 <button className="btn-action">Compose</button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeSection === 'stats' && (
// //           <div className="dashboard-section">
// //             <h2><i className="fas fa-chart-line"></i> My Statistics & Credentials</h2>
// //             <div className="stats-container">
// //               <div className="stat-card">
// //                 <div className="stat-value">{professionalData.seniorsHelped}</div>
// //                 <div className="stat-label">Seniors Helped</div>
// //               </div>
// //               <div className="stat-card">
// //                 <div className="stat-value">{professionalData.certifications.length}</div>
// //                 <div className="stat-label">Certifications</div>
// //               </div>
// //             </div>
            
// //             <div className="info-card">
// //               <h3>My Certifications</h3>
// //               {professionalData.certifications.length > 0 ? (
// //                 <ul className="certification-list">
// //                   {professionalData.certifications.map((cert, index) => (
// //                     <li key={index}>
// //                       <i className="fas fa-certificate"></i> {cert}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p className="no-certifications">No certifications added yet</p>
// //               )}
// //               <div className="action-buttons">
// //                 <button className="btn-edit">
// //                   <i className="fas fa-edit"></i> Update Credentials
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfessionalDashboard;









































































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCaretaker } from '../services/api';
// import '../styles/dashboardStyles.css';

// const ProfessionalDashboard = () => {
//   const [professionalData, setProfessionalData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     availability: [],
//     certifications: [],
//     seniorsHelped: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfessionalData = async () => {
//       try {
//         // Get email from localStorage or auth context
//         const email = localStorage.getItem('caretakerEmail');
//         if (!email) {
//           navigate('/caretaker-form');
//           return;
//         }

//         const response = await getCaretaker(email);
//         const data = response.data.data;
        
//         setProfessionalData({
//           name: `${data.firstName} ${data.lastName}`,
//           phone: data.phoneNumber,
//           email: data.email,
//           availability: getFormattedAvailability(data),
//           certifications: data.certifications || [],
//           seniorsHelped: Math.floor(Math.random() * 50) + 1 // Random for demo
//         });
//       } catch (err) {
//         console.error('Failed to fetch professional data:', err);
//         setError('Failed to load professional data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfessionalData();
//   }, [navigate]);

//   const getFormattedAvailability = (data) => {
//     const days = data.availableDays || [];
//     const slots = [];
//     if (data.timeSlots?.morning) slots.push('Morning (8AM-12PM)');
//     if (data.timeSlots?.afternoon) slots.push('Afternoon (12PM-5PM)');
//     if (data.timeSlots?.evening) slots.push('Evening (5PM-9PM)');
    
//     return days.map(day => slots.map(slot => `${day} ${slot}`)).flat();
//   };

//   const [activeSection, setActiveSection] = useState('profile');

//   if (loading) {
//     return <div className="loading-spinner">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   // Rest of your component remains the same...
//   return (
//        <div className="dashboard-container">
//       <div className="dashboard-sidebar">
//         <div className="sidebar-header">
//           <h3>My Dashboard</h3>
//           <div className="user-avatar">
//             {professionalData.name.split(' ').map(n => n[0]).join('')}
//           </div>
//           <p className="user-name">{professionalData.name}</p>
//           <p className="user-role">Licensed Professional</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           <button 
//             className={activeSection === 'profile' ? 'active' : ''}
//             onClick={() => setActiveSection('profile')}
//           >
//             <i className="fas fa-user"></i> My Profile
//           </button>
//           <button 
//             className={activeSection === 'availability' ? 'active' : ''}
//             onClick={() => setActiveSection('availability')}
//           >
//             <i className="fas fa-calendar-alt"></i> Availability
//           </button>
//           <button 
//             className={activeSection === 'communication' ? 'active' : ''}
//             onClick={() => setActiveSection('communication')}
//           >
//             <i className="fas fa-envelope"></i> Communication
//           </button>
//           <button 
//             className={activeSection === 'stats' ? 'active' : ''}
//             onClick={() => setActiveSection('stats')}
//           >
//             <i className="fas fa-chart-line"></i> Statistics
//           </button>
//         </nav>
//       </div>

//       <div className="dashboard-main">
//         {activeSection === 'profile' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-user"></i> My Professional Profile</h2>
//             <div className="info-card">
//               <div className="info-item">
//                 <label>Full Name</label>
//                 <p>{professionalData.name || 'Not provided'}</p>
//               </div>
//               <div className="info-item">
//                 <label>Phone Number</label>
//                 <p>{professionalData.phone || 'Not provided'}</p>
//               </div>
//               <div className="info-item">
//                 <label>Email Address</label>
//                 <p>{professionalData.email || 'Not provided'}</p>
//               </div>
//               <div className="action-buttons">
//                 <button className="btn-edit">
//                   <i className="fas fa-edit"></i> Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'availability' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-calendar-alt"></i> My Availability</h2>
//             <div className="info-card">
//               <h3>Scheduled Availability</h3>
//               {professionalData.availability.length > 0 ? (
//                 <ul className="availability-list">
//                   {professionalData.availability.map((slot, index) => (
//                     <li key={index}>
//                       <i className="fas fa-clock"></i> {slot}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="no-availability">No availability set yet</p>
//               )}
//               <div className="action-buttons">
//                 <button className="btn-edit">
//                   <i className="fas fa-edit"></i> Update Availability
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'communication' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-envelope"></i> Communication</h2>
//             <div className="action-card-container">
//               <div className="action-card">
//                 <i className="fas fa-inbox"></i>
//                 <h3>Inbox</h3>
//                 <p>View and respond to messages</p>
//                 <button className="btn-action">Open Inbox</button>
//               </div>
//               <div className="action-card">
//                 <i className="fas fa-paper-plane"></i>
//                 <h3>New Message</h3>
//                 <p>Send a message to a senior or colleague</p>
//                 <button className="btn-action">Compose</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'stats' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-chart-line"></i> My Statistics & Credentials</h2>
//             <div className="stats-container">
//               <div className="stat-card">
//                 <div className="stat-value">{professionalData.seniorsHelped}</div>
//                 <div className="stat-label">Seniors Helped</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-value">{professionalData.certifications.length}</div>
//                 <div className="stat-label">Certifications</div>
//               </div>
//             </div>
            
//             <div className="info-card">
//               <h3>My Certifications</h3>
//               {professionalData.certifications.length > 0 ? (
//                 <ul className="certification-list">
//                   {professionalData.certifications.map((cert, index) => (
//                     <li key={index}>
//                       <i className="fas fa-certificate"></i> {cert}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="no-certifications">No certifications added yet</p>
//               )}
//               <div className="action-buttons">
//                 <button className="btn-edit">
//                   <i className="fas fa-edit"></i> Update Credentials
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfessionalDashboard;





























// import React, { useState, useEffect } from 'react';
// import '../styles/dashboardStyles.css'; // We'll create this new CSS file

// const ProfessionalDashboard = () => {
//   // Load data from localStorage (set when form is submitted)
//   const [professionalData, setProfessionalData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     availability: [],
//     certifications: [],
//     seniorsHelped: 0
//   });

//   useEffect(() => {
//     // Load saved data when component mounts
//     const savedData = localStorage.getItem('caretakerData');
//     if (savedData) {
//       const parsedData = JSON.parse(savedData);
//       setProfessionalData({
//         name: `${parsedData.firstName} ${parsedData.lastName}`,
//         phone: parsedData.phoneNumber,
//         email: parsedData.email,
//         availability: getFormattedAvailability(parsedData),
//         certifications: parsedData.certifications || [],
//         seniorsHelped: Math.floor(Math.random() * 50) + 1 // Random for demo
//       });
//     }
//   }, []);

//   const getFormattedAvailability = (data) => {
//     const days = data.availableDays || [];
//     const slots = [];
//     if (data.timeSlots?.morning) slots.push('Morning (8AM-12PM)');
//     if (data.timeSlots?.afternoon) slots.push('Afternoon (12PM-5PM)');
//     if (data.timeSlots?.evening) slots.push('Evening (5PM-9PM)');
    
//     return days.map(day => slots.map(slot => `${day} ${slot}`)).flat();
//   };

//   const [activeSection, setActiveSection] = useState('profile');

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-sidebar">
//         <div className="sidebar-header">
//           <h3>My Dashboard</h3>
//           <div className="user-avatar">
//             {professionalData.name.split(' ').map(n => n[0]).join('')}
//           </div>
//           <p className="user-name">{professionalData.name}</p>
//           <p className="user-role">Licensed Professional</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           <button 
//             className={activeSection === 'profile' ? 'active' : ''}
//             onClick={() => setActiveSection('profile')}
//           >
//             <i className="fas fa-user"></i> My Profile
//           </button>
//           <button 
//             className={activeSection === 'availability' ? 'active' : ''}
//             onClick={() => setActiveSection('availability')}
//           >
//             <i className="fas fa-calendar-alt"></i> Availability
//           </button>
//           <button 
//             className={activeSection === 'communication' ? 'active' : ''}
//             onClick={() => setActiveSection('communication')}
//           >
//             <i className="fas fa-envelope"></i> Communication
//           </button>
//           <button 
//             className={activeSection === 'stats' ? 'active' : ''}
//             onClick={() => setActiveSection('stats')}
//           >
//             <i className="fas fa-chart-line"></i> Statistics
//           </button>
//         </nav>
//       </div>

//       <div className="dashboard-main">
//         {activeSection === 'profile' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-user"></i> My Professional Profile</h2>
//             <div className="info-card">
//               <div className="info-item">
//                 <label>Full Name</label>
//                 <p>{professionalData.name || 'Not provided'}</p>
//               </div>
//               <div className="info-item">
//                 <label>Phone Number</label>
//                 <p>{professionalData.phone || 'Not provided'}</p>
//               </div>
//               <div className="info-item">
//                 <label>Email Address</label>
//                 <p>{professionalData.email || 'Not provided'}</p>
//               </div>
//               <div className="action-buttons">
//                 <button className="btn-edit">
//                   <i className="fas fa-edit"></i> Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'availability' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-calendar-alt"></i> My Availability</h2>
//             <div className="info-card">
//               <h3>Scheduled Availability</h3>
//               {professionalData.availability.length > 0 ? (
//                 <ul className="availability-list">
//                   {professionalData.availability.map((slot, index) => (
//                     <li key={index}>
//                       <i className="fas fa-clock"></i> {slot}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="no-availability">No availability set yet</p>
//               )}
//               <div className="action-buttons">
//                 <button className="btn-edit">
//                   <i className="fas fa-edit"></i> Update Availability
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'communication' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-envelope"></i> Communication</h2>
//             <div className="action-card-container">
//               <div className="action-card">
//                 <i className="fas fa-inbox"></i>
//                 <h3>Inbox</h3>
//                 <p>View and respond to messages</p>
//                 <button className="btn-action">Open Inbox</button>
//               </div>
//               <div className="action-card">
//                 <i className="fas fa-paper-plane"></i>
//                 <h3>New Message</h3>
//                 <p>Send a message to a senior or colleague</p>
//                 <button className="btn-action">Compose</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'stats' && (
//           <div className="dashboard-section">
//             <h2><i className="fas fa-chart-line"></i> My Statistics & Credentials</h2>
//             <div className="stats-container">
//               <div className="stat-card">
//                 <div className="stat-value">{professionalData.seniorsHelped}</div>
//                 <div className="stat-label">Seniors Helped</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-value">{professionalData.certifications.length}</div>
//                 <div className="stat-label">Certifications</div>
//               </div>
//             </div>
            
//             <div className="info-card">
//               <h3>My Certifications</h3>
//               {professionalData.certifications.length > 0 ? (
//                 <ul className="certification-list">
//                   {professionalData.certifications.map((cert, index) => (
//                     <li key={index}>
//                       <i className="fas fa-certificate"></i> {cert}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="no-certifications">No certifications added yet</p>
//               )}
//               <div className="action-buttons">
//                 <button className="btn-edit">
//                   <i className="fas fa-edit"></i> Update Credentials
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfessionalDashboard;









































































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCaretaker } from '../services/api';
import '../styles/dashboardStyles.css';

const ProfessionalDashboard = () => {
  const [professionalData, setProfessionalData] = useState({
    name: '',
    phone: '',
    email: '',
    availability: [],
    certifications: [],
    seniorsHelped: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        // Get email from localStorage or auth context
        const email = localStorage.getItem('caretakerEmail');
        if (!email) {
          navigate('/caretaker-form');
          return;
        }
        // console.log("here", email)
        const response = await getCaretaker(email);
        console.log(response.data)
        const data = response.data;
        
        setProfessionalData({
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phoneNumber,
          email: data.email,
          availability: getFormattedAvailability(data),
          certifications: data.certifications || [],
          seniorsHelped: Math.floor(Math.random() * 50) + 1 // Random for demo
        });
      } catch (err) {
        console.error('Failed to fetch professional data:', err);
        setError('Failed to load professional data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionalData();
  }, [navigate]);

  const getFormattedAvailability = (data) => {
    const days = data.availableDays || [];
    const slots = [];
    if (data.timeSlots?.morning) slots.push('Morning (8AM-12PM)');
    if (data.timeSlots?.afternoon) slots.push('Afternoon (12PM-5PM)');
    if (data.timeSlots?.evening) slots.push('Evening (5PM-9PM)');
    
    return days.map(day => slots.map(slot => `${day} ${slot}`)).flat();
  };

  const [activeSection, setActiveSection] = useState('profile');

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Rest of your component remains the same...
  return (
       <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>My Dashboard</h3>
          <div className="user-avatar">
            {professionalData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <p className="user-name">{professionalData.name}</p>
          <p className="user-role">Licensed Professional</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={activeSection === 'profile' ? 'active' : ''}
            onClick={() => setActiveSection('profile')}
          >
            <i className="fas fa-user"></i> My Profile
          </button>
          <button 
            className={activeSection === 'availability' ? 'active' : ''}
            onClick={() => setActiveSection('availability')}
          >
            <i className="fas fa-calendar-alt"></i> Availability
          </button>
          <button 
            className={activeSection === 'communication' ? 'active' : ''}
            onClick={() => setActiveSection('communication')}
          >
            <i className="fas fa-envelope"></i> Communication
          </button>
          <button 
            className={activeSection === 'stats' ? 'active' : ''}
            onClick={() => setActiveSection('stats')}
          >
            <i className="fas fa-chart-line"></i> Statistics
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        {activeSection === 'profile' && (
          <div className="dashboard-section">
            <h2><i className="fas fa-user"></i> My Professional Profile</h2>
            <div className="info-card">
              <div className="info-item">
                <label>Full Name</label>
                <p>{professionalData.name || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <p>{professionalData.phone || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{professionalData.email || 'Not provided'}</p>
              </div>
              <div className="action-buttons">
                <button className="btn-edit">
                  <i className="fas fa-edit"></i> Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'availability' && (
          <div className="dashboard-section">
            <h2><i className="fas fa-calendar-alt"></i> My Availability</h2>
            <div className="info-card">
              <h3>Scheduled Availability</h3>
              {professionalData.availability.length > 0 ? (
                <ul className="availability-list">
                  {professionalData.availability.map((slot, index) => (
                    <li key={index}>
                      <i className="fas fa-clock"></i> {slot}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-availability">No availability set yet</p>
              )}
              <div className="action-buttons">
                <button className="btn-edit">
                  <i className="fas fa-edit"></i> Update Availability
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'communication' && (
          <div className="dashboard-section">
            <h2><i className="fas fa-envelope"></i> Communication</h2>
            <div className="action-card-container">
              <div className="action-card">
                <i className="fas fa-inbox"></i>
                <h3>Inbox</h3>
                <p>View and respond to messages</p>
                <button className="btn-action">Open Inbox</button>
              </div>
              <div className="action-card">
                <i className="fas fa-paper-plane"></i>
                <h3>New Message</h3>
                <p>Send a message to a senior or colleague</p>
                <button className="btn-action">Compose</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="dashboard-section">
            <h2><i className="fas fa-chart-line"></i> My Statistics & Credentials</h2>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-value">{professionalData.seniorsHelped}</div>
                <div className="stat-label">Seniors Helped</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{professionalData.certifications.length}</div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
            
            <div className="info-card">
              <h3>My Certifications</h3>
              {professionalData.certifications.length > 0 ? (
                <ul className="certification-list">
                  {professionalData.certifications.map((cert, index) => (
                    <li key={index}>
                      <i className="fas fa-certificate"></i> {cert}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-certifications">No certifications added yet</p>
              )}
              <div className="action-buttons">
                <button className="btn-edit">
                  <i className="fas fa-edit"></i> Update Credentials
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;