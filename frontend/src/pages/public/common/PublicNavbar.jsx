import React from 'react'
import "../../../styles/Public/public-navbar.css"
import logo from "../../../assets/Logo-Animation/Logo.png";
import { ChevronDown, CalendarDays} from 'lucide-react';
import { Link } from 'react-router-dom';
function PublicNavbar() {
  return (
<nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src={logo}
            alt="AIG Hospitals"
          />
        </div>

        <ul className="navbar-links">
          <li className="nav-dropdown">
            <span>About Us</span>
            <ChevronDown size={16} />
          </li>

          <li className="nav-dropdown">
            <span>Specialities</span>
            <ChevronDown size={16} />
          </li>

          <li className='nav-linked'><Link to ={'/findDoctor'}>Find A Doctor</Link></li>

          <li className='nav-linked'><Link to={'/healthPackages'}>Health Packages</Link></li>

          <li className='nav-linked'><Link to={'/internationalPatients'}>International Patients</Link></li>
        </ul>

        <button className="appointment-btn">
          <CalendarDays size={18} />
          Book Appointment
        </button>

      </div>
    </nav>
  );
}

export default PublicNavbar