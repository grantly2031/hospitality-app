import React from 'react';
import Hero from '../components/Hero';
import '../styles/home.css';
import '../styles/global.css';
import aboutImage from '../styles/images/home1.jpg'; // Make sure to add this image!

const Home = () => (
  <>
    <Hero /> {/* Hero section without Header */}
    <section className="about-section">
      <div className="text-left">
        <h2>About HospitAlly</h2>
        <p>
          We help connect caregivers and those in need of care based on availability and skills.
          Our platform ensures that background checks and personalization are at the core of every connection.
        </p>
      </div>
      <div className="image-right">
        <img src={aboutImage} alt="About HospitAlly" />
      </div>
    </section>
  </>
);

export default Home;
