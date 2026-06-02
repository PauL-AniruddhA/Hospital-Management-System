// import "./TopBar.css";
import { FiPhone, FiMapPin } from "react-icons/fi";

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <FiPhone />
        <span>24/7 Ambulance Service : 040 4244 4244</span>
      </div>

      <div className="topbar-right">
        <a href="/">Careers</a>
        <a href="/">Research</a>
        <a href="/">Conferences / Events</a>
        <a href="/">Contact Us</a>
        <a href="/">Blogs</a>

        <button className="location-btn">
          <FiMapPin />
          <span>All Locations</span>
        </button>
      </div>
    </div>
  );
}

export default TopBar;