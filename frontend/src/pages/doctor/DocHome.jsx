import React, { useEffect , useMemo , useRef , useState , Suspense, lazy} from "react";
import "../../styles/DashBoard/Doctor/doctor-home.css";
import doc from "../../assets/home/doc3.png";
import { createPortal } from "react-dom";
import {
  Cross, LayoutDashboard, Users, FileText, Stethoscope, Pill, FlaskConical,
  CalendarDays, Bell, BarChart3, UserRound, Headset, Settings as SettingsIcon,
  Menu, Search, MessageCircle, ChevronDown, CheckCircle2, Clock, ChevronLeft,
  ChevronRight, MoreVertical, AlertTriangle, UserPlus, BedDouble, ClipboardCheck, Star, Timer, ClipboardList, PlayCircle, FileCheck2, NotebookPen, CheckSquare,Settings,CircleHelp, LogOut, Activity, X, Phone, Mail, HeartPulse, Moon, Languages, LogIn, ShieldCheck, LockKeyhole, FileSignature,
  BriefcaseMedical,
  LibraryBig,
  Building2
} from "lucide-react";

/* Lazy-load each section — only the active one gets fetched/rendered.
   This recovers the code-splitting benefit you'd normally get from routing. */
const Dashboard    = lazy(() => import("../doctor/DocDashboard"));
const Schedule         = lazy(() => import("../doctor/DocSchedule"));
const Patient   = lazy(() => import("../../components/common/PatientRecords"));
const Doctor_Workspace        = lazy(() => import("../doctor/DocWorkspace"));
const DocHub           = lazy(() => import("../../components/common/DoctorsHub"));
const MDT_Meetings              = lazy(() => import("../../components/common/MDT_Meetings"));
const Hospital_Faculty              = lazy(() => import("../../components/common/Hospital_Faculty"));
const MedicalLibrary   = lazy(() => import("../../components/common/Medical_Library"));



const Performance      = lazy(() => import("../doctor/DocPerformance"));
const Profile          = lazy(() => import("../doctor/DocProfile"));
const SettingsSection  = lazy(() => import("../../components/common/SettingsSection"));

/* key = tab id, value = component to render. Single source of truth —
   adding a new sidebar item later means adding ONE line here. */
const SECTION_MAP = {
  dashboard: Dashboard,
  schedule: Schedule,
  "patient-records": Patient,
  Workspace:Doctor_Workspace,
  DocHub:DocHub,
  MDT:MDT_Meetings,
  Faculty:Hospital_Faculty,
  "Med-Library":MedicalLibrary,
  
  performance: Performance,
  profile: Profile,
  settings: SettingsSection,
};

/* ---------------- static nav / reference data ---------------- */

// const NAV_ITEMS = [
//   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { id: "patient-records", label: "Patient Records", icon: FileText },
//   { id: "consultation", label: "Consultation", icon: Stethoscope },
//   { id: "schedule", label: "Schedule", icon: CalendarDays },
//   { id: "performance", label: "Performance", icon: BarChart3 },
//   { id: "profile", label: "Profile", icon: UserRound },
//   { id: "settings", label: "Settings", icon: SettingsIcon },
// ];

