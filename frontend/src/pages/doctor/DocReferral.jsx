import React, { useState } from "react";
import { FileText } from "lucide-react";
import "../../styles/Doctor/Doctor-Referral.css"; 

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Duvvur Nageshwar Reddy", speciality: "Medical Gastroenterology", branch: "Gachibowli Branch", ctaType: "request" },
  { id: 2, name: "Dr. G V Rao", speciality: "Surgical Gastroenterology", branch: "Gachibowli Branch", ctaType: "request" },
  { id: 3, name: "Dr. P N Rao", speciality: "Hepatology", branch: "Gachibowli Branch", ctaType: "book" },
  { id: 4, name: "Dr. Balachandran Palat", speciality: "Liver Transplant & Heptobiliary Suregry", branch: "Gachibowli Branch", ctaType: "request" },
  { id: 5, name: "Dr. Vamshi Krishna", speciality: "Medical Oncology", branch: "Gachibowli Branch", ctaType: "request" },
  { id: 6, name: "Dr. D. Sridhar", speciality: "Surgical Oncology", branch: "Gachibowli Branch", ctaType: "request" },
  { id: 7, name: "Dr. Kausik Bhattacharya", speciality: "Radiation Oncology", branch: "Gachibowli Branch", ctaType: "request" },
  { id: 8, name: "Dr. Shaik Afshan Jabeen", speciality: "Neurology", branch: "Gachibowli Branch", ctaType: "book" },
  { id: 9, name: "Dr. Subodh Raju", speciality: "Neurosurgery", branch: "Gachibowli Branch", ctaType: "book" },
];

function DoctorCard({ doctor }) {
  const isBook = doctor.ctaType === "book";
  return (
    <div className="doc-card">
      <div className="doc-card-photo" />
      <div className="doc-card-info">
        <div className="doc-card-name">{doctor.name}</div>
        <div className="doc-card-speciality">{doctor.speciality}</div>
        <div className="doc-card-branch">📍 {doctor.branch}</div>
        <button type="button" className={`doc-card-cta ${isBook ? "filled" : "outline"}`}>
          📅 {isBook ? "Book Appointment" : "Request Appointment"}
        </button>
      </div>
    </div>
  );
}
export default function DocReferral () {
  const [location, setLocation] = useState("All Locations");
    const [speciality, setSpeciality] = useState("");
    const [search, setSearch] = useState("");
   
    return (
      <div className="dd-page">
        <div className="dd-filter-bar">
          <div className="dd-filter">
            <span className="dd-filter-icon">📍</span>
            <span className="dd-filter-value">{location}</span>
            <button
              type="button"
              className="dd-filter-clear"
              onClick={() => setLocation("All Locations")}
              aria-label="Clear location"
            >
              ✕
            </button>
            <span className="dd-filter-caret">⌄</span>
          </div>
   
          <div className="dd-divider" />
   
          <div className="dd-filter">
            <span className="dd-filter-icon">⚕️</span>
            <select
              className="dd-filter-select"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            >
              <option value="">Select Speciality</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="hepatology">Hepatology</option>
              <option value="oncology">Oncology</option>
              <option value="neurology">Neurology</option>
            </select>
          </div>
   
          <div className="dd-divider" />
   
          <div className="dd-filter grow">
            <span className="dd-filter-icon">👤</span>
            <input
              className="dd-filter-input"
              placeholder="Search Doctor"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
   
        <div className="dd-clear-row">
          <button type="button" className="dd-clear-all">✕ Clear all filters</button>
        </div>
   
        <div className="dd-grid">
          {MOCK_DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    );
  }
  
  