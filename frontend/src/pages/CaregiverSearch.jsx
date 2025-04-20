// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import '../styles/caregiverSearch.css';





// // const allCaregivers = [
// //   {
// //     id: 1,
// //     name: 'Sarah Johnson',
// //     photo: 'https://randomuser.me/api/portraits/women/44.jpg',
// //     gender: 'Female',
// //     experience: '5 years',
// //     availability: ['Monday', 'Wednesday', 'Friday'],
// //     certificates: ['First Aid', 'CPR', 'Nursing Certification'],
// //     rating: 4.8,
// //     reviews: 24,
// //     description: 'Compassionate caregiver with 5 years of experience working with elderly patients.',
// //   },
// //   {
// //     id: 2,
// //     name: 'Michael Chen',
// //     photo: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     gender: 'Male',
// //     experience: '3 years',
// //     availability: ['Tuesday', 'Thursday', 'Saturday'],
// //     certificates: ['First Aid', 'Personal Support Worker'],
// //     rating: 4.5,
// //     reviews: 15,
// //     description: 'Dedicated PSW with special training in dementia care.',
// //   },
// //   {
// //     id: 3,
// //     name: 'Emma Rodriguez',
// //     photo: 'https://randomuser.me/api/portraits/women/63.jpg',
// //     gender: 'Female',
// //     experience: '7 years',
// //     availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
// //     certificates: ['First Aid', 'CPR', 'Nursing Certification', 'Personal Support Worker'],
// //     rating: 4.9,
// //     reviews: 32,
// //     description: 'Registered nurse with extensive experience in home care and palliative care.',
// //   },
// //   {
// //     id: 4,
// //     name: 'David Wilson',
// //     photo: 'https://randomuser.me/api/portraits/men/75.jpg',
// //     gender: 'Male',
// //     experience: '2 years',
// //     availability: ['Weekends'],
// //     certificates: ['First Aid'],
// //     rating: 4.2,
// //     reviews: 8,
// //     description: 'Enthusiastic new caregiver with excellent references.',
// //   },
// // ];

// // const filterOptions = {
// //   availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
// //   certificates: ['First Aid', 'CPR', 'Nursing Certification', 'Personal Support Worker'],
// //   gender: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
// //   experience: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'],
// // };

// // const CaregiverSearch = () => {
// //   const navigate = useNavigate();
// //   const [filters, setFilters] = useState({
// //     availability: [],
// //     certificates: [],
// //     gender: '',
// //     experience: '',
// //   });
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [openFilter, setOpenFilter] = useState(null);
// //   const [filteredCaregivers, setFilteredCaregivers] = useState(allCaregivers);

// //   const toggleFilter = (filterName) => {
// //     setOpenFilter(openFilter === filterName ? null : filterName);
// //   };

// //   const handleCheckboxChange = (filterType, value) => {
// //     setFilters((prev) => {
// //       const currentValues = prev[filterType];
// //       const newValues = currentValues.includes(value)
// //         ? currentValues.filter((v) => v !== value)
// //         : [...currentValues, value];
// //       return { ...prev, [filterType]: newValues };
// //     });
// //   };

// //   const handleSingleSelectChange = (filterType, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [filterType]: prev[filterType] === value ? '' : value,
// //     }));
// //   };

// //   const handleSearch = () => {
// //     const results = allCaregivers.filter((caregiver) => {
// //       const matchesSearch = searchQuery.trim() === '' || 
// //         caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
// //         caregiver.description.toLowerCase().includes(searchQuery.toLowerCase());
      
// //       const matchesAvailability = filters.availability.length === 0 || 
// //         filters.availability.some((day) => caregiver.availability.includes(day));
      
// //       const matchesCertificates = filters.certificates.length === 0 || 
// //         filters.certificates.every((cert) => caregiver.certificates.includes(cert));
      
// //       const matchesGender = !filters.gender || caregiver.gender === filters.gender;
      
