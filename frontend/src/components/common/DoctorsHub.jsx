import React, { useState, useRef, useEffect } from 'react'
import {
  FileText, Search, MapPin, Stethoscope, ChevronDown, ChevronUp, User, Building2, Phone, BriefcaseMedical, GraduationCap, MessageCircle, MoreVertical, CalendarDays, Pill, FolderOpen, FlaskConical, UserPlus, Activity, Users,
  Send,
} from "lucide-react";
import doc from "../../assets/home/doc6.png";

import "../../styles/Components/Common/Doctors_Hub.css"

const MOCK_BRANCHES = ["Guwahati Main Branch", "Dispur Branch", "Jorhat Branch"];

const MOCK_DEPARTMENTS = ["Nephrology", "Cardiology", "Neurology", "Urology", "Orthopaedics"];

const MOCK_DOCTORS = [
  {
    id: 1, name: "Dr. Binti Biswas", initials: "BB", tone: 1, photo: "",
    spec: "Nephrology Specialist", exp: 12, status: "available",
    degree: "MBBS, MD (Internal Medicine), DM (Nephrology)",
    tags: ["Nephrology", "Internal Medicine", "Kidney Care", "Dialysis"],
    rating: 4.8, reviews: 320, patients: "1,284", room: "Room 304", floor: "Main Building, 3rd Floor",
    about:
      "Dr. Binti Biswas is a highly experienced Nephrologist with special interest in chronic kidney disease, dialysis management and renal transplantation .",
    // She is committed to providing comprehensive and patient-centred kidney care.
    contact: "abc@amshospital.org.com", designation:"Senior Consultant",consultation : "In-Person & Online",
    
  },
  {
    id: 2, name: "Dr. Tanvir Rayhan", initials: "TR", tone: 2, photo: "",
    spec: "Nephrology Specialist", exp: 15, status: "available",
    degree: "MBBS, MD (Medicine), DM (Nephrology)",
    tags: ["Nephrology", "Hypertension", "Kidney Care"],
    rating: 4.7, reviews: 284, patients: "1,506", room: "Room 306", floor: "Main Building, 3rd Floor",
    about:
      "Dr. Tanvir Rayhan focuses on hypertension-related kidney disease and long-term renal follow-up, with a calm, evidence-first approach to care.",
    contact: "def@amshospital.org.", designation:"junior Consultant",consultation : "Online" ,
  },
  {
    id: 3, name: "Dr. Akib Rahman", initials: "AR", tone: 3, photo: "",
    spec: "Nephrology Specialist", exp: 10, status: "available",
    degree: "MBBS, MD (Medicine), DNB (Nephrology)",
    tags: ["Nephrology", "Dialysis", "Critical Care"],
    rating: 4.6, reviews: 198, patients: "930", room: "Room 302", floor: "Main Building, 3rd Floor",
    about:
      "Dr. Akib Rahman manages acute kidney injury and dialysis programmes, working closely with the ICU and emergency teams.",
    contact: "ghi@amshospital.org.", designation:"Multi-Senior Consultant",consultation : "In-Person" ,
  },
  {
    id: 4, name: "Dr. Shanto Shah", initials: "SS", tone: 4, photo: "",
    spec: "Nephrology Specialist", exp: 8, status: "limited",
    degree: "MBBS, MD (Medicine), DM (Nephrology)",
    tags: ["Nephrology", "Electrolyte Disorders"],
    rating: 4.5, reviews: 121, patients: "612", room: "Room 310", floor: "Main Building, 3rd Floor",
    about:
      "Dr. Shanto Shah treats electrolyte and acid-base disorders and supports inpatient nephrology consults.",
    contact: "jkl@amshospital.org.", designation:"Consultant",consultation : "Online" ,
  },
  {
    id: 5, name: "Dr. Zerin Taslim", initials: "ZT", tone: 5, photo: "",
    spec: "Nephrology Specialist", exp: 11, status: "unavailable",
    degree: "MBBS, MD (Medicine), DM (Nephrology)",
    tags: ["Nephrology", "Kidney Care"],
    rating: 4.7, reviews: 240, patients: "1,020", room: "Room 308", floor: "Main Building, 3rd Floor",
    about:
      "Dr. Zerin Taslim specialises in chronic kidney disease management and patient education.",
    contact: "mno@amshospital.org.", designation:"Senior Consultant",consultation : "In-Person" ,  
  },
  {
    id: 6, name: "Dr. Rifat Rahman", initials: "RR", tone: 2, photo: "",
    spec: "Nephrology Specialist", exp: 13, status: "unavailable",
    degree: "MBBS, MD (Medicine), DM (Nephrology)",
    tags: ["Nephrology", "Dialysis", "Hypertension"],
    rating: 4.6, reviews: 205, patients: "1,140", room: "Room 312", floor: "Main Building, 3rd Floor",
    about:
      "Dr. Rifat Rahman leads the haemodialysis unit rota and reviews complex long-term dialysis patients.",
    contact: "pqr@amshospital.org.", designation:"Senior Consultant",consultation : "Online" ,
  },
  {
    id: 7, name: "Dr. Mousumi Kalita", initials: "MK", tone: 1, photo: "",
    spec: "Transplant Nephrology", exp: 9, status: "available",
    degree: "MBBS, MD (Medicine), DM (Nephrology)",
    tags: ["Transplant", "Nephrology", "Immunosuppression"],
    rating: 4.9, reviews: 167, patients: "540", room: "Room 401", floor: "Main Building, 4th Floor",
    about:
      "Dr. Mousumi Kalita works with the Kidney Transplant Unit on donor evaluation, transplant follow-up and immunosuppression plans.",
    contact: "stu@amshospital.org.", designation:"junior Consultant",consultation : "In-Person" ,
  },
  {
    id: 8, name: "Dr. Rahul Dutta", initials: "RD", tone: 3, photo: "",
    spec: "Interventional Nephrology", exp: 7, status: "leave",
    degree: "MBBS, MD (Medicine), DM (Nephrology)",
    tags: ["Interventional", "Vascular Access"],
    rating: 4.4, reviews: 88, patients: "410", room: "Room 405", floor: "Main Building, 4th Floor",
    about:
      "Dr. Rahul Dutta performs vascular access procedures and dialysis catheter care.",
    contact: "vwx@amshospital.org.", designation:"Multi-senior Consultant",consultation : "Online" ,
  },
];

