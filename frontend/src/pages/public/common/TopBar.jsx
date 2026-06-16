import { useEffect, useState } from 'react';
import { Phone,User,Bell,ChevronDown,LogOut,FileText,CalendarDays } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/Public/top-bar.css';
import {isAuthenticated} from "../../../utils/tokenUtils";
import {getRole} from "../../../utils/roleUtils";

function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const authenticated = isAuthenticated();
  const role = getRole();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`topbar ${ isHomePage && !scrolled ? "topbar-home" : "topbar-scrolled"}`}>
      <div className="topbar">
        <div className="topbar-left">
          <Phone size={14} />
          <span>24/7 Ambulance Service : </span>
          <strong>040 4244 4244</strong>
        </div>

        <div className="topbar-right">
          <a href="/">Careers</a>
          <a href="/">Research</a>
          <a href="/">Conferences / Events</a>
          <a href="/">Contact Us</a>
          <a href="/">Blogs</a>
          <div className="divider"></div>
          {!authenticated ? (
            <Link to="/login" className="login-btn">
              <div className="user-profile-inner">
                <User size={10} />
                <span>Login</span>
              </div>
            </Link>
          ) : (
            <>
              <button className="notification-btn">
                <Bell size={16} />
                <span className="notification-badge">3</span>
              </button>

              <div className="profile-dropdown">
                <div className="profile-trigger">
                  <User size={15} />
                  <span>Hi, Rahul</span>
                  <ChevronDown size={14} />
                </div>

                <div className="profile-menu">
                  <Link to="/profile">
                    <User size={15} />
                    My Profile
                  </Link>

                  {role === "PATIENT" && (
                    <>
                      <Link to="/appointments">
                        <CalendarDays size={15} />
                        My Appointments
                      </Link>

                      <Link to="/medical-records">
                        <FileText size={15} />
                        Medical Records
                      </Link>
                    </>
                  )}

                  <Link to="/logout">
                    <LogOut size={15} />
                    Logout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;

