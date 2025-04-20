import React from 'react';
import '../styles/header.css';
import logo from '../styles/images/logo2.png';

const Header = () => (
  <header className="header">
    <img src={logo} alt="HospitAlly Logo" className="logo" />
    <h1 className="site-name">HospitAlly</h1>
  </header>
);

export default Header;