const NAV_SECTIONS = [
  {
    title: "MAIN",
    theme: "blue",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "schedule", label: "Schedule", icon: CalendarDays },
      // { id: "patient-queue", label: "Patient Queue", icon: Users, count: 10 },
      // { id: "my-patients", label: "My Patients", icon: UserRound },
      { id: "patient-records", label: "	Patients", icon: Stethoscope },
    ],
  },
  
  {
    title: "CLINICAL",
    theme: "green",
    items: [
      { id: "Workspace", label: "My Workspace", icon: BriefcaseMedical },
      // { id: "clinical-notes",label: "Clinical Notes",icon: ClipboardList },
      // { id: "consultations",label: "Consultations",icon: Stethoscope },
      // { id: "diagnosis",label: "Diagnosis",icon: HeartPulse },
      // { id: "prescriptions",label: "Prescriptions",icon: Pill },
      // { id: "follow-ups",label: "Follow-ups",icon: Timer,count: 6 },
      // { id: "certificates",label: "Certificates",icon: FileCheck2 },
      // { id: "referrals",label: "Referrals",icon: ChevronRight },
    ],
  },
  
  {
    title: "COLLABORATION",
    theme: "purple",
    items: [
      { id: "DocHub", label: "Doctor Hub", icon: Users, tag: "NEW" },
      { id: "MDT", label: "MDT Meetings", icon: UserPlus },
      // { id: "case-reviews", label: "Case Reviews", icon: Search },
      // { id: "medical-library", label: "Medical Library", icon: FileText },
      // { id: "research", label: "Research", icon: FlaskConical },
    ],
  },
  
  {
    title: "HOSPITAL",
    theme: "orange",
    items: [
      { id: "Faculty", label: "Hospital Faculty", icon: Building2 },
      { id: "Med-Library", label: "Medical Library", icon: LibraryBig },
      // { id: "cme", label: "More", icon: Star },
      // { id: "performance", label: "Performance", icon: BarChart3 },
      // { id: "ward-rounds", label: "Ward Rounds", icon: BedDouble },
    ],
  }
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ASIDE_QUICK_ACTIONS = [
  { icon: FileText, label: "New Patient", cls: "aside-qa-item--blue" },
  { icon: NotebookPen, label: "Write Note", cls: "aside-qa-item--orange" },
  // { icon: FileCheck2, label: "Add Prescription", cls: "aside-qa-item--green" },
  { icon: Bell, label: "Reminders", cls: "aside-qa-item--green" },
  { icon: FlaskConical, label: "Order Lab Test", cls: "aside-qa-item--purple" },
  { icon: Users, label: "Referral ", cls: "aside-qa-item--teal" },
  { icon: CheckSquare, label: "Create Task", cls: "aside-qa-item--red" },
];

const NOTIFICATIONS = [
  { icon: CalendarDays, title: "Appointment cancelled", subtitle: "John Smith cancelled his 2:00 PM slot", time: "25 mins ago" },
  { icon: FileText, title: "New record shared", subtitle: "Referral note added for Priya Mehta", time: "40 mins ago" },
  { icon: CheckCircle2, title: "Lab sync complete", subtitle: "3 reports imported from the lab system", time: "1 hr ago" },
];



function getMonthGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
function getMonthGridFull(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay++, muted: true });
  }
  return cells;
}
function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}
/* ---------------- component ---------------- */

function DocHome() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [now, setNow] = useState(new Date());
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