// //       let matchesExperience = true;
// //       if (filters.experience) {
// //         const expYears = parseInt(caregiver.experience);
// //         switch (filters.experience) {
// //           case 'Less than 1 year': matchesExperience = expYears < 1; break;
// //           case '1-3 years': matchesExperience = expYears >= 1 && expYears <= 3; break;
// //           case '3-5 years': matchesExperience = expYears >= 3 && expYears <= 5; break;
// //           case '5+ years': matchesExperience = expYears >= 5; break;
// //           default: matchesExperience = true;
// //         }
// //       }
      
// //       return matchesSearch && matchesAvailability && matchesCertificates && matchesGender && matchesExperience;
// //     });
    
// //     setFilteredCaregivers(results);
// //   };

// //   useEffect(() => {
// //     handleSearch();
// //   }, [filters, searchQuery]);

// //   const clearFilters = () => {
// //     setFilters({
// //       availability: [],
// //       certificates: [],
// //       gender: '',
// //       experience: '',
// //     });
// //     setSearchQuery('');
// //   };

// //   const handleCardClick = (caregiverId) => {
// //     navigate(`/caregivers/${caregiverId}`);
// //   };

// //   const renderStars = (rating) => {
// //     const stars = [];
// //     const fullStars = Math.floor(rating);
// //     const hasHalfStar = rating % 1 >= 0.5;
    
// //     for (let i = 1; i <= 5; i++) {
// //       if (i <= fullStars) {
// //         stars.push(<span key={i} className="star filled">★</span>);
// //       } else if (i === fullStars + 1 && hasHalfStar) {
// //         stars.push(<span key={i} className="star half-filled">★</span>);
// //       } else {
// //         stars.push(<span key={i} className="star">★</span>);
// //       }
// //     }
    
// //     return stars;
// //   };

// //   return (
// //     <div className="caregiver-search-container">
// //       <div className="search-header">
// //         <h1>Find Caregivers</h1>
// //         <div className="search-bar">
// //           <input 
// //             type="text" 
// //             placeholder="Search by name or keywords..." 
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //           <button className="search-button" onClick={handleSearch}>Search</button>
// //         </div>
// //       </div>

// //       <div className="search-content">
// //         <div className="filters-sidebar">
// //           <h3>Filters</h3>

// //           <div className={`filter-section ${openFilter === 'availability' ? 'open' : ''}`}>
// //             <button className="filter-header" onClick={() => toggleFilter('availability')}>
// //               Availability
// //               <span className="toggle-icon">{openFilter === 'availability' ? '−' : '+'}</span>
// //             </button>
// //             {openFilter === 'availability' && (
// //               <div className="filter-options">
// //                 {filterOptions.availability.map((day) => (
// //                   <label key={day} className="filter-option">
// //                     <input
// //                       type="checkbox"
// //                       checked={filters.availability.includes(day)}
// //                       onChange={() => handleCheckboxChange('availability', day)}
// //                     />
// //                     {day}
// //                   </label>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className={`filter-section ${openFilter === 'certificates' ? 'open' : ''}`}>
// //             <button className="filter-header" onClick={() => toggleFilter('certificates')}>
// //               Certificates
// //               <span className="toggle-icon">{openFilter === 'certificates' ? '−' : '+'}</span>
// //             </button>
// //             {openFilter === 'certificates' && (
// //               <div className="filter-options">
// //                 {filterOptions.certificates.map((cert) => (
// //                   <label key={cert} className="filter-option">
// //                     <input
// //                       type="checkbox"
// //                       checked={filters.certificates.includes(cert)}
// //                       onChange={() => handleCheckboxChange('certificates', cert)}
// //                     />
// //                     {cert}
// //                   </label>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className={`filter-section ${openFilter === 'gender' ? 'open' : ''}`}>
// //             <button className="filter-header" onClick={() => toggleFilter('gender')}>
// //               Gender
// //               <span className="toggle-icon">{openFilter === 'gender' ? '−' : '+'}</span>
// //             </button>
// //             {openFilter === 'gender' && (
// //               <div className="filter-options">
// //                 {filterOptions.gender.map((g) => (
// //                   <label key={g} className="filter-option">
// //                     <input
// //                       type="radio"
// //                       name="gender"
// //                       checked={filters.gender === g}
// //                       onChange={() => handleSingleSelectChange('gender', g)}
// //                     />
// //                     {g}
// //                   </label>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className={`filter-section ${openFilter === 'experience' ? 'open' : ''}`}>
// //             <button className="filter-header" onClick={() => toggleFilter('experience')}>
// //               Experience
// //               <span className="toggle-icon">{openFilter === 'experience' ? '−' : '+'}</span>
// //             </button>
// //             {openFilter === 'experience' && (
// //               <div className="filter-options">
// //                 {filterOptions.experience.map((e) => (
// //                   <label key={e} className="filter-option">
// //                     <input
// //                       type="radio"
// //                       name="experience"
// //                       checked={filters.experience === e}
// //                       onChange={() => handleSingleSelectChange('experience', e)}
// //                     />
// //                     {e}
// //                   </label>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>
// //         </div>