// state: available | booked | unavailable
const MOCK_SLOTS = [
  ["09:00 AM", "available"], ["09:30 AM", "available"], ["10:00 AM", "available"], ["10:30 AM", "booked"],
  ["11:00 AM", "available"], ["11:30 AM", "available"], ["12:00 PM", "unavailable"], ["12:30 PM", "unavailable"],
  ["02:00 PM", "available"], ["02:30 PM", "booked"], ["03:00 PM", "available"], ["03:30 PM", "available"],
  ["04:00 PM", "available"], ["04:30 PM", "available"], ["05:00 PM", "booked"], ["05:30 PM", "unavailable"],
];

// dots: g = available, o = limited, r = booked, n = unavailable
const MOCK_WEEK = [
  { day: "Mon", date: "Sep 28", full: "Mon, Sep 28, 2025", slots: 9, dots: ["g", "g", "g", "o"] },
  { day: "Tue", date: "Sep 29", full: "Tue, Sep 29, 2025", slots: 4, dots: ["g", "o", "o", "n"] },
  { day: "Wed", date: "Sep 30", full: "Wed, Sep 30, 2025", slots: 2, dots: ["g", "g", "n", "n"] },
  { day: "Thu", date: "Oct 01", full: "Thu, Oct 01, 2025", slots: 7, dots: ["g", "g", "g", "n"] },
  { day: "Fri", date: "Oct 02", full: "Fri, Oct 02, 2025", slots: 6, dots: ["g", "g", "g", "g"] },
  { day: "Sat", date: "Oct 03", full: "Sat, Oct 03, 2025", slots: 3, dots: ["r", "r", "o", "n"] },
  { day: "Sun", date: "Oct 04", full: "Sat, Oct 04, 2025", slots: "NO", dots: ["r", "r", "r", "r"] },
];

const MOCK_FOCUS = [
  { label: "Chronic Kidney Disease", icon: "droplet" },
  { label: "Dialysis Management", icon: "activity" },
  { label: "Renal Transplantation", icon: "layers" },
  { label: "Hypertension", icon: "heart" },
  { label: "Electrolyte Disorders", icon: "zap" },
];

