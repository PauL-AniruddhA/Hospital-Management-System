import React from 'react';
import "../../../styles/Public/home.css";

import Doctors_Team from "../../../assets/home-Images/Doctors_Team.png";
import PublicLayout from '../../../layouts/PublicLayout';
const HomePage = () => {
  return (
    <>
    <PublicLayout>

    {/* <section className="landing-section">

      <div className="landing-content">

        <span className="landing-badge">
          Trusted Healthcare Since 2005
        </span>

        <h1>
          Your Health,
          <br />
          Our Highest Priority
        </h1>

        <p>
          MediCare Hospital provides compassionate healthcare through
          experienced specialists, advanced medical technology,
          and patient-centered treatment.
        </p>

        <div className="trust-points">
          <span>✓ NABH Certified</span>
          <span>✓ 24/7 Emergency</span>
          <span>✓ 50+ Doctors</span>
          <span>✓ Modern Facilities</span>
        </div>

        <div className="landing-buttons">
          <button className="primary-btn">
            Book Appointment
          </button>

          <button className="secondary-btn">
            Explore Services
          </button>
        </div>

      </div>

      <div className="landing-image-container">

        <img src={Doctors_Team}alt="Doctors Team"className="landing-image"/>

        <div className="floating-card card-rating">
          ⭐ 4.9 Rating
        </div>

        <div className="floating-card card-emergency">
          🚑 24/7 Service
        </div>

        <div className="floating-card card-doctors">
          👨‍⚕️ 50+ Specialists
        </div>

      </div>

    </section> */}
    </PublicLayout>
    </>
  )
}

export default HomePage