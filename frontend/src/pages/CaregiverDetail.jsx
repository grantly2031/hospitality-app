// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaStar, FaRegStar, FaArrowLeft, FaComment, FaCalendarCheck, FaUser, FaBriefcase, FaDollarSign, FaCertificate, FaShieldAlt, FaUserPlus } from 'react-icons/fa';
// import ChatBox from '../components/chat/ChatBox';
// import '../styles/caregiverDetail.css';

// // Mock data - in a real app, this would come from an API
// const caregiverData = {
//   id: 1,
//   name: 'Sarah Johnson',
//   photo: 'https://randomuser.me/api/portraits/women/44.jpg',
//   gender: 'Female',
//   age: 32,
//   experience: '5 years',
//   specialties: ['Elderly Care', 'Dementia Care', 'Post-Surgery Care'],
//   availability: ['Monday', 'Wednesday', 'Friday'],
//   certificates: ['First Aid', 'CPR', 'Nursing Certification'],
//   rating: 4.8,
//   reviews: [
//     {
//       id: 1,
//       patient: 'Robert Smith',
//       rating: 5,
//       comment: 'Sarah was amazing with my mother. Very professional and caring.',
//       date: '2023-05-15'
//     },
//     {
//       id: 2,
//       patient: 'Emily Chen',
//       rating: 4,
//       comment: 'Good caregiver, very punctual and attentive.',
//       date: '2023-03-22'
//     }
//   ],
//   description: 'Compassionate caregiver with 5 years of experience working with elderly patients. Specialized in dementia care and post-surgery recovery. I believe in providing not just physical care but also emotional support to both patients and their families.',
//   hourlyRate: '$25/hr',
//   backgroundChecked: true,
//   languages: ['English', 'Spanish'],
//   education: 'Bachelor of Science in Nursing, University of Toronto',
// };

// const CaregiverDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [caregiver, setCaregiver] = useState(caregiverData);
//   const [activeTab, setActiveTab] = useState('profile');
//   const [showChat, setShowChat] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState({
//     date: '',
//     startTime: '09:00',
//     endTime: '17:00',
//     needs: [],
//     notes: ''
//   });
//   const [newReview, setNewReview] = useState({
//     rating: 5,
//     comment: ''
//   });
//   const [hasRated, setHasRated] = useState(false);
//   const [isAdded, setIsAdded] = useState(false);

//   // Check if caregiver is already added
//   useEffect(() => {
//     const caregivers = JSON.parse(localStorage.getItem('caregivers') || '[]');
//     setIsAdded(caregivers.some(c => c.id === caregiver.id));
    
//     // Check if user has already rated this caregiver
//     const ratedCaregivers = JSON.parse(localStorage.getItem('ratedCaregivers') || '{}');
//     setHasRated(!!ratedCaregivers[id]);
//   }, [id, caregiver.id]);

//   const handleAddToCaregivers = () => {
//     const caregiverToAdd = {
//       id: caregiver.id,
//       name: caregiver.name,
//       specialty: caregiver.specialties.join(', '),
//       lastMessage: null
//     };
    
//     const existingCaregivers = JSON.parse(localStorage.getItem('caregivers') || '[]');
    
//     // Check if already exists
//     if (!existingCaregivers.some(c => c.id === caregiverToAdd.id)) {
//       const updatedCaregivers = [...existingCaregivers, caregiverToAdd];
//       localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
//       setIsAdded(true);
//       alert(`${caregiver.name} has been added to your caregivers!`);
//     } else {
//       alert(`${caregiver.name} is already in your caregivers list.`);
//     }
//   };

//   const handleStartChat = () => {
//     // Add to caregivers if not already added
//     if (!isAdded) {
//       handleAddToCaregivers();
//     }
    
//     // Create a default message
//     const defaultMessage = {
//       text: `Hello ${caregiver.name}, I'd like to connect with you about care services.`,
//       timestamp: new Date().toISOString(),
//       sender: 'patient'
//     };
    