const MOCK_REFERRAL_STATS = [
  { label: "Total Referrals", value: 182, trend: "12%", tone: "green", icon: "calendar" },
  { label: "Accepted", value: 96, trend: "8%", tone: "green", icon: "check" },
  { label: "In Consultation", value: 68, trend: "5%", tone: "orange", icon: "file" },
  { label: "Pending", value: 18, trend: "2%", tone: "red", icon: "clock" },
];

const MOCK_COLLAB = [
  { name: "Internal Medicine", tag: "Collaboration", icon: "users" },
  { name: "Urology", tag: "Collaboration", icon: "shield" },
  { name: "Kidney Transplant Unit", tag: "Referral Support", icon: "layers" },
  { name: "Radiology", tag: "Diagnostic Support", icon: "activity" },
];

const MOCK_TABS = [
  { id: "overview", label: "Overview", icon: "info" },
  { id: "slots", label: "Referral Slots", icon: "calendar" },
  { id: "expertise", label: "Areas of Expertise", icon: "award" },
  { id: "reviews", label: "Patient Reviews", icon: "star" },
  { id: "pubs", label: "Publications", icon: "book" },
];

const STATUS_META = {
  available: { label: "Available ", icon: null, cls: "dh-pill--available", dot: "green" },
  limited: { label: "Available (Limited)", icon: "clock", cls: "dh-pill--limited", dot: "green" },
  unavailable: { label: "Unavailable", icon: "ban", cls: "dh-pill--unavailable", dot: "grey" },
  leave: { label: "On Leave", icon: "clock", cls: "dh-pill--leave", dot: "red" },
};

const isAvailable = (d) => d.status === "available" || d.status === "limited";

/* ------------------------------------------------------------------ */
/*  ICONS (inline SVG, no dependency)                                  */
/* ------------------------------------------------------------------ */

