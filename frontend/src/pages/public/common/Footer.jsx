import React from "react";
import "../../../styles/Public/footer.css";
import { TfiEmail } from "react-icons/tfi";
import { MdEmail } from "react-icons/md";

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
              <div>
                <p className="footer__logo-name">AMS Hospital</p>
                <p className="footer__logo-tag">Care • Compassion • Excellence</p>
              </div>
            </div>
            <p className="footer__brand-desc">
              Providing world-class healthcare services through advanced medical expertise, compassionate patient care, and clinical excellence.
            </p>

            {/* Contact Info */}
            <div className="footer__contacts">
              <div className="footer__contact-item">
                <span>📍</span>
                <span>1234 MediCore Blvd, Healthcare City, HC 10001</span>
              </div>
              <div className="footer__contact-item">
                <span>📞</span>
                <a href="tel:+18001234567">24×7 Emergency : +91 98765 43210</a>
              </div>
              <div className="footer__contact-item">
                <span  className="footer__contact-item_1"><MdEmail/></span>
                <a href="mailto:care@medicore.health">info@amshospital.com</a>
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
            © {new Date().getFullYear()} © 2026 AMS Hospital. All Rights Reserved.
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