//     // Update the caregiver's last message
//     const caregivers = JSON.parse(localStorage.getItem('caregivers') || '[]');
//     const updatedCaregivers = caregivers.map(c => 
//       c.id === caregiver.id 
//         ? { ...c, lastMessage: defaultMessage } 
//         : c
//     );
    
//     localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
    
//     // Open the chat
//     setShowChat(true);
//   };

//   const handleBookCaregiver = () => {
//     // In a real app, this would send a booking request to your backend
//     const booking = {
//       caregiverId: caregiver.id,
//       caregiverName: caregiver.name,
//       ...bookingDetails,
//       status: 'pending'
//     };
    
//     // Save to local storage (mock implementation)
//     const existingBookings = JSON.parse(localStorage.getItem('caregiverBookings') || '[]');
//     localStorage.setItem('caregiverBookings', JSON.stringify([...existingBookings, booking]));
    
//     alert(`Booking request sent to ${caregiver.name}! They will respond soon.`);
//     navigate('/patient-dashboard');
//   };

//   const handleAddReview = () => {
//     if (!newReview.comment) {
//       alert('Please add a comment to your review');
//       return;
//     }
    
//     const review = {
//       id: Date.now(),
//       patient: 'You', // In a real app, this would be the patient's name
//       rating: newReview.rating,
//       comment: newReview.comment,
//       date: new Date().toISOString().split('T')[0]
//     };
    
//     // Update caregiver data (in a real app, this would be an API call)
//     setCaregiver(prev => ({
//       ...prev,
//       reviews: [...prev.reviews, review],
//       rating: calculateNewRating([...prev.reviews, review])
//     }));
    
//     // Mark this caregiver as rated by the user
//     const ratedCaregivers = JSON.parse(localStorage.getItem('ratedCaregivers') || '{}');
//     ratedCaregivers[id] = true;
//     localStorage.setItem('ratedCaregivers', JSON.stringify(ratedCaregivers));
    
//     setNewReview({ rating: 5, comment: '' });
//     setHasRated(true);
//     alert('Thank you for your review!');
//   };

//   const calculateNewRating = (reviews) => {
//     const sum = reviews.reduce((total, review) => total + review.rating, 0);
//     return (sum / reviews.length).toFixed(1);
//   };

//   const handleNeedToggle = (need) => {
//     setBookingDetails(prev => {
//       const needs = prev.needs.includes(need)
//         ? prev.needs.filter(n => n !== need)
//         : [...prev.needs, need];
//       return { ...prev, needs };
//     });
//   };

//   const renderStars = (rating) => {
//     return Array(5).fill().map((_, i) => (
//       i < Math.floor(rating) ? 
//         <FaStar key={i} className="star filled" /> : 
//         (i < rating ? <FaStar key={i} className="star half-filled" /> : <FaRegStar key={i} className="star" />)
//     ));
//   };

//   return (
//     <div className="caregiver-detail-container">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         <FaArrowLeft /> Back to Search
//       </button>

//       <div className="caregiver-header">
//         <div className="caregiver-photo-container">
//           <img src={caregiver.photo} alt={caregiver.name} className="caregiver-photo" />
//           <div className="rating-badge">
//             <FaStar className="star-icon" /> {caregiver.rating} ({caregiver.reviews.length} reviews)
//           </div>
//         </div>
        
//         <div className="caregiver-info">
//           <h1>{caregiver.name}</h1>
//           <div className="caregiver-meta">
//             <span><FaUser /> {caregiver.gender}, {caregiver.age}</span>
//             <span><FaBriefcase /> {caregiver.experience} experience</span>
//             <span><FaDollarSign /> {caregiver.hourlyRate}</span>
//           </div>
          
//           <div className="caregiver-specialties">
//             {caregiver.specialties.map((spec, index) => (
//               <span key={index} className="specialty-tag">{spec}</span>
//             ))}
//           </div>
          