const [helpOpen, setHelpOpen] = useState(false);
const [helpSubject, setHelpSubject] = useState("");
const [helpMessage, setHelpMessage] = useState("");
const [helpPriority, setHelpPriority] = useState("Medium");
const [ticketId, setTicketId] = useState(null);

  // calender and clock items
  const dayName = now.toLocaleDateString([], { weekday: "long" });
  const fullDate = now.toLocaleDateString([], { day: "numeric", month: "long" });
  const weekNum = getWeekNumber(now);
  const hh = now.getHours() % 12 === 0 ? 12 : now.getHours() % 12;
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  const monthLabel = now.toLocaleDateString([], { month: "long", year: "numeric" });
  const todayDate = now.getDate();
  const calendarCellsFull = useMemo(() => getMonthGridFull(now), [now.getMonth(), now.getFullYear(), now.getDate()]);
  // analog clock hand angles
  const secAngle = now.getSeconds() * 6;
  const minAngle = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const hourAngle = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

  const ActiveSection = SECTION_MAP[activeTab] ?? DashboardHome;

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);  // close the notification dropdown on outside click
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); // close the profile dropdown on outside click
    }
    document.addEventListener("mousedown", onClick); 
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // single ticking clock for the permanent right-rail widget
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="doctors-home">
      {/* topbar */}
      <div className="doc_logo">
        <div className="doc_topbar_brand">
          <span className="doc_topbar_brand-icon">
            <Cross size={20} strokeWidth={2.5} />
          </span>
          <div className="doc_topbar_brand-text">
            <span className="doc_topbar_brand-name">AMS </span>
            <span className="doc_topbar_brand-tagline">HOSPITAL</span>
          </div>
        </div>
      </div>

        {/* <button className="doc_topbar__menu-btn" aria-label="Toggle sidebar">
          <Menu size={20} />
        </button> */}

      <div className="topbar__search">
        <div className="topbar__search-bar">
          <Search size={16} className="topbar__search-icon" />
          <input type="text" placeholder="Search patients by name, ID or phone..." />
          <kbd className="topbar__search-kbd">Ctrl + K</kbd>
        </div>  
        <div className="topbar__search-activity" >
          <button className="topbar__icon-btn" aria-label="Dark Mode">
            <Moon size={18} />
          </button>
          <button className="topbar__icon-btn" aria-label="Messages">
            <MessageCircle size={18} />
          </button>

          <div className="topbar__notif-wrap" ref={notifRef}>
            <button
              className="topbar__icon-btn"
              aria-label="Notifications"
              onClick={() => setNotifOpen((o) => !o)}
            >
              <Bell size={18} />
              {NOTIFICATIONS.length > 0 && (
                <span className="topbar__icon-badge">{NOTIFICATIONS.length}</span>
              )}
            </button>
            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-dropdown__header">Notifications</div>
                {NOTIFICATIONS.map((n) => (
                  <div className="notif-dropdown__row" key={n.title}>
                    <span className="notif-dropdown__icon"><n.icon size={15} /></span>
                    <div className="notif-dropdown__info">
                      <span className="notif-dropdown__title">{n.title}</span>
                      <span className="notif-dropdown__subtitle">{n.subtitle}</span>
                    </div>
                    <span className="notif-dropdown__time">{n.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="topbar__actions">

        <div className="topbar__profile" ref={profileRef} onClick={() => setProfileOpen((o) => !o)}>
          <img className="topbar__avatar" src={doc} alt="Dr. Rajesh Sharma" />
          <div className="topbar__profile-text">
            <span className="topbar__profile-name">Dr. Rajesh Sharma</span>
            <span className="topbar__profile-role">Cardiologist</span>
            {/* <span className="topbar__profile-role">Id : DOC-2023</span> */}
          </div>
          {/* <ChevronDown size={16} className={`topbar__profile-chevron${profileOpen ? " topbar__profile-chevron--open" : ""}`} /> */}

          {profileOpen && (
            <>
              <div className="doctor-dropdown">
                <button onClick={(e) => { e.stopPropagation(); setActiveTab("profile"); setProfileOpen(false); }}>
                  <UserRound size={17} /> My Profile
                </button>

                <button onClick={(e) => { e.stopPropagation(); setActiveTab("settings"); setProfileOpen(false); }}>
                  <Settings size={17} /> Settings
                </button>

                {/* <button onClick={(e) => { e.stopPropagation(); setActiveTab("profile"); setProfileOpen(false); }}>
                  <UserRound size={17} /> Attendance
                </button> */}

                <button onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <LockKeyhole size={17} /> Privacy
                </button>


                <button onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <ShieldCheck size={17} />  Security
                </button>

                <button onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <FileSignature size={17} /> Credentials
                </button>

                

                <button onClick={(e) => { e.stopPropagation(); setActiveTab("settings"); setProfileOpen(false); }}>
                  <Languages size={17} /> Language
                </button>

                <button className="logout" onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <LogOut size={17} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

        {/* <header className="doc_topbar">
       </header> */}

      {/* left: doctor-specific nav + quick actions */}
      <section className="doc_sidebar">
        <aside className="sidebar">
          <div className="sidebar__nav-items">
            <nav className="doctor-sidebar">
              {NAV_SECTIONS.map((section, index) => (
                <div key={section.title} className={`sidebar-section sidebar-section--${section.theme}`} >
                  {/* SECTION TITLE */}
                      

                  {/* <div className="sidebar-section__header">
                    <div className="sidebar-section__line"/>
                    <div className="sidebar-section__dot" />
                    <span>{section.title}</span>
                    <div className="sidebar-section__line" />
                  </div> */}

                  {/* ITEMS */}

                  <div className="sidebar-section__body">
                    
                    {section.items.map(
                      ({ id, label, icon: Icon, count, tag }) => (
                        <button key={id} type="button" onClick={() => setActiveTab(id)}  className={ "sidebar-item" + (activeTab === id ? " sidebar-item--active" : "")}>
                          <div className="sidebar-item__icon">
                            <Icon size={18} strokeWidth={2} />
                          </div>
                          <span className="sidebar-item__label">
                            {label}
                          </span>
                          {count && (
                            <span className="sidebar-item__badge">
                              {count}
                            </span>
                          )}
                          {tag && (
                            <span className="sidebar-item__tag">
                              {tag}
                            </span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <button type="button" className="sidebar__help"  onClick={() => setHelpOpen(true)}>
            <span className="sidebar__help-icon">
              <Headset size={18} strokeWidth={2} />
            </span>
            <div className="sidebar__help-text" >
              <span className="sidebar__help-title">Need Help?</span>
              <span className="sidebar__help-subtitle">Contact IT Support</span>
            </div>
          </button>

          {helpOpen && createPortal(
            <div className="help-modal-overlay" onClick={() => setHelpOpen(false)}>
              <div className="help-modal" onClick={(e) => e.stopPropagation()}>
                
                <div className="help-modal__header">
                  <div className="help-modal__title-group">
                    <span className="help-modal__icon">
                      <Headset size={18} strokeWidth={2} />
                    </span>
                    <span className="help-modal__title">IT Support</span>
                  </div>
                  <button type="button" className="help-modal__close"
                    aria-label="Close" onClick={() => { setHelpOpen(false); setTicketId(null); }} >
                    <X size={16} />
                  </button>
                </div>

                {ticketId ? (
                  /* ---------- confirmation state ---------- */
                  <div className="help-modal__confirm">
                    <span className="help-modal__confirm-icon">
                      <CheckCircle2 size={32} strokeWidth={2} />
                    </span>
                    <p className="help-modal__confirm-title">Ticket Raised</p>
                    <p className="help-modal__confirm-id">#{ticketId}</p>
                    <p className="help-modal__confirm-text">
                      Your request has been added to the support queue.
                      The team will get back to you shortly.
                    </p>
                    <button type="button" className="help-modal__submit-btn" onClick={() => { setHelpOpen(false); setTicketId(null); }} >
                      Done
                    </button>
                  </div>
                ) : (
                  /* ---------- form state ---------- */
                  <>
                    <a href="tel:18000000000" className="help-modal__quick-item help-modal__quick-item--solo">
                      <Phone size={15} strokeWidth={2} />
                      <span>Urgent? Call 1800-000-0000</span>
                    </a>

                    <p className="help-modal__subtitle">Or raise a ticket with the support team.</p>

                    <div className="help-modal__form">
                      <div className="help-modal__field">
                        <label htmlFor="help-subject">Subject</label>
                        <input id="help-subject" type="text" placeholder="Login issue on patient records" value={helpSubject} onChange={(e) => setHelpSubject(e.target.value)} />
                      </div>

                      <div className="help-modal__field">
                        <label htmlFor="help-priority">Priority</label>
                        <div className="help-modal__priority-group" id="help-priority">
                          {["Low", "Medium", "Urgent"].map((p) => (
                            <button
                              key={p}
                              type="button"
                              className={
                                "help-modal__priority-btn" +
                                (helpPriority === p ? ` help-modal__priority-btn--active-${p.toLowerCase()}` : "")
                              }
                              onClick={() => setHelpPriority(p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="help-modal__field">
                        <label htmlFor="help-message">Message</label>
                        <textarea id="help-message" placeholder="Describe the issue" rows={3} value={helpMessage} onChange={(e) => setHelpMessage(e.target.value)} />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="help-modal__submit-btn"
                      disabled={!helpSubject.trim() || !helpMessage.trim()}
                      onClick={() => {
                        const id = `IT-${Math.floor(1000 + Math.random() * 9000)}`;
                        setTicketId(id);
                        setHelpSubject("");
                        setHelpMessage("");
                        setHelpPriority("Medium");
                      }}
                    >
                      Raise Ticket
                    </button>
                  </>
                )}
              </div>
            </div>,
            document.body
          )}

          <div className="sidebar__footer">
            <p>© 2025 AMS Hospital</p>
            <p>All rights reserved.</p>
          </div>
        </aside>
      </section>

      {/* middle: doctor-specific working content */}
      <section className="doc_main">
        <Suspense fallback={<div className="section-loading">Loading…</div>}>
          <ActiveSection />
        </Suspense>
      </section>

      {/* right: permanent clock + calendar  */}
      <section className="doc_aside">
        <aside className="aside-rail">

          <div className="panel--quick-actions">
            {/* <div className="panel__header">
              <h2>Quick Actions</h2>
            </div> */}
            <div className="aside-qa-grid">
              {ASIDE_QUICK_ACTIONS.map((a) => (
                <button className={`aside-qa-item ${a.cls}`} key={a.label}>
                  <span className="aside-qa-icon">
                    <a.icon size={16} strokeWidth={2} />
                  </span>
                  <span className="aside-qa-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel--calendar-v2">
            <div className="cal-card__clock-block">
              <div className="cal-card__info">
                <div className="cal-card__digital-v2">
                  <span className="cal-card__time-v2">
                    {hh}:{mm}
                    <span className="cal-card__ampm-v2">{ampm}</span>
                  </span>
                </div>
                <span className="cal-card__date-v2">{dayName}, {fullDate}</span>
              </div>
              <svg className="cal-card__analog" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="47" className="analog-face" />
                {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
                  <line
                    key={i}
                    x1="50" y1="7" x2="50" y2="14"
                    className="analog-tick"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
                <line x1="50" y1="50" x2="50" y2="28" className="analog-hand analog-hand--hour" transform={`rotate(${hourAngle} 50 50)`} />
                <line x1="50" y1="50" x2="50" y2="18" className="analog-hand analog-hand--min" transform={`rotate(${minAngle} 50 50)`} />
                <line x1="50" y1="50" x2="50" y2="14" className="analog-hand analog-hand--sec" transform={`rotate(${secAngle} 50 50)`} />
                <circle cx="50" cy="50" r="2.5" className="analog-center" />
              </svg>
            </div>

            <div className="cal-card__hr" />
            
            <div className="calendar-nav__arrows">
              <button aria-label="Previous month"><ChevronLeft size={15} /></button>
              <span className="cal-card__month-nav">{monthLabel}</span>
              <button aria-label="Next month"><ChevronRight size={15} /></button>
            </div>

            <div className="calendar-grid ">
              {WEEKDAYS.map((d) => (
                <span className="calendar-grid__weekday" key={d}>{d}</span>
              ))}
              {calendarCellsFull.map((c, i) => (
                <span
                  key={i}
                  className={
                    "calendar-grid__day" +
                    (c.muted ? " calendar-grid__day--muted" : "") +
                    (!c.muted && c.day === todayDate ? " calendar-grid__day--selected" : "")
                  }
                >
                  {c.day}
                </span>
              ))}
            </div>
          </div>
          
        </aside>
      </section>
    </div>
  );
}

export default DocHome;