const ICONS = {
  pin: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  search: (<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>),
  down: <path d="m6 9 6 6 6-6" />,
  right: <path d="m9 18 6-6-6-6" />,
  left: <path d="m15 18-6-6 6-6" />,
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  users: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  share: (<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98" /><path d="m15.41 6.51-6.82 3.98" /></>),
  more: (<><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></>),
  star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  award: (<><circle cx="12" cy="8" r="6" /><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" /></>),
  check: <path d="M20 6 9 17l-5-5" />,
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  file: (<><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6" /></>),
  clip: <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />,
  send: (<><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>),
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  ban: (<><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></>),
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  droplet: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />,
  layers: (<><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  book: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z" /></>),
  info: (<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>),
  chart: <path d="M12 20V10M18 20V4M6 20v-4" />,
  up: (<><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>),
  badge: (<><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>),
};

function DhIcon({ name, size = 18, className = "", filled = false }) {
  return (
    <svg
      className={`dh-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function DhAvatar({ doc, className = "" }) {
  return doc.photo ? (
    <img className={`dh-avatar-img ${className}`} src={doc.photo} alt={doc.name} />
  ) : (
    <span className={`dh-avatar-img dh-avatar-img--t${doc.tone} ${className}`} aria-hidden="true">
      {doc.initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function DoctorsHub() {
  const [branch, setBranch] = useState(MOCK_BRANCHES[0]);
  const [dept, setDept] = useState(MOCK_DEPARTMENTS[0]);
  const [globalQuery, setGlobalQuery] = useState("");
  const [listQuery, setListQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(MOCK_DOCTORS[0].id);
  const [tab, setTab] = useState("overview");
  const [dayIdx, setDayIdx] = useState(2);
  const [slot, setSlot] = useState(null);
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState([]);
  const [referral, setReferral] = useState({ type: "Consultation", priority: "Routine", reason: "" });
  const fileRef = useRef(null);

  const doctor = MOCK_DOCTORS.find((d) => d.id === selectedId) || MOCK_DOCTORS[0];
  const status = STATUS_META[doctor.status];
  const availableCount = MOCK_DOCTORS.filter(isAvailable).length;
  const unavailableCount = MOCK_DOCTORS.length - availableCount;

  const q = (globalQuery || listQuery).trim().toLowerCase();
  const visibleDoctors = MOCK_DOCTORS.filter((d) => {
    if (filter === "available" && !isAvailable(d)) return false;
    if (filter === "unavailable" && isAvailable(d)) return false;
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.spec.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    if (openMenuId === null) return;
    const onDown = (e) => {
      if (!e.target.closest(".dh-menu, .dh-more")) setOpenMenuId(null);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpenMenuId(null); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenuId]);

  const shiftDay = (step) => setDayIdx((i) => Math.min(MOCK_WEEK.length - 1, Math.max(0, i + step)));

  const handleSend = () => {
    // TODO: POST /api/referrals { doctorId, ...referral, slot, files }
    console.log("referral", { doctorId: doctor.id, ...referral, slot, files: files.map((f) => f.name) });
    setSent(true);
    setReferral((r) => ({ ...r, reason: "" }));
    setFiles([]);
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <div className="dh-root">
      {/* ---------------- TOP BAR ---------------- */}
      <header className="dh-topbar">
        {/* <label className="dh-select dh-select--branch">
          <DhIcon name="pin" className="dh-select__lead" />
          <select value={branch} onChange={(e) => setBranch(e.target.value)} aria-label="Branch">
            {MOCK_BRANCHES.map((b) => <option key={b}>{b}</option>)}
          </select>
          <DhIcon name="down" size={16} className="dh-select__caret" />
        </label> */}

        <label className="dh-select dh-select--dept">
          <DhIcon name="activity" className="dh-select__lead" />
          <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Department">
            {MOCK_DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <DhIcon name="down" size={16} className="dh-select__caret" />
        </label>

        <label className="dh-search dh-search--global">
          <DhIcon name="search" size={18} />
          <input
            type="text"
            placeholder="Search doctor by name, speciality, keyword..."
            value={globalQuery}
            onChange={(e) => setGlobalQuery(e.target.value)}
          />
        </label>

        {/* <button type="button" className="dh-bell" aria-label="Notifications, 3 unread">
          <DhIcon name="bell" size={20} />
          <span className="dh-bell__count">3</span>
        </button> */}
        {/* <span className="dh-me" aria-hidden="true">AD</span> */}
      </header>

      <div className="dh-body">
        {/* ---------------- LEFT: REFERRAL DOCTORS ---------------- */}
        <aside className="dh-side">
          {/* <div className="dh-side__head">
            <h2 className="dh-side__title">
              <DhIcon name="users" size={15} className="dh-side__title-icon" />
              Doctors
            </h2>
            <span className="dh-count">{MOCK_DOCTORS.length}/10</span>
          </div> */}
          {/* <p className="dh-side__sub">Refer to available specialists within the hospital</p> */}

          {/* <label className="dh-search dh-search--list">
            <DhIcon name="search" size={16} />
            <input
              type="text"
              placeholder="Search doctor by name or specialty..."
              value={listQuery}
              onChange={(e) => setListQuery(e.target.value)}
            />
          </label> */}

          <div className="dh-filters" role="tablist" aria-label="Availability filter">
            <button type="button" role="tab" aria-selected={filter === "all"}
              className={`dh-filter ${filter === "all" ? "is-active" : ""}`} onClick={() => setFilter("all")}>
              All
              {/* ({MOCK_DOCTORS.length}) */}
            </button>
            <button type="button" role="tab" aria-selected={filter === "available"}
              className={`dh-filter ${filter === "available" ? "is-active" : ""}`} onClick={() => setFilter("available")}>
              Available ({availableCount})
            </button>
            <button type="button" role="tab" aria-selected={filter === "unavailable"}
              className={`dh-filter ${filter === "unavailable" ? "is-active" : ""}`} onClick={() => setFilter("unavailable")}>
              Unavailable ({unavailableCount})
            </button>
          </div>

          <ul className="dh-list">
            {visibleDoctors.map((d) => {
              const s = STATUS_META[d.status];
              return (
                <li key={d.id} className="dh-item">
                  <button
                    type="button"
                    className={`dh-row ${d.id === selectedId ? "is-selected" : ""}`}
                    onClick={() => { setSelectedId(d.id); setOpenMenuId(null); }}
                  >
                    <span className="dh-row__avatar">
                      <DhAvatar doc={d} />
                      <i className={`dh-presence dh-presence--${s.dot}`} />
                    </span>
                    <span className="dh-row__info">
                      <span className="dh-row__name">{d.name}</span>
                      <span className="dh-row__spec">{d.spec}</span>
                      <span className={`dh-pill ${s.cls}`}>
                        {s.icon && <DhIcon name={s.icon} size={13} />}
                        {s.label}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className="dh-more"
                    aria-label={`More options for ${d.name}`}
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === d.id}
                    onClick={() => setOpenMenuId(openMenuId === d.id ? null : d.id)}
                  >
                    •••
                  </button>

                  {openMenuId === d.id && (
                    <ul className="dh-menu" role="menu">
                      <li><button type="button" role="menuitem" onClick={() => setOpenMenuId(null)}>Remove </button></li>
                      {/* <li><button type="button" role="menuitem" onClick={() => setOpenMenuId(null)}>Book appointment</button></li> */}
                    </ul>
                  )}
                </li>
              );
            })}
            {visibleDoctors.length === 0 && (
              <li className="dh-empty">No doctors match. Clear the search or switch the filter.</li>
            )}
          </ul>
        </aside>

        {/* ---------------- RIGHT: DOCTOR DETAIL ---------------- */}
        <main className="dh-main">
          {/* HERO */}
          <section className="dh-hero">
            <div className="dh-hero__photo">
              <DhAvatar doc={doctor} className="dh-hero__img" />
              <span className={`dh-hero__badge dh-hero__badge--${doctor.status}`}>
                <i className={`dh-dot-sm dh-dot-sm--${status.dot}`} />
                {doctor.status === "unavailable" ? "Unavailable" : doctor.status === "leave" ? "On Leave" : "Available"}
              </span>
            </div>

            <div className="dh-hero__info">
              <div className="dh-hero__name_and_refer">
                <h1 className='dh-hero__name'>
                  {doctor.name}
                  <DhIcon name="badge" size={24} className="dh-verified" />
                </h1>

                <div className="dh-icon-actions">
                  <button type="button" className={`dh-icon-btn ${saved ? "is-on" : ""}`} onClick={() => setSaved((v) => !v)} aria-pressed={saved}>
                    <DhIcon name="heart" size={15} filled={saved} />
                  </button>
                  <button type="button" className="dh-icon-btn">
                    {/* <DhIcon name="share" size={15} /> */}
                    <Send name="users" size={15} />
                  </button>
                  <button type="button" className="dh-icon-btn dh-icon-btn--plain" aria-label="More options"><DhIcon name="more" size={20} /></button>
                  {/* <span className="dh-icon-label">{saved ? "Saved" : "Save"}</span>
                  <span className="dh-icon-label">Refer</span> */}
                  <span />
                </div>
              </div>
              <p className="dh-hero__degree">{doctor.degree}</p>

              <ul className="dh-chips">
                {doctor.tags.map((t) => <li key={t} className="dh-chip">{t}</li>)}
              </ul>

              <ul className="dh-facts">
                <li className="dh-fact">
                  <span className="dh-fact__icon dh-fact__icon--gold"><DhIcon name="star" size={15} filled /></span>
                  <span><b>{doctor.rating}</b><small>({doctor.reviews} Reviews)</small></span>
                </li>
                {/* <li className="dh-fact">
                  <span className="dh-fact__icon dh-fact__icon--blue"><DhIcon name="award" size={15} /></span>
                  <span><b>{doctor.exp} Years</b><small>Experience</small></span>
                </li> */}
                <li className="dh-fact">
                  <span className="dh-fact__icon dh-fact__icon--blue"><DhIcon name="users" size={15} /></span>
                  <span><b>{doctor.patients}</b><small>Patients Consulted</small></span>
                </li>
                <li className="dh-fact">
                  <span className="dh-fact__icon dh-fact__icon--blue"><DhIcon name="pin" size={15} /></span>
                  <span><b>{doctor.room}</b><small>{doctor.floor}</small></span>
                </li>
              </ul>

              {/* <p className="dh-hero__about">{doctor.about}</p> */}

            </div>

            {/* <div className="dh-hero__actions">
              <div className="dh-icon-actions">
                <button type="button" className={`dh-icon-btn ${saved ? "is-on" : ""}`} onClick={() => setSaved((v) => !v)} aria-pressed={saved}>
                  <DhIcon name="heart" size={15} filled={saved} />
                </button>
                <button type="button" className="dh-icon-btn"><DhIcon name="share" size={15} /></button>
                <button type="button" className="dh-icon-btn dh-icon-btn--plain" aria-label="More options"><DhIcon name="more" size={20} /></button>
                <span className="dh-icon-label">{saved ? "Saved" : "Save"}</span>
                <span className="dh-icon-label">Share</span>
                <span />
              </div>

              <div className="dh-cta">
                <button type="button" className="dh-btn dh-btn--primary">
                  <Send name="users" size={15} />
                </button>
                <button type="button" className="dh-btn dh-btn--outline">
                  <DhIcon name="file" size={18} /> View Full Profile
                </button>
              </div>
            </div> */}
            {/* <DhIcon name="users" size={15} /> Refer */}
          </section>

          {/* TABS */}
          <nav className="dh-tabs" role="tablist">
            {MOCK_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`dh-tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <DhIcon name={t.icon} size={15} />
                {t.label}
              </button>
            ))}
          </nav>

          {/* ROW */}
          <div className="dh-grid dh-grid--top">

            {tab === "overview" && (
              <section className="dh-doctor-overview">
                {/* <div className="dh-overview-header">
                  <div>
                    <h2>Doctor Overview</h2>
                    <p>
                      A brief overview of the doctor's professional profile and clinical
                      information.
                    </p>
                  </div>

                  <span className="dh-doctor-status">
                    <span className="dh-status-dot"></span>
                    Available
                  </span>
                </div> */}

                <div className="dh-overview-content">

                  {/* About */}
                  <div className="dh-overview-block overview-about">
                    <h3>About</h3>
                    <p className="dh-hero__about">{doctor.about}</p>
                  </div>

                  {/* Professional Information */}
                  <div className="dh-overview-block">
                    <h3>Professional Information</h3>

                    <div className="dh-info-grid">
                      <div className="dh-info-item">
                        <span>Department</span>
                        <strong>Cardiology</strong>
                      </div>

                      <div className="dh-info-item">
                        <span>Experience</span>
                        <strong>{doctor.exp}</strong>
                      </div>

                      <div className="dh-info-item">
                        <span>Designation</span>
                        <strong>{doctor.designation}</strong>
                      </div>

                      <div className="dh-info-item">
                        <span>Consultation</span>
                        <strong>{doctor.consultation}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="dh-overview-block">
                    <h3>Contact & Location</h3>

                    <div className="dh-contact-row">
                      <div>
                        <span>Hospital</span>
                        <strong>AMS Hospital</strong>
                      </div>

                      <div>
                        <span>Room</span>
                        <strong>{doctor.room}</strong>
                      </div>

                      <div>
                        <span>Contact</span>
                        <strong>{doctor.contact}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            )}

            {/* Weekly schedule */}
            {tab === "slots" && (
              <section className="dh-card dh-week">
                <header className="dh-card__head">
                  <h3 className="dh-card__title">
                    <span className="dh-tile"><DhIcon name="calendar" size={14} /></span>
                    Weekly Schedule
                  </h3>
                  <button type="button" className="dh-link">
                    View More
                  </button>
                </header>

                <div className="dh-week__days">
                  {MOCK_WEEK.map((d, i) => (
                    <button
                      key={d.day}
                      type="button"
                      className={`dh-day ${i === dayIdx ? "is-active" : ""}`}
                      onClick={() => setDayIdx(i)}
                    >
                      <b>{d.day}</b>
                      <small>{d.date}</small>
                      <span className="dh-day__dots">
                        {d.dots.map((c, k) => <i key={k} className={`dh-dot dh-dot--${c}`} />)}
                      </span>
                      <em>{d.slots} Slots</em>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Referral stats */}
            {tab === "reviews" && (
              <section className="dh-card dh-stats">
                <h3 className="dh-card__title">
                  <span className="dh-tile dh-tile--plain"><DhIcon name="chart" size={20} /></span>
                  Referral Statistics
                </h3>
                <div className="dh-stats__grid">
                  {MOCK_REFERRAL_STATS.map((s) => (
                    <div key={s.label} className={`dh-stat dh-stat--${s.tone}`}>
                      <span className="dh-stat__icon"><DhIcon name={s.icon} size={13} /></span>
                      <span className="dh-stat__text">
                        <b>{s.value}</b>
                        <small>{s.label}</small>
                        <em><DhIcon name="up" size={11} />{s.trend}</em>
                      </span>
                    </div>
                  ))}
                </div>
              </section>

            )}

            {/* Specialization focus */}
            {tab === "expertise" && (
              <section className="dh-card dh-focus">
                <h3 className="dh-card__title">
                  <span className="dh-tile dh-tile--round"><DhIcon name="activity" size={15} /></span>
                  Specialization Focus
                </h3>
                <ul className="dh-focus__list">
                  {MOCK_FOCUS.map((f) => (
                    <li key={f.label} className="dh-focus__item">
                      <span className="dh-focus__icon"><DhIcon name={f.icon} size={16} /></span>
                      {f.label}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Departments */}
            {tab === "pubs" && (
              <section className="dh-card dh-collab">
                <h3 className="dh-card__title">
                  <span className="dh-tile dh-tile--plain"><DhIcon name="users" size={14} /></span>
                  Departments &amp; Collaboration
                </h3>
                <ul className="dh-collab__list">
                  {MOCK_COLLAB.map((c) => (
                    <li key={c.name}>
                      <button type="button" className="dh-collab__row">
                        <span className="dh-collab__icon"><DhIcon name={c.icon} size={13} /></span>
                        <span className="dh-collab__name">{c.name}</span>
                        <span className="dh-tag">{c.tag}</span>
                        <DhIcon name="right" size={14} className="dh-collab__chev" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}



            {/* Quick referral */}
            {/* <section className="dh-card dh-quick">
              <h3 className="dh-card__title">
                <span className="dh-tile"><DhIcon name="file" size={20} /></span>
                Quick Referral
              </h3>

              <div className="dh-quick__pair">
                <label className="dh-field">
                  <span>Referral Type</span>
                  <select value={referral.type} onChange={(e) => setReferral({ ...referral, type: e.target.value })}>
                    <option>Consultation</option>
                    <option>Second Opinion</option>
                    <option>Procedure</option>
                    <option>Follow-up</option>
                  </select>
                </label>
                <label className="dh-field">
                  <span>Priority</span>
                  <select value={referral.priority} onChange={(e) => setReferral({ ...referral, priority: e.target.value })}>
                    <option>Routine</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                  </select>
                </label>
              </div>

              <textarea
                className="dh-textarea"
                placeholder="Reason for referral (optional)..."
                value={referral.reason}
                onChange={(e) => setReferral({ ...referral, reason: e.target.value })}
              />

              <input
                ref={fileRef}
                type="file"
                multiple
                hidden
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
              <button type="button" className="dh-btn dh-btn--soft" onClick={() => fileRef.current && fileRef.current.click()}>
                <DhIcon name="clip" size={17} />
                {files.length ? `${files.length} report${files.length > 1 ? "s" : ""} attached` : "Attach Reports"}
              </button>
              <button type="button" className="dh-btn dh-btn--primary dh-btn--send" onClick={handleSend}>
                <DhIcon name={sent ? "check" : "send"} size={17} />
                {sent ? "Referral Sent" : "Send Referral Request"}
              </button>
            </section> */}

            {/* Today's availability */}
            {/* <section className="dh-card dh-avail">
              <header className="dh-card__head">
                <h3 className="dh-card__title">
                  <span className="dh-tile"><DhIcon name="calendar" size={20} /></span>
                  Today&apos;s Availability
                </h3>
                <div className="dh-datenav">
                  <button type="button" onClick={() => shiftDay(-1)} aria-label="Previous day" disabled={dayIdx === 0}><DhIcon name="left" size={16} /></button>
                  <span>{MOCK_WEEK[dayIdx].full}</span>
                  <button type="button" onClick={() => shiftDay(1)} aria-label="Next day" disabled={dayIdx === MOCK_WEEK.length - 1}><DhIcon name="right" size={16} /></button>
                </div>
              </header>

              <ul className="dh-legend">
                <li><i className="dh-dot-sm dh-dot-sm--green" />Available</li>
                <li><i className="dh-dot-sm dh-dot-sm--red" />Booked</li>
                <li><i className="dh-dot-sm dh-dot-sm--grey" />Unavailable</li>
              </ul>

              <div className="dh-slots">
                {MOCK_SLOTS.map(([time, state]) => (
                  <button
                    key={time}
                    type="button"
                    disabled={state !== "available"}
                    className={`dh-slot dh-slot--${state} ${slot === time ? "is-picked" : ""}`}
                    onClick={() => setSlot(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </section> */}



          </div>

        </main>
      </div>
    </div>
  );
}
