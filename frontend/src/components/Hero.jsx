import React from 'react';
import { Link } from 'react-router-dom';  
import '../styles/hero.css';
import heroImage from '../styles/images/hero1.jpg';  // Ensure the correct path

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background" style={{ backgroundImage: `url(${heroImage})` }}></div> {/* Set the hero image */}
      <div className="hero-center-text">
        <h1 className="hero-heading">Get custom care at your convenience</h1>
        <p className="hero-subheading">
          Effortlessly match with a caretaker or senior in need based on your availability.
        </p>
      </div>
      <div className="hero-bottom-section">
        <div className="hero-qualities">
          <ul>
            <li> Choose your Availability</li>
            <li> Background Checks</li>
            <li> Personalized Care</li>
          </ul>
        </div>
        <div className="hero-buttons">
          {/* Wrap the Join Now button with Link to navigate to /sign-up */}
          <Link to="/sign-up">
            <button className="join-now">Join Now →</button>
          </Link>


          <Link to='/login'>
          <button className="login">
            Login
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
