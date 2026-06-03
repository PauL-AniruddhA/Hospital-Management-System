import React from "react";
// import "./Footer.css";

const FOOTER_LINKS = {
  Services: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Ophthalmology"],
  "Patient Portal": ["Book Appointment", "View Reports", "Billing", "Medical Records", "Pharmacy", "Insurance"],
  Hospital: ["About Us", "Our Doctors", "Careers", "News & Events", "Research", "CSR"],
};

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" rx="10" fill="rgba(255,255,255,0.15)"/>
                  <path d="M18 8v20M8 18h20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="footer__logo-name">MediCore</p>
                <p className="footer__logo-tag">Hospital Management System</p>
              </div>
            </div>
            <p className="footer__brand-desc">
              Delivering compassionate, technology-driven healthcare to communities
              across the globe. NABH & JCI Accredited.
            </p>

            {/* Contact Info */}
            <div className="footer__contacts">
              <div className="footer__contact-item">
                <span>📍</span>
                <span>1234 MediCore Blvd, Healthcare City, HC 10001</span>
              </div>
              <div className="footer__contact-item">
                <span>📞</span>
                <a href="tel:+18001234567">1-800-MEDICORE</a>
              </div>
              <div className="footer__contact-item">
                <span>✉️</span>
                <a href="mailto:care@medicore.health">care@medicore.health</a>
              </div>
            </div>

            {/* Social */}
            <div className="footer__social">
              {["𝕏", "in", "f", "▶"].map((s, i) => (
                <a key={i} href="#" className="footer__social-btn">{s}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="footer__link-group">
              <h4 className="footer__link-title">{group}</h4>
              <ul className="footer__links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Accreditation Badges */}
        <div className="footer__badges">
          {["NABH Accredited", "JCI Certified", "ISO 9001:2015", "HIPAA Compliant"].map((badge) => (
            <span key={badge} className="footer__badge">{badge}</span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} MediCore Hospital Management System. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