// //         <div className="caregiver-list">
// //           {filteredCaregivers.length > 0 ? (
// //             filteredCaregivers.map((cg) => (
// //               <div 
// //                 key={cg.id} 
// //                 className="caregiver-card"
// //                 onClick={() => handleCardClick(cg.id)}
// //               >
// //                 <img src={cg.photo} alt={cg.name} className="caregiver-photo" />
// //                 <div className="caregiver-info">
// //                   <h4>{cg.name}</h4>
// //                   <p><strong>Experience:</strong> {cg.experience}</p>
// //                   <p><strong>Certificates:</strong> {cg.certificates.join(', ')}</p>
// //                   <p><strong>Availability:</strong> {cg.availability.join(', ')}</p>
// //                   <div className="rating">
// //                     {renderStars(cg.rating)}
// //                     <span>({cg.reviews} reviews)</span>
// //                   </div>
// //                   <p className="description">{cg.description}</p>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="no-results">
// //               No caregivers match your search criteria. Try adjusting your filters.
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CaregiverSearch;




























































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCaregivers, getCaretakers } from '../services/api'; // Import your API function
// import '../styles/caregiverSearch.css';

// const filterOptions = {
//   availability: [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ],
//   certificates: [
//     'First Aid',
//     'CPR',
//     'Nursing Certification',
//     'Personal Support Worker',
//   ],
//   gender: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
//   experience: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'],
// };

// const CaregiverSearch = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     availability: [],
//     certificates: [],
//     gender: '',
//     experience: '',
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [openFilter, setOpenFilter] = useState(null);
//   const [filteredCaregivers, setFilteredCaregivers] = useState([]);
//   const [allCaregivers, setAllCaregivers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch caregivers data from backend on component mount
//   useEffect(() => {
//     const fetchCaregivers = async () => {
//       try {
//         setLoading(true);
//         const data = await getCaretakers()
//         console.log(data.data.data)
//         setAllCaregivers(data.data.data);
//         setFilteredCaregivers(data.data.data);
//       } catch (err) {
//         setError(err.message);
//         console.error('Failed to fetch caregivers:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaregivers();
//   }, []);

//   const toggleFilter = (filterName) => {
//     setOpenFilter(openFilter === filterName ? null : filterName);
//   };

//   const handleCheckboxChange = (filterType, value) => {
//     setFilters((prev) => {
//       const currentValues = prev[filterType];
//       const newValues = currentValues.includes(value)
//         ? currentValues.filter((v) => v !== value)
//         : [...currentValues, value];
//       return { ...prev, [filterType]: newValues };
//     });
//   };

//   const handleSingleSelectChange = (filterType, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterType]: prev[filterType] === value ? '' : value,
//     }));
//   };