//           <div className="caregiver-actions">
//             <button className="btn-primary" onClick={handleStartChat}>
//               <FaComment /> Message
//             </button>
//             <button 
//               className={`btn-secondary ${isAdded ? 'added' : ''}`} 
//               onClick={isAdded ? null : handleAddToCaregivers}
//               disabled={isAdded}
//             >
//               {isAdded ? (
//                 'Added to Caregivers'
//               ) : (
//                 <>
//                   <FaUserPlus /> Add to My Caregivers
//                 </>
//               )}
//             </button>
//             <button className="btn-secondary" onClick={() => setActiveTab('book')}>
//               <FaCalendarCheck /> Book Now
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="caregiver-tabs">
//         <button 
//           className={activeTab === 'profile' ? 'active' : ''}
//           onClick={() => setActiveTab('profile')}
//         >
//           Profile
//         </button>
//         <button 
//           className={activeTab === 'reviews' ? 'active' : ''}
//           onClick={() => setActiveTab('reviews')}
//         >
//           Reviews ({caregiver.reviews.length})
//         </button>
//         <button 
//           className={activeTab === 'book' ? 'active' : ''}
//           onClick={() => setActiveTab('book')}
//         >
//           Book Appointment
//         </button>
//       </div>

//       <div className="caregiver-content">
//         {activeTab === 'profile' && (
//           <div className="profile-section">
//             <div className="profile-column">
//               <h3>About Me</h3>
//               <p>{caregiver.description}</p>
              
//               <h3>Education</h3>
//               <p>{caregiver.education}</p>
              
//               <h3>Languages</h3>
//               <div className="languages-list">
//                 {caregiver.languages.map((lang, index) => (
//                   <span key={index} className="language-tag">{lang}</span>
//                 ))}
//               </div>
//             </div>
            
//             <div className="profile-column">
//               <h3>Availability</h3>
//               <div className="availability-days">
//                 {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
//                   <div 
//                     key={day} 
//                     className={`day ${caregiver.availability.includes(day) ? 'available' : 'unavailable'}`}
//                   >
//                     {day.substring(0, 3)}
//                   </div>
//                 ))}
//               </div>
              
//               <h3>Certifications</h3>
//               <ul className="certifications-list">
//                 {caregiver.certificates.map((cert, index) => (
//                   <li key={index}>
//                     <FaCertificate className="cert-icon" /> {cert}
//                   </li>
//                 ))}
//               </ul>
              
//               <div className={`background-check ${caregiver.backgroundChecked ? 'verified' : 'unverified'}`}>
//                 <FaShieldAlt /> 
//                 {caregiver.backgroundChecked 
//                   ? ' Background checked and verified' 
//                   : ' Background check not available'}
//               </div>
//             </div>
//           </div>
//         )}
        
//         {activeTab === 'reviews' && (
//           <div className="reviews-section">
//             {caregiver.reviews.map(review => (
//               <div key={review.id} className="review-card">
//                 <div className="review-header">
//                   <div className="reviewer">{review.patient}</div>
//                   <div className="review-rating">
//                     {renderStars(review.rating)}
//                   </div>
//                   <div className="review-date">{review.date}</div>
//                 </div>
//                 <p className="review-comment">{review.comment}</p>
//               </div>
//             ))}
            
//             {!hasRated ? (
//               <div className="add-review">
//                 <h3>Add Your Review</h3>
//                 <div className="rating-input">
//                   <label>Your Rating:</label>
//                   <div className="stars">
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <span 
//                         key={star} 
//                         className={star <= newReview.rating ? 'selected' : ''}
//                         onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
//                       >
//                         {star <= newReview.rating ? <FaStar /> : <FaRegStar />}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <textarea
//                   placeholder="Share your experience with this caregiver..."
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
//                 />
//                 <button className="btn-primary" onClick={handleAddReview}>
//                   Submit Review
//                 </button>
//               </div>
//             ) : (
//               <div className="already-rated">
//                 <h3>Thank You for Your Feedback!</h3>
//                 <p>You've already submitted a review for this caregiver.</p>
//               </div>
//             )}
//           </div>
//         )}
        
