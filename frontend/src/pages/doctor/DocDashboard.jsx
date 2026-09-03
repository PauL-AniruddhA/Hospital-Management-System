import React, { useState } from "react";
import { 
  Users, CalendarDays, AlertTriangle, ClipboardList, ChevronRight, PlayCircle, MoreVertical, FlaskConical, Pill, UserPlus, CheckCircle2, ClipboardCheck, Star, Timer 
} from "lucide-react";
import doc from "../../assets/home/doc3.png";
import "../../styles/Doctor/Doctor-Dashboard.css";


const MOCK_DOCTORS = [
  { id: 1, name: "Tanvir Rayhan", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: 2, name: "Akib Rahman", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=13" },
  { id: 3, name: "Dr. Binti Biswas", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=32" },
  { id: 4, name: "Shanto Shah", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=14" },
  { id: 5, name: "Binti Biswas", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=33" },
  { id: 6, name: "Zerin Taslim", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=34" },
  { id: 7, name: "Rifat Rahman", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=15" },
  { id: 8, name: "Monir Hossain", specialty: "Nephrology Specialist", avatar: "https://i.pravatar.cc/80?img=16" },
];
const MOCK_SELECTED_DOCTOR = {
  id: 3,
  name: "Dr. Binti Biswas",
  specialty: "Nephrology Specialist",
  photo: "https://i.pravatar.cc/300?img=32",
  department: "Nephrology",
  joiningDate: "01-Jun-2025",
  email: "binti@birdem.net",
  phone: "+880 1518443329",
};
const MOCK_DIALYSES_FEED = [
  { id: 1, patientName: "Tanvir Rayhan", dateTime: "05 March 2026 | 09:00", urr: "65%", status: "Completed", note: "Patient stable, mild hypotension corrected" },
  { id: 2, patientName: "Shanto Shah", dateTime: "05 March 2026 | 09:00", urr: "65%", status: "Cancelled", note: null },
  { id: 3, patientName: "Din Islam", dateTime: "05 March 2026 | 09:00", urr: "65%", status: "Completed", note: "Patient stable, mild hypotension corrected" },
  { id: 4, patientName: "Binti Biswas", dateTime: "05 March 2026 | 09:00", urr: "65%", status: "Completed", note: "Patient stable, mild hypotension corrected" },
];
const MOCK_WEEK_DAYS = [
  { id: 1, label: "Mon", date: 9 },
  { id: 2, label: "Mon", date: 10 },
  { id: 3, label: "Mon", date: 11 },
  { id: 4, label: "Mon", date: 12 },
  { id: 5, label: "Mon", date: 13 },
  { id: 6, label: "Mon", date: 14 },
  { id: 7, label: "Mon", date: 15 },
];
const MOCK_PATIENTS_ON_SHIFT = [
  { id: 1, name: "Akif Mahmud", shift: "2nd Shift", dialysesCount: 4, avatar: "https://i.pravatar.cc/60?img=51" },
  { id: 2, name: "Akif Mahmud", shift: "2nd Shift", dialysesCount: 4, avatar: "https://i.pravatar.cc/60?img=52" },
  { id: 3, name: "Akif Mahmud", shift: "2nd Shift", dialysesCount: 4, avatar: "https://i.pravatar.cc/60?img=53" },
  { id: 4, name: "Akif Mahmud", shift: "2nd Shift", dialysesCount: 4, avatar: "https://i.pravatar.cc/60?img=54" },
  { id: 5, name: "Akif Mahmud", shift: "2nd Shift", dialysesCount: 4, avatar: "https://i.pravatar.cc/60?img=55" },
];
const MOCK_DIALYSES_TABLE = [
  { id: 1, slNo: 1, patientName: "Tanvir Rayhan", hdId: "1090-562817", dialysesTime: "03/10", nid: "6445-6000-7890", progress: 65 },
  { id: 2, slNo: 2, patientName: "Shanto Shah", hdId: "1090-562817", dialysesTime: "06/17", nid: "6445-6000-7890", progress: 75 },
  { id: 3, slNo: 3, patientName: "Binti Biswas", hdId: "1090-562817", dialysesTime: "05/10", nid: "6445-6000-7890", progress: 45 },
  { id: 4, slNo: 4, patientName: "Din Islam", hdId: "1090-562817", dialysesTime: "03/10", nid: "6445-6000-7890", progress: 80 },
];
const MOCK_DOCUMENTS = [
  { id: 1, name: "Third Meeting MOM.doc", size: "300 KB", type: "doc" },
  { id: 2, name: "New Requirement.pdf", size: "300 KB", type: "pdf" },
  { id: 3, name: "Design Inspiration.doc", size: "300 KB", type: "doc" },
  { id: 4, name: "Design Inspiration.doc", size: "300 KB", type: "doc" },
  { id: 5, name: "Design Inspiration.doc", size: "300 KB", type: "doc" },
];
const MOCK_NAV_ITEMS = [
  { id: 1, label: "Dashboard" },
  { id: 2, label: "Patients" },
  { id: 3, label: "Appointment" },
  { id: 4, label: "Doctors" },
  { id: 5, label: "Dialysis" },
];
const MOCK_CURRENT_USER = {
  name: "Dr. Tanvir Rayhan",
  role: "Super Admin",
  avatar: "https://i.pravatar.cc/60?img=12",
  notificationCount: 2,
};

/* =========================================================
   TOP NAV
   ========================================================= */

function TopNav({ navItems, activeNav, onNavClick, currentUser }) {
  return (
    <header className="top-nav">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">+</span>
        <div className="brand-text">
          <span className="brand-name">BIRDEM</span>
          <span className="brand-subtitle">General Hospital</span>
        </div>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-link${activeNav === item.label ? " nav-link-active" : ""}`}
            onClick={() => onNavClick(item.label)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="nav-user">
        <button type="button" className="icon-button" aria-label="Notifications">
          🔔
          {currentUser.notificationCount > 0 && (
            <span className="notification-badge">{currentUser.notificationCount}</span>
          )}
        </button>
        <img className="user-avatar" src={currentUser.avatar} alt={currentUser.name} />
        <div className="user-info">
          <span className="user-name">{currentUser.name}</span>
          <span className="user-role">{currentUser.role}</span>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   PAGE HEADER
   ========================================================= */

function PageHeader({ title, breadcrumbs, actionLabel, onAction }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        <div className="breadcrumbs">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb} className="breadcrumb-item">
              {crumb}
              {i < breadcrumbs.length - 1 && <span className="breadcrumb-separator">›</span>}
            </span>
          ))}
        </div>
      </div>
      <button type="button" className="primary-button" onClick={onAction}>
        + {actionLabel}
      </button>
    </div>
  );
}

/* =========================================================
   DOCTORS SIDEBAR (left list + search)
   ========================================================= */

function DoctorsSidebar({ doctors, selectedId, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="panel doctors-sidebar">
      <div className="panel-header">
        <h2 className="panel-title">Doctors List</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon" aria-hidden="true">🔍</span>
        </div>
      </div>

      <ul className="doctor-list">
        {filtered.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              className={`doctor-list-item${selectedId === doc.id ? " doctor-list-item-active" : ""}`}
              onClick={() => onSelect(doc.id)}
            >
              <img className="doctor-list-avatar" src={doc.avatar} alt={doc.name} />
              <span className="doctor-list-text">
                <span className="doctor-list-name">{doc.name}</span>
                <span className="doctor-list-specialty">{doc.specialty}</span>
              </span>
              <span className="doctor-list-menu" aria-hidden="true">⋯</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* =========================================================
   DOCTOR PROFILE CARD (middle-left "Basic Information")
   ========================================================= */

function DoctorProfileCard({ doctor }) {
  return (
    <section className="panel profile-card">
      <div className="panel-header">
        <span className="panel-eyebrow">Basic Information</span>
        <div className="profile-card-actions">
          <button type="button" className="icon-button-ghost" aria-label="View">👁</button>
          <button type="button" className="icon-button-ghost" aria-label="Edit">✎</button>
        </div>
      </div>

      <img className="profile-photo" src={doctor.photo} alt={doctor.name} />

      <h3 className="profile-name">{doctor.name}</h3>
      <p className="profile-specialty">{doctor.specialty}</p>

      <div className="profile-meta-grid">
        <div className="profile-meta-item">
          <span className="profile-meta-label">Department</span>
          <span className="profile-meta-value">{doctor.department}</span>
        </div>
        <div className="profile-meta-item">
          <span className="profile-meta-label">Joining Date</span>
          <span className="profile-meta-value">{doctor.joiningDate}</span>
        </div>
      </div>

      <div className="profile-contact-list">
        <div className="profile-contact-item">
          <span aria-hidden="true">✉</span> {doctor.email}
        </div>
        <div className="profile-contact-item">
          <span aria-hidden="true">📞</span> {doctor.phone}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DIALYSES OVERVIEW FEED (middle "Dialyses Overview" scroll list)
   ========================================================= */

function DialysesOverviewFeed({ entries }) {
  return (
    <section className="panel overview-feed">
      <div className="panel-header">
        <h2 className="panel-title">Dialyses Overview</h2>
      </div>

      <ul className="overview-feed-list">
        {entries.map((entry) => (
          <li key={entry.id} className="overview-feed-item">
            <div className="overview-feed-row">
              <span className="overview-feed-patient">
                <span aria-hidden="true">👤</span> {entry.patientName}
              </span>
              <span className="overview-feed-datetime">{entry.dateTime}</span>
              <StatusBadge status={entry.status} />
            </div>
            <div className="overview-feed-urr">Urea Reduction Ratio (URR) : {entry.urr}</div>
            {entry.note && (
              <div className="overview-feed-note">
                <span aria-hidden="true">ⓘ</span> {entry.note}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusBadge({ status }) {
  const tone = status === "Completed" ? "success" : status === "Cancelled" ? "danger" : "neutral";
  return <span className={`status-badge status-badge-${tone}`}>{status}</span>;
}

/* =========================================================
   PATIENTS SCHEDULE PANEL (right "Patients" week strip + list)
   ========================================================= */

function PatientsSchedulePanel({ days, activeDayId, onDaySelect, patients }) {
  return (
    <section className="panel schedule-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span aria-hidden="true">🗓</span> Patients
        </h2>
      </div>

      <div className="week-strip">
        {days.map((day) => (
          <button
            key={day.id}
            type="button"
            className={`week-day${activeDayId === day.id ? " week-day-active" : ""}`}
            onClick={() => onDaySelect(day.id)}
          >
            <span className="week-day-label">{day.label}</span>
            <span className="week-day-date">{day.date}</span>
          </button>
        ))}
      </div>

      <ul className="schedule-patient-list">
        {patients.map((patient, i) => (
          <li key={`${patient.id}-${i}`} className="schedule-patient-item">
            <img className="schedule-patient-avatar" src={patient.avatar} alt={patient.name} />
            <span className="schedule-patient-text">
              <span className="schedule-patient-name">{patient.name}</span>
              <span className="schedule-patient-detail">Dialyses {patient.dialysesCount} times</span>
            </span>
            <span className="schedule-patient-shift">{patient.shift}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* =========================================================
   DIALYSES TABLE (bottom-left data table + pagination)
   ========================================================= */

function DialysesTable({ rows, currentPage, totalPages, totalCount, onPageChange }) {
  const [query, setQuery] = useState("");

  return (
    <section className="panel table-panel">
      <div className="panel-header table-panel-header">
        <h2 className="panel-title">Dialyses Overview</h2>
        <div className="table-panel-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon" aria-hidden="true">🔍</span>
          </div>
          <button type="button" className="filter-button">
            <span aria-hidden="true">☰</span> Status
          </button>
        </div>
      </div>

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>SL. NO.</th>
              <th>Patient Name</th>
              <th>HD ID</th>
              <th>Dialyses Time</th>
              <th>NID</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{String(row.slNo).padStart(2, "0")}</td>
                <td>{row.patientName}</td>
                <td>{row.hdId}</td>
                <td>{row.dialysesTime}</td>
                <td>{row.nid}</td>
                <td>
                  <ProgressBar value={row.progress} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="table-footer-count">
          Showing 1-10 from {totalCount}
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      <span className="progress-bar-label">{value}%</span>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`pagination-page${currentPage === p ? " pagination-page-active" : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <span className="pagination-ellipsis">...</span>
      <button
        type="button"
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}

/* =========================================================
   DOCUMENTS PANEL (bottom-right "Essential Document")
   ========================================================= */

function DocumentsPanel({ documents }) {
  return (
    <section className="panel documents-panel">
      <div className="panel-header">
        <h2 className="panel-title">Essential Document</h2>
      </div>

      <ul className="document-list">
        {documents.map((doc) => (
          <li key={doc.id} className="document-item">
            <span className={`document-icon document-icon-${doc.type}`} aria-hidden="true">
              {doc.type === "pdf" ? "PDF" : "DOC"}
            </span>
            <span className="document-text">
              <span className="document-name">{doc.name}</span>
              <span className="document-size">{doc.size}</span>
            </span>
            <span className="document-actions">
              <button type="button" className="icon-button-ghost" aria-label="Download">⬇</button>
              <button type="button" className="icon-button-ghost" aria-label="Delete">🗑</button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}



export default function DocDashboard() {
  const [activeNav, setActiveNav] = useState("Doctors");
  const [selectedDoctorId, setSelectedDoctorId] = useState(MOCK_SELECTED_DOCTOR.id);
  const [activeDayId, setActiveDayId] = useState(4);
  const [tablePage, setTablePage] = useState(1);

  const doctor = MOCK_SELECTED_DOCTOR; // in real app: look up MOCK_DOCTORS by selectedDoctorId

  return (
    <div className="page">
      <TopNav
        navItems={MOCK_NAV_ITEMS}
        activeNav={activeNav}
        onNavClick={setActiveNav}
        currentUser={MOCK_CURRENT_USER}
      />

      <main className="page-body">
        <PageHeader
          title="Doctors List"
          breadcrumbs={["Dashboard", "Route 01", "Route 02"]}
          actionLabel="Add New Doctor"
          onAction={() => console.log("open add-doctor form")}
        />

        <section className="content-grid">
          <DoctorsSidebar
            doctors={MOCK_DOCTORS}
            selectedId={selectedDoctorId}
            onSelect={setSelectedDoctorId}
          />

          <DoctorProfileCard doctor={doctor} />

          <DialysesOverviewFeed entries={MOCK_DIALYSES_FEED} />

          <PatientsSchedulePanel
            days={MOCK_WEEK_DAYS}
            activeDayId={activeDayId}
            onDaySelect={setActiveDayId}
            patients={MOCK_PATIENTS_ON_SHIFT}
          />

          <DialysesTable
            rows={MOCK_DIALYSES_TABLE}
            currentPage={tablePage}
            totalPages={3}
            totalCount={100}
            onPageChange={setTablePage}
          />

          <DocumentsPanel documents={MOCK_DOCUMENTS} />
        </section>
      </main>
    </div>
  );
}