//   const handleSearch = () => {
//     if (!allCaregivers.length) return;

//     const results = allCaregivers.filter((caregiver) => {
//       const matchesSearch =
//         searchQuery.trim() === '' ||
//         caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         caregiver.description.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesAvailability =
//         filters.availability.length === 0 ||
//         filters.availability.some((day) =>
//           caregiver.availability.includes(day)
//         );

//       const matchesCertificates =
//         filters.certificates.length === 0 ||
//         filters.certificates.every((cert) =>
//           caregiver.certificates.includes(cert)
//         );

//       const matchesGender =
//         !filters.gender || caregiver.gender === filters.gender;

//       let matchesExperience = true;
//       if (filters.experience) {
//         const expYears = parseInt(caregiver.experience);
//         switch (filters.experience) {
//           case 'Less than 1 year':
//             matchesExperience = expYears < 1;
//             break;
//           case '1-3 years':
//             matchesExperience = expYears >= 1 && expYears <= 3;
//             break;
//           case '3-5 years':
//             matchesExperience = expYears >= 3 && expYears <= 5;
//             break;
//           case '5+ years':
//             matchesExperience = expYears >= 5;
//             break;
//           default:
//             matchesExperience = true;
//         }
//       }

//       return (
//         matchesSearch &&
//         matchesAvailability &&
//         matchesCertificates &&
//         matchesGender &&
//         matchesExperience
//       );
//     });

//     setFilteredCaregivers(results);
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [filters, searchQuery, allCaregivers]);

//   const clearFilters = () => {
//     setFilters({
//       availability: [],
//       certificates: [],
//       gender: '',
//       experience: '',
//     });
//     setSearchQuery('');
//   };