//         {activeTab === 'book' && (
//           <div className="booking-section">
//             <h3>Book {caregiver.name}</h3>
            
//             <div className="booking-form">
//               <div className="form-group">
//                 <label>Date</label>
//                 <input 
//                   type="date" 
//                   value={bookingDetails.date}
//                   onChange={(e) => setBookingDetails(prev => ({ ...prev, date: e.target.value }))}
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//               </div>
              
//               <div className="form-group time-group">
//                 <div>
//                   <label>Start Time</label>
//                   <select 
//                     value={bookingDetails.startTime}
//                     onChange={(e) => setBookingDetails(prev => ({ ...prev, startTime: e.target.value }))}
//                   >
//                     {Array.from({ length: 10 }, (_, i) => {
//                       const hour = 8 + i;
//                       return (
//                         <option key={hour} value={`${hour}:00`}>
//                           {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
                
//                 <div>
//                   <label>End Time</label>
//                   <select 
//                     value={bookingDetails.endTime}
//                     onChange={(e) => setBookingDetails(prev => ({ ...prev, endTime: e.target.value }))}
//                   >
//                     {Array.from({ length: 10 }, (_, i) => {
//                       const hour = 9 + i;
//                       return (
//                         <option key={hour} value={`${hour}:00`}>
//                           {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Care Needs</label>
//                 <div className="needs-checkboxes">
//                   {[
//                     'Personal Care', 
//                     'Medical Support', 
//                     'Mobility Support',
//                     'Meal Preparation',
//                     'Housekeeping',
//                     'Companionship'
//                   ].map(need => (
//                     <label key={need} className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         checked={bookingDetails.needs.includes(need)}
//                         onChange={() => handleNeedToggle(need)}
//                       />
//                       <span className="checkmark"></span>
//                       {need}
//                     </label>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Additional Notes</label>
//                 <textarea
//                   placeholder="Any special instructions or details..."
//                   value={bookingDetails.notes}
//                   onChange={(e) => setBookingDetails(prev => ({ ...prev, notes: e.target.value }))}
//                 />
//               </div>
              
