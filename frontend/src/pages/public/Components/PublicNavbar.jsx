import React from 'react'
import "../../../styles/Home/public-navbar.css"
const PublicNavbar = () => {
  return (
    <>
     <nav className="public-navbar">
      <div className="logo">
        <span className="logo-highlight">Medi</span>Care
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#departments">Departments</a></li>
        <li><a href="#doctors">Doctors</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-actions">
        <a href="/login" className="login-btn">
          Login
        </a>
      </div>
    </nav>
    </>
  );
}

export default PublicNavbar