//   const handleCardClick = (caregiverId) => {
//     navigate(`/caregivers/${caregiverId}`);
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(
//           <span key={i} className="star filled">
//             ★
//           </span>
//         );
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <span key={i} className="star half-filled">
//             ★
//           </span>
//         );
//       } else {
//         stars.push(
//           <span key={i} className="star">
//             ★
//           </span>
//         );
//       }
//     }

//     return stars;
//   };

//   if (loading) {
//     return (
//       <div className="caregiver-search-container loading">
//         Loading caregivers...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="caregiver-search-container error">Error: {error}</div>
//     );
//   }

//   return (
//     <div className="caregiver-search-container">
//       <div className="search-header">
//         <h1>Find Caregivers</h1>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by name or keywords..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="search-button" onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="search-content">
//         <div className="filters-sidebar">
//           <h3>Filters</h3>

//           <div
//             className={`filter-section ${
//               openFilter === 'availability' ? 'open' : ''
//             }`}
//           >
//             <button
//               className="filter-header"
//               onClick={() => toggleFilter('availability')}
//             >
//               Availability
//               <span className="toggle-icon">
//                 {openFilter === 'availability' ? '−' : '+'}
//               </span>
//             </button>
//             {openFilter === 'availability' && (
//               <div className="filter-options">
//                 {filterOptions.availability.map((day) => (
//                   <label key={day} className="filter-option">
//                     <input
//                       type="checkbox"
//                       checked={filters.availability.includes(day)}
//                       onChange={() => handleCheckboxChange('availability', day)}
//                     />
//                     {day}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className={`filter-section ${
//               openFilter === 'certificates' ? 'open' : ''
//             }`}
//           >
//             <button
//               className="filter-header"
//               onClick={() => toggleFilter('certificates')}
//             >
//               Certificates
//               <span className="toggle-icon">
//                 {openFilter === 'certificates' ? '−' : '+'}
//               </span>
//             </button>
//             {openFilter === 'certificates' && (
//               <div className="filter-options">
//                 {filterOptions.certificates.map((cert) => (
//                   <label key={cert} className="filter-option">
//                     <input
//                       type="checkbox"
//                       checked={filters.certificates.includes(cert)}
//                       onChange={() =>
//                         handleCheckboxChange('certificates', cert)
//                       }
//                     />
//                     {cert}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className={`filter-section ${
//               openFilter === 'gender' ? 'open' : ''
//             }`}
//           >
//             <button
//               className="filter-header"
//               onClick={() => toggleFilter('gender')}
//             >
//               Gender
//               <span className="toggle-icon">
//                 {openFilter === 'gender' ? '−' : '+'}
//               </span>
//             </button>
//             {openFilter === 'gender' && (
//               <div className="filter-options">
//                 {filterOptions.gender.map((g) => (
//                   <label key={g} className="filter-option">
//                     <input
//                       type="radio"
//                       name="gender"
//                       checked={filters.gender === g}
//                       onChange={() => handleSingleSelectChange('gender', g)}
//                     />
//                     {g}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className={`filter-section ${
//               openFilter === 'experience' ? 'open' : ''
//             }`}
//           >
//             <button
//               className="filter-header"
//               onClick={() => toggleFilter('experience')}
//             >
//               Experience
//               <span className="toggle-icon">
//                 {openFilter === 'experience' ? '−' : '+'}
//               </span>
//             </button>
//             {openFilter === 'experience' && (
//               <div className="filter-options">
//                 {filterOptions.experience.map((e) => (
//                   <label key={e} className="filter-option">
//                     <input
//                       type="radio"
//                       name="experience"
//                       checked={filters.experience === e}
//                       onChange={() => handleSingleSelectChange('experience', e)}
//                     />
//                     {e}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button className="clear-filters" onClick={clearFilters}>
//             Clear Filters
//           </button>
//         </div>

//         <div className="caregiver-list">
//           {filteredCaregivers.length > 0 ? (
//             filteredCaregivers.map((cg) => (
//               <div
//                 key={cg.id}
//                 className="caregiver-card"
//                 onClick={() => handleCardClick(cg.id)}
//               >
//                 <img
//                   src={
//                     cg.photo ||
//                     'https://randomuser.me/api/portraits/women/44.jpg'
//                   }
//                   alt={cg.name}
//                   className="caregiver-photo"
//                 />
//                 <div className="caregiver-info">
//                   <h4>{cg.name || 'No name provided'}</h4>
//                   <p>
//                     <strong>Experience:</strong>{' '}
//                     {cg.experience || 'Not specified'}
//                   </p>
//                   <p>
//                     <strong>Certificates:</strong>{' '}
//                     {(cg.certificates || []).join(', ') || 'None'}
//                   </p>
//                   <p>
//                     <strong>Availability:</strong>{' '}
//                     {(cg.availability || []).join(', ') || 'Not specified'}
//                   </p>
//                   <div className="rating">
//                     {renderStars(cg.rating || 0)}
//                     <span>({cg.reviews || 0} reviews)</span>
//                   </div>
//                   <p className="description">
//                     {cg.about || 'No description available'}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-results">
//               No caregivers match your search criteria. Try adjusting your
//               filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaregiverSearch;







































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCaretakers } from '../services/api';
import '../styles/caregiverSearch.css';

const filterOptions = {
  availableDays: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  certifications: [
    'First Aid',
    'CPR',
    'Geriatric Care',
    'Nursing',
    'Physiotherapy',
  ],
  gender: ['Male', 'Female', 'Other', 'Prefer not to say'],
  experience: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'],
  timeSlots: ['morning', 'afternoon', 'evening'],
};

const CaregiverSearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    availableDays: [],
    certifications: [],
    gender: '',
    experience: '',
    timeSlots: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [openFilter, setOpenFilter] = useState(null);
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const [allCaregivers, setAllCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        setLoading(true);
        const data = await getCaretakers();
        console.log(data)
        const normalizedData = data.data.map((cg) => ({
          ...cg,
          name: `${cg.firstName} ${cg.lastName}`,
          certifications: cg.certifications || [],
          availableDays: cg.availableDays || [],
          timeSlots: cg.timeSlots || {},
        }));
        
        setAllCaregivers(normalizedData);
        setFilteredCaregivers(normalizedData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch caregivers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const handleSingleSelectChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
    }));
  };

  const handleSearch = () => {
    if (!allCaregivers.length) return;

    const results = allCaregivers.filter((caregiver) => {
      // Search query matching
      const matchesSearch =
        searchQuery.trim() === '' ||
        caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caregiver.about.toLowerCase().includes(searchQuery.toLowerCase());


      // Availability matching
      const matchesAvailableDays =
        filters.availableDays.length === 0 ||
        filters.availableDays.some((day) =>
          caregiver.availableDays.includes(day)
        );


      // Certifications matching
      const matchesCertifications =
        filters.certifications.length === 0 ||
        filters.certifications.every((cert) =>
          caregiver.certifications.includes(cert)
        );

      // Gender matching
      const matchesGender =
        !filters.gender || caregiver.gender === filters.gender;

      // Time slots matching
      const matchesTimeSlots =
        filters.timeSlots.length === 0 ||
        filters.timeSlots.some((slot) => caregiver.timeSlots[slot]);

      // Experience matching (simplified)
      let matchesExperience = true;
      if (filters.experience) {
        const expText = caregiver.experience.toLowerCase();
        switch (filters.experience) {
          case 'Less than 1 year':
            matchesExperience =
              expText.includes('less than 1') || expText.includes('0 years');
            break;
          case '1-3 years':
            matchesExperience =
              expText.includes('1-3') ||
              expText.includes('2 years') ||
              expText.includes('3 years');
            break;
          case '3-5 years':
            matchesExperience =
              expText.includes('3-5') || expText.includes('4 years');
            break;
          case '5+ years':
            matchesExperience =
              expText.includes('5+') ||
              expText.includes('5 years') ||
              expText.includes('more than 5');
            break;
          default:
            matchesExperience = true;
        }
      }

      return (
        matchesSearch &&
        matchesAvailableDays &&
        matchesCertifications &&
        matchesGender &&
        matchesTimeSlots &&
        matchesExperience
      );
    });

    setFilteredCaregivers(results);
  };

  useEffect(() => {
    handleSearch();
  }, [filters, searchQuery, allCaregivers]);

  const clearFilters = () => {
    setFilters({
      availableDays: [],
      certifications: [],
      gender: '',
      experience: '',
      timeSlots: [],

    });
    setSearchQuery('');
  };

  const handleCardClick = (caregiverId) => {
    navigate(`/caregivers/${caregiverId}`);
  };



  const getActiveTimeSlots = (timeSlots) => {
    return Object.entries(timeSlots)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(', ');
  };

  if (loading) {
    return (
      <div className="caregiver-search-container loading">
        Loading caregivers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="caregiver-search-container error">Error: {error}</div>
    );
  }

  return (
    <div className="caregiver-search-container">
      <div className="search-header">
        <h1>Find Caregivers</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="search-content">
        <div className="filters-sidebar">
          <h3>Filters</h3>

          <div
            className={`filter-section ${
              openFilter === 'availableDays' ? 'open' : ''
            }`}
          >
            <button
              className="filter-header"
              onClick={() => toggleFilter('availableDays')}
            >
              Available Days
              <span className="toggle-icon">
                {openFilter === 'availableDays' ? '−' : '+'}
              </span>
            </button>
            {openFilter === 'availableDays' && (
              <div className="filter-options">
                {filterOptions.availableDays.map((day) => (
                  <label key={day} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.availableDays.includes(day)}
                      onChange={() =>
                        handleCheckboxChange('availableDays', day)
                      }
                    />
                    {day}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div
            className={`filter-section ${
              openFilter === 'certifications' ? 'open' : ''
            }`}
          >
            <button
              className="filter-header"
              onClick={() => toggleFilter('certifications')}
            >
              Certifications
              <span className="toggle-icon">
                {openFilter === 'certifications' ? '−' : '+'}
              </span>
            </button>
            {openFilter === 'certifications' && (
              <div className="filter-options">
                {filterOptions.certifications.map((cert) => (
                  <label key={cert} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.certifications.includes(cert)}
                      onChange={() =>
                        handleCheckboxChange('certifications', cert)
                      }
                    />
                    {cert}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div
            className={`filter-section ${
              openFilter === 'gender' ? 'open' : ''
            }`}
          >
            <button
              className="filter-header"
              onClick={() => toggleFilter('gender')}
            >
              Gender
              <span className="toggle-icon">
                {openFilter === 'gender' ? '−' : '+'}
              </span>
            </button>
            {openFilter === 'gender' && (
              <div className="filter-options">
                {filterOptions.gender.map((g) => (
                  <label key={g} className="filter-option">
                    <input
                      type="radio"
                      name="gender"
                      checked={filters.gender === g}
                      onChange={() => handleSingleSelectChange('gender', g)}
                    />
                    {g}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div
            className={`filter-section ${
              openFilter === 'experience' ? 'open' : ''
            }`}
          >
            <button
              className="filter-header"
              onClick={() => toggleFilter('experience')}
            >
              Experience
              <span className="toggle-icon">
                {openFilter === 'experience' ? '−' : '+'}
              </span>
            </button>
            {openFilter === 'experience' && (
              <div className="filter-options">
                {filterOptions.experience.map((e) => (
                  <label key={e} className="filter-option">
                    <input
                      type="radio"
                      name="experience"
                      checked={filters.experience === e}
                      onChange={() => handleSingleSelectChange('experience', e)}
                    />
                    {e}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div
            className={`filter-section ${
              openFilter === 'timeSlots' ? 'open' : ''
            }`}
          >
            <button
              className="filter-header"
              onClick={() => toggleFilter('timeSlots')}
            >
              Time Slots
              <span className="toggle-icon">
                {openFilter === 'timeSlots' ? '−' : '+'}
              </span>
            </button>
            {openFilter === 'timeSlots' && (
              <div className="filter-options">
                {filterOptions.timeSlots.map((slot) => (
                  <label key={slot} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.timeSlots.includes(slot)}
                      onChange={() => handleCheckboxChange('timeSlots', slot)}
                    />
                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="caregiver-list">
          {filteredCaregivers.length > 0 ? (
            filteredCaregivers.map((cg) => (
              <div
                key={cg._id}
                className="caregiver-card"
                onClick={() => handleCardClick(cg._id)}
              >
                <div className="caregiver-photo-placeholder">
                  <img
                    src={
                      cg.photo ||
                      'https://randomuser.me/api/portraits/women/44.jpg'
                    }
                    alt={cg.name}
                    className="caregiver-photo"
                  />
                  {/* {cg.firstName?.charAt(0)}
                  {cg.lastName?.charAt(0)} */}
                </div>
                <div className="caregiver-info">
                  <h4>
                    {cg.firstName} {cg.lastName}
                  </h4>
                  <p>
                    <strong>Experience:</strong>{' '}
                    {cg.experience || 'Not specified'}
                  </p>
                  <p>
                    <strong>Education:</strong>{' '}
                    {cg.education || 'Not specified'}
                  </p>
                  <p>
                    <strong>Certifications:</strong>{' '}
                    {(cg.certifications || []).join(', ') || 'None'}
                  </p>
                  <p>
                    <strong>Available Days:</strong>{' '}
                    {(cg.availableDays || []).join(', ') || 'Not specified'}
                  </p>
                  <p>
                    <strong>Available Times:</strong>{' '}
                    {getActiveTimeSlots(cg.timeSlots || {}) || 'Not specified'}
                  </p>

                  <p className="description">
                    <strong>Description:</strong>{' '}
                    {cg.about || 'No description available'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              No caregivers match your search criteria. Try adjusting your
              filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaregiverSearch;