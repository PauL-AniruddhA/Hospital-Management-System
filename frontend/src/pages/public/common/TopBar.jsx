import { useEffect, useState } from 'react';
import { Phone, User, ChevronDown, CircleUser } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/Public/top-bar.css';

function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
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
          <Link to="/login" className="login-btn">
            <div className="user-profile-inner">
              <User size={10} />
              <span>Login</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;

