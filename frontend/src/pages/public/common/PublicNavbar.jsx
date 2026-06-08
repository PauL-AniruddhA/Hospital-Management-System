import React from 'react'
import "../../../styles/Public/public-navbar.css"
import logo from "../../../assets/Logo-Animation/Colored-Logo.png";
import departments from '../../../mock/depertment';
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

          {/* ABOUT US section */}
          <li className="nav-dropdown">
            <span>About Us</span>
            <ChevronDown size={16} />
          </li>

          {/* SPECIALITIES section */}
          <li className="nav-dropdown">
            <span>Specialities</span>
            <ChevronDown size={16} />

            <div className="mega-menu">
              <div className="mega-menu-header">
                <span>SPECIALITIES</span>
              </div>

              <div className="mega-menu-grid">
                {departments.map((department) => (
                  <Link
                    key={department.id}
                    to={`/departments/${department.slug}`}
                    className="mega-menu-item"
                  >
                    <span className="menu-dot"></span>
                    {department.name}
                  </Link>
                ))}
              </div>

              <div className="mega-menu-footer">
                <button className="view-all-btn">
                  View All Specialities →
                </button>
              </div>
            </div>
          </li>
          
          {/* OTHERS Section */}
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