//               <button 
//                 className="btn-primary"
//                 onClick={handleBookCaregiver}
//                 disabled={!bookingDetails.date}
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {showChat && (
//         <ChatBox
//           currentUser={{ id: 'patient1', name: 'You' }} // In a real app, use actual patient data
//           otherUser={{ id: caregiver.id, name: caregiver.name }}
//           onClose={() => setShowChat(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default CaregiverDetail;




























import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaRegStar,
  FaArrowLeft,
  FaComment,
  FaCalendarCheck,
  FaUser,
  FaBriefcase,
  FaDollarSign,
  FaCertificate,
  FaShieldAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { addCaregiver, getCaregiverById } from "../services/api.js"; // Import your API function
// import ChatBox from '../components/chat/ChatBox';
import '../styles/caregiverDetail.css';
import MessageDialog from '../components/MessageDialogue.jsx';

const CaregiverDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [showChat, setShowChat] = useState(false);

  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    needs: [],
    notes: '',
  });
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [hasRated, setHasRated] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  // const [loading, setloading] = useState(false);
  const [message, setMessage] = useState('');
  const patientEmail = localStorage.getItem('patientEmail');
  // const caregiverEmail = localStorage.getItem('caregiverEmail');

  // Fetch caregiver data from backend
  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        setLoading(true);
        const response = await getCaregiverById(id);
        // console.log(response.data.languages);

        // Map API response to match frontend structure
        const mappedCaregiver = {
          id: response.data._id,
          email: response.data.email,
          name: `${response.data.firstName} ${response.data.lastName}`,
          photo: 'https://randomuser.me/api/portraits/women/44.jpg',
          gender: response.data.gender,
          age: calculateAge(response.data.dob),
          experience: response.data.experience,
          specialties: response.data.fieldOfStudy,
          availability: response.data.availableDays,
          certificates: response.data.certifications,
          rating: 4.5, // Static value since not in API
          reviews: [
            {
              id: 1,
              patient: 'Robert Smith',
              rating: 5,
              comment: 'Great caregiver, very professional and caring.',
              date: '2023-05-15',
            },
            {
              id: 2,
              patient: 'Emily Chen',
              rating: 4,
              comment: 'Good caregiver, very punctual and attentive.',
              date: '2023-03-22',
            },
          ], // Static reviews since not in API
          description: response.data.about,
          hourlyRate: '$25/hr', // Static value since not in API
          backgroundChecked: true, // Static value since not in API
          languages: response.data.languages,
          education: response.data.education,
          timeSlots: response.data.timeSlots,
        };

        setCaregiver(mappedCaregiver);
        // console.log('mappedCaregiver', mappedCaregiver);

        // Check if caregiver is already added
        const caregivers = JSON.parse(
          localStorage.getItem('caregivers') || '[]'
        );
        setIsAdded(caregivers.some((c) => c.id === mappedCaregiver.id));

        // Check if user has already rated this caregiver
        const ratedCaregivers = JSON.parse(
          localStorage.getItem('ratedCaregivers') || '{}'
        );
        setHasRated(!!ratedCaregivers[mappedCaregiver.id]);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch caregiver:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [id]);

  // Helper function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };



  const handleAddToCaregivers = async () => {
    // console.log("inside add to caregivers");
    if (!patientEmail) {
      setMessage('Patient email not found');
      return;
    }

    setLoading(true);
    // setMessage('');

    try {
      await addCaregiver(patientEmail, caregiver.email);
      setMessage('Caregiver added successfully!');
      alert(
        `${caregiver.name} has been added to your caregivers!`
      );
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add caregiver');
    } finally {
      console.log("test")
      setLoading(false);
    }
  };




  // const handleAddToCaregivers = () => {
  //   const caregiverToAdd = {
  //     id: caregiver.id,
  //     name: caregiver.name,
  //     specialty: caregiver.specialties.join(', '),
  //     lastMessage: null,
  //   };

  //   const existingCaregivers = JSON.parse(
  //     localStorage.getItem('caregivers') || '[]'
  //   );

  //   // Check if already exists
  //   if (!existingCaregivers.some((c) => c.id === caregiverToAdd.id)) {
  //     const updatedCaregivers = [...existingCaregivers, caregiverToAdd];
  //     localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
  //     setIsAdded(true);
  //     alert(`${caregiver.name} has been added to your caregivers!`);
  //   } else {
  //     alert(`${caregiver.name} is already in your caregivers list.`);
  //   }
  // };

  const handleStartChat = () => {
    // Add to caregivers if not already added
    if (!isAdded) {
      handleAddToCaregivers();
    }
    
    // console.log("here");
    // Create a default message
    const defaultMessage = {
      text: `Hello ${caregiver.name}, I'd like to connect with you about care services.`,
      timestamp: new Date().toISOString(),
      sender: 'patient',
    };
    

    // Update the caregiver's last message
    const caregivers = JSON.parse(localStorage.getItem('caregivers') || '[]');
    // console.log('caregivers', caregivers);
    const updatedCaregivers = caregivers.map((c) =>
      c.id === caregiver.id ? { ...c, lastMessage: defaultMessage } : c
    );

    localStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
    // console.log("hereee")

    // Open the chat
    setShowChat(true);
  };

  const handleBookCaregiver = () => {
    // In a real app, this would send a booking request to your backend
    const booking = {
      caregiverId: caregiver.id,
      caregiverName: caregiver.name,
      ...bookingDetails,
      status: 'pending',
    };

    // Save to local storage (mock implementation)
    const existingBookings = JSON.parse(
      localStorage.getItem('caregiverBookings') || '[]'
    );
    localStorage.setItem(
      'caregiverBookings',
      JSON.stringify([...existingBookings, booking])
    );

    alert(`Booking request sent to ${caregiver.name}! They will respond soon.`);
    navigate('/patient-dashboard');
  };

    const handleAddReview = () => {
      if (!newReview.comment) {
        alert('Please add a comment to your review');
        return;
      }

      const review = {
        id: Date.now(),
        patient: 'You', // In a real app, this would be the patient's name
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };

      // Update caregiver data (in a real app, this would be an API call)
      setCaregiver(prev => ({
        ...prev,
        reviews: [...prev.reviews, review],
        rating: calculateNewRating([...prev.reviews, review])
      }));

      // Mark this caregiver as rated by the user
      const ratedCaregivers = JSON.parse(localStorage.getItem('ratedCaregivers') || '{}');
      ratedCaregivers[id] = true;
      localStorage.setItem('ratedCaregivers', JSON.stringify(ratedCaregivers));

      setNewReview({ rating: 5, comment: '' });
      setHasRated(true);
      alert('Thank you for your review!');
    };

    const calculateNewRating = (reviews) => {
      const sum = reviews.reduce((total, review) => total + review.rating, 0);
      return (sum / reviews.length).toFixed(1);
    };

    const handleNeedToggle = (need) => {
      setBookingDetails(prev => {
        const needs = prev.needs.includes(need)
          ? prev.needs.filter(n => n !== need)
          : [...prev.needs, need];
        return { ...prev, needs };
      });
    };

    const renderStars = (rating) => {
      return Array(5).fill().map((_, i) => (
        i < Math.floor(rating) ?
          <FaStar key={i} className="star filled" /> :
          (i < rating ? <FaStar key={i} className="star half-filled" /> : <FaRegStar key={i} className="star" />)
      ));
    };
    

  if (loading) {
    return (
      <div className="caregiver-detail-container loading">
        Loading caregiver details...
      </div>
    );
  }



  if (error) {
    return (
      <div className="caregiver-detail-container error">Error: {error}</div>
    );
  }

  if (!caregiver) {
    return (
      <div className="caregiver-detail-container">Caregiver not found</div>
    );
  }

  // Render method remains exactly the same as your original
  return (
    <div className="caregiver-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Search
      </button>

      <div className="caregiver-header">
        <div className="caregiver-photo-container">
          <img
            src={caregiver.photo}
            alt={caregiver.name}
            className="caregiver-photo"
          />
          <div className="rating-badge">
            <FaStar className="star-icon" /> {caregiver.rating} (
            {caregiver.reviews.length} reviews)
          </div>
        </div>

        <div className="caregiver-info">
          <h1>{caregiver.name}</h1>
          <div className="caregiver-meta">
            <span>
              <FaUser /> {caregiver.gender}, {caregiver.age}
            </span>
            <span>
              <FaBriefcase /> {caregiver.experience} experience
            </span>
            <span>
              <FaDollarSign /> {caregiver.hourlyRate}
            </span>
          </div>

          <div className="caregiver-specialties">
            {caregiver.specialties.map((spec, index) => (
              <span key={index} className="specialty-tag">
                {spec}
              </span>
            ))}
          </div>

          <div className="caregiver-actions">
            <button className="btn-primary" onClick={handleStartChat}>
              <FaComment /> Message
            </button>
            <button
              className={`btn-secondary ${isAdded ? 'added' : ''}`}
              onClick={isAdded ? null : handleAddToCaregivers}
              disabled={isAdded}
            >
              {isAdded ? (
                'Added to Caregivers'
              ) : (
                <>
                  <FaUserPlus /> Add to My Caregivers
                </>
              )}
            </button>
            <button
              className="btn-secondary"
              onClick={() => setActiveTab('book')}
            >
              <FaCalendarCheck /> Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="caregiver-tabs">
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({caregiver.reviews.length})
        </button>
        <button
          className={activeTab === 'book' ? 'active' : ''}
          onClick={() => setActiveTab('book')}
        >
          Book Appointment
        </button>
      </div>

      <div className="caregiver-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-column">
              <h3>About Me</h3>
              <p>{caregiver.description}</p>

              <h3>Education</h3>
              <p>{caregiver.education}</p>

              <h3>Languages</h3>
              <div className="languages-list">
                {caregiver.languages.map((lang, index) => (
                  <span key={index} className="language-tag">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-column">
              <h3>Availability</h3>
              <div className="availability-days">
                {[
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ].map((day) => (
                  <div
                    key={day}
                    className={`day ${
                      caregiver.availability.includes(day)
                        ? 'available'
                        : 'unavailable'
                    }`}
                  >
                    {day.substring(0, 3)}
                  </div>
                ))}
              </div>

              <h3>Certifications</h3>
              <ul className="certifications-list">
                {caregiver.certificates.map((cert, index) => (
                  <li key={index}>
                    <FaCertificate className="cert-icon" /> {cert}
                  </li>
                ))}
              </ul>

              <div
                className={`background-check ${
                  caregiver.backgroundChecked ? 'verified' : 'unverified'
                }`}
              >
                <FaShieldAlt />
                {caregiver.backgroundChecked
                  ? ' Background checked and verified'
                  : ' Background check not available'}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-section">
            {caregiver.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer">{review.patient}</div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <div className="review-date">{review.date}</div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}

            {!hasRated ? (
              <div className="add-review">
                <h3>Add Your Review</h3>
                <div className="rating-input">
                  <label>Your Rating:</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= newReview.rating ? 'selected' : ''}
                        onClick={() =>
                          setNewReview((prev) => ({ ...prev, rating: star }))
                        }
                      >
                        {star <= newReview.rating ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Share your experience with this caregiver..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                />
                <button className="btn-primary" onClick={handleAddReview}>
                  Submit Review
                </button>
              </div>
            ) : (
              <div className="already-rated">
                <h3>Thank You for Your Feedback!</h3>
                <p>You've already submitted a review for this caregiver.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'book' && (
          <div className="booking-section">
            <h3>Book {caregiver.name}</h3>

            <div className="booking-form">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) =>
                    setBookingDetails((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group time-group">
                <div>
                  <label>Start Time</label>
                  <select
                    value={bookingDetails.startTime}
                    onChange={(e) =>
                      setBookingDetails((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      const hour = 8 + i;
                      return (
                        <option key={hour} value={`${hour}:00`}>
                          {hour > 12 ? hour - 12 : hour}:00{' '}
                          {hour >= 12 ? 'PM' : 'AM'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label>End Time</label>
                  <select
                    value={bookingDetails.endTime}
                    onChange={(e) =>
                      setBookingDetails((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      const hour = 9 + i;
                      return (
                        <option key={hour} value={`${hour}:00`}>
                          {hour > 12 ? hour - 12 : hour}:00{' '}
                          {hour >= 12 ? 'PM' : 'AM'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Care Needs</label>
                <div className="needs-checkboxes">
                  {[
                    'Personal Care',
                    'Medical Support',
                    'Mobility Support',
                    'Meal Preparation',
                    'Housekeeping',
                    'Companionship',
                  ].map((need) => (
                    <label key={need} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={bookingDetails.needs.includes(need)}
                        onChange={() => handleNeedToggle(need)}
                      />
                      <span className="checkmark"></span>
                      {need}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  placeholder="Any special instructions or details..."
                  value={bookingDetails.notes}
                  onChange={(e) =>
                    setBookingDetails((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>

              <button
                className="btn-primary"
                onClick={handleBookCaregiver}
                disabled={!bookingDetails.date}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <button onClick={() => setShowChat(true)}>Message</button> */}

      {showChat && (
        <MessageDialog
          caregiverEmail={caregiver.email}
          onClose={() => setShowChat(false)}
        />

        // {showChat && (
        //   <MessageDialog
        //     patientId={"52435k45j43"}
        //     caregiverId={caregiver._id}
        //     onClose={() => setShowChat(false)}
        //   />
      )}
    </div>
  );
};

export default CaregiverDetail;