import React ,{ useEffect, useState } from 'react'
import "../../../styles/Public/public-navbar.css"
import logo from "../../../assets/Logo-Animation/Colored-Logo.png";
import departments from '../../../mock/depertment';
import { ChevronDown, CalendarDays} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
function PublicNavbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`navbar ${ isHomePage && !scrolled ? "navbar-transparent": "navbar-solid" }`}>
      <div className="navbar-container">
        
        <div className="navbar-logo">
          <img
            src={logo}
            alt="AIG Hospitals"
          />
        </div>

        <ul className="navbar-links">

          {/* ABOUT US section */}
          <li className="nav-dropdown about-dropdown">
            <span>About Us</span>
            <ChevronDown size={16} />

            <div className="about-menu">
              
              <Link to="/about/overview" className="about-menu-item">
                <span className="about-arrow">→</span>
                <span>Overview</span>
              </Link>

              <Link to="/about/history" className="about-menu-item">
              <span className="about-arrow">→</span>
                History
              </Link>

              <Link to="/about/board-of-directors" className="about-menu-item">
                <span className="about-arrow">→</span>
                Board of Directors
              </Link>

              <Link to="/about/chairman-message" className="about-menu-item">
                <span className="about-arrow">→</span>
                Chairman's Message
              </Link>
            </div>
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
                      <span className="menu-text">
                        {department.name}
                      </span>

                      <span className="menu-arrow">
                        →
                      </span>
                  </Link>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link to={'/book-appointment'}>
                <button className="view-all-btn">
                  <span>View All Specialities →</span>
                </button>
                </Link>
              </div>
            </div>
          </li>
          
          {/* OTHERS Section */}
          <li className='nav-linked'><Link to ={'/findDoctor'}>Find A Doctor</Link></li>

          <li className='nav-linked'><Link to={'/health-packages'}>Health Packages</Link></li>

          <li className='nav-linked'><Link to={'/internationalPatients'}>International Patients</Link></li>
        </ul>
        
        {/* BOOK APPOINTMENT BUTTON */}
         <Link to={'/book-appointment'}>       
          <button className="appointment-btn">
            <CalendarDays size={18} />
            Book Appointment
          </button>
         </Link>
      </div>
    </nav>
  );
}

export default PublicNavbar