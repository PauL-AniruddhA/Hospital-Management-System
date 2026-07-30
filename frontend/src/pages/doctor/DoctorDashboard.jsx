import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/DashBoard/Doctor/doctor-home.css";
import { NavLink } from "react-router-dom";
import doc from "../../assets/home/doc3.png";
import {
  Cross, LayoutDashboard, Users, FileText, Stethoscope, Pill, FlaskConical,
  CalendarDays, Bell, BarChart3, UserRound, Headset, Settings as SettingsIcon,
  Menu, Search, MessageCircle, ChevronDown, CheckCircle2, Clock, ChevronLeft,
  ChevronRight, MoreVertical, AlertTriangle, UserPlus, BedDouble, ClipboardCheck,
  Star, Timer, ClipboardList, PlayCircle, FileCheck2, NotebookPen, CheckSquare
} from "lucide-react";

/* ---------------- static nav / reference data ---------------- */

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patient-records", label: "Patient Records", icon: FileText },
  { to: "/consultation", label: "Consultation", icon: Stethoscope },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/performance", label: "Performance", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

/* Sidebar quick actions — one-tap doctor actions, not routes, so they
   live as buttons under a labeled section rather than as NavLinks. */
const QUICK_ACTIONS = [
  { icon: Stethoscope, label: "Start Consultation", iconClass: "qa-icon--blue" },
  { icon: Pill, label: "Prescription", iconClass: "qa-icon--green" },
  { icon: FlaskConical, label: "Order Lab Test", iconClass: "qa-icon--purple" },
  { icon: BedDouble, label: "Admit Patient", iconClass: "qa-icon--red" },
];

const QUEUE = [
  { id: "01", name: "John Doe", pid: "AMS-2025-0012", time: "09:30 AM", meta: "20 mins ago", reason: "Follow-up", dept: "Hypertension", status: "waiting", patientImage: doc },
  { id: "02", name: "Priyanghu Kaur", pid: "AMS-2025-0013", time: "09:45 AM", meta: "5 mins ago", reason: "Fever & Cold", dept: "General", status: "checkedin", patientImage: doc },
  { id: "03", name: "Priya Mehta", pid: "AMS-2025-0014", time: "10:00 AM", meta: "In 15 mins", reason: "Chest Pain", dept: "Cardiology", status: "upcoming", patientImage: doc },
  { id: "04", name: "Ramesh Kumar", pid: "AMS-2025-0015", time: "10:20 AM", meta: "In 35 mins", reason: "Diabetes Checkup", dept: "Endocrinology", status: "upcoming", patientImage: doc },
  { id: "05", name: "Sneha Kapoor", pid: "AMS-2025-0016", time: "10:40 AM", meta: "In 55 mins", reason: "Thyroid Follow-up", dept: "Endocrinology", status: "upcoming", patientImage: doc },
];

const STATUS_LABEL = { waiting: "Waiting", checkedin: "Checked In", upcoming: "Upcoming" };

/* Today's Schedule now lives in the permanent aside rail, under the
   calendar — kept compact since the rail is narrow. */
const SCHEDULE = [
  { time: "09:00 AM", title: "Consultation", patient: "Michael Brown", status: "completed" },
  { time: "09:30 AM", title: "Consultation", patient: "John Doe", status: "completed" },
  { time: "10:00 AM", title: "Consultation", patient: "Aniruddha Paul", status: "progress" },
  { time: "10:30 AM", title: "Follow-up", patient: "Priya Mehta", status: "upcoming" },
  { time: "11:00 AM", title: "Consultation", patient: "Ramesh Kumar", status: "upcoming" },
  { time: "11:30 AM", title: "Consultation", patient: "Sneha Kapoor", status: "upcoming" },
];

const SCHEDULE_STATUS_LABEL = { completed: "Completed", progress: "In Progress", upcoming: "Upcoming" };

/* Persistent worklist — stays until resolved. Not the same data as
   bell notifications (those are transient events, see below). */
const ACTION_ITEMS = [
  { id: "a1", tier: "critical", icon: AlertTriangle, title: "Emergency patient admitted", subtitle: "Bed 4 · needs triage now", cta: "Review" },
  { id: "a2", tier: "clinical", icon: FlaskConical, title: "Abnormal lab flagged", subtitle: "Aniruddha Paul · CBC out of range", cta: "View report" },
  { id: "a3", tier: "admin", icon: Pill, title: "2 prescriptions to sign", subtitle: "Ramesh Kumar, Sneha Kapoor", cta: "Sign" },
  { id: "a4", tier: "admin", icon: UserPlus, title: "1 referral to approve", subtitle: "Priya Mehta → Cardiology", cta: "Approve" },
];

/* Transient event log — belongs ONLY in the bell dropdown.
   Badge count is derived from this array's length, never hand-typed. */
const NOTIFICATIONS = [
  { icon: CalendarDays, title: "Appointment cancelled", subtitle: "John Smith cancelled his 2:00 PM slot", time: "25 mins ago" },
  { icon: FileText, title: "New record shared", subtitle: "Referral note added for Priya Mehta", time: "40 mins ago" },
  { icon: CheckCircle2, title: "Lab sync complete", subtitle: "3 reports imported from the lab system", time: "1 hr ago" },
];

const PERFORMANCE = [
  { icon: CheckCircle2, iconClass: "perf-icon--green", value: "142", label: "Patients Seen", trend: "+12%", up: true },
  { icon: ClipboardCheck, iconClass: "perf-icon--purple", value: "128", label: "Prescriptions", trend: "+8%", up: true },
  { icon: FlaskConical, iconClass: "perf-icon--blue", value: "96", label: "Lab Requests", trend: "+15%", up: true },
  { icon: Star, iconClass: "perf-icon--orange", value: "4.8/5", label: "Avg. Rating", trend: "+0.3", up: true },
  { icon: Timer, iconClass: "perf-icon--teal", value: "18 min", label: "Avg. Time", trend: "-2 min", up: false },
];

// const CALENDAR_DAYS = [
//   [null, null, null, null, null, null, 1],
//   [2, 3, 4, 5, 6, 7, 8],
//   [9, 10, 11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20, 21, 22],
//   [23, 24, 25, 26, 27, 28, 29],
//   [30, 1, 2, 3, 4, null, null],
// ];

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

function DoctorDashboard() {
  
  const [now, setNow] = useState(new Date());
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // single ticking clock for the permanent right-rail widget
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // close the notification dropdown on outside click
  useEffect(() => {
    function onClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const nextPatient = QUEUE.find((p) => p.status === "checkedin") || QUEUE.find((p) => p.status === "waiting");

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

  const STATS = [
    { icon: CalendarDays, iconClass: "stat-icon--blue", label: "Today's Appointments", value: 24, action: "View all" },
    { icon: Users, iconClass: "stat-icon--green", label: "Waiting Patients", value: QUEUE.filter((p) => p.status === "waiting" || p.status === "checkedin").length, action: "View queue" },
    { icon: AlertTriangle, iconClass: "stat-icon--red", label: "Emergency Cases", value: 2, action: "View now" },
    { icon: ClipboardList, iconClass: "stat-icon--purple", label: "Action Items Open", value: ACTION_ITEMS.length, action: "View all" },
  ];

  return (
    <div className="doctors-home">
      {/* topbar */}
      <header className="doc_topbar">
        <div className="doc_topbar_brand">
          <span className="doc_topbar_brand-icon">
            <Cross size={20} strokeWidth={2.5} />
          </span>
          <div className="doc_topbar_brand-text">
            <span className="doc_topbar_brand-name">AMS HOSPITAL</span>
            <span className="doc_topbar_brand-tagline">Care • Compassion • Excellence</span>
          </div>
        </div>

        <button className="doc_topbar__menu-btn" aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>

        <div className="topbar__search">
          <Search size={16} className="topbar__search-icon" />
          <input type="text" placeholder="Search patients by name, ID or phone..." />
          <kbd className="topbar__search-kbd">Ctrl + K</kbd>
        </div>

        {/* <div className="topbar__clock">
          <span className="topbar__clock-time">{timeStr}</span>
          <span className="topbar__clock-date">{dateStr}</span>
        </div> */}

        <div className="topbar__actions">
          <button className="topbar__icon-btn" aria-label="Messages">
            <MessageCircle size={18} />
          </button>

          {/* Single source of truth: badge + dropdown both read NOTIFICATIONS */}
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

          <div className="topbar__profile">
            <img className="topbar__avatar" src={doc} alt="Dr. Rajesh Sharma" />
            <div className="topbar__profile-text">
              <span className="topbar__profile-name">Dr. Rajesh Sharma</span>
              <span className="topbar__profile-role">Cardiologist</span>
            </div>
            <ChevronDown size={16} className="topbar__profile-chevron" />
          </div>
        </div>
      </header>

      {/* left: doctor-specific nav + quick actions */}
      <section className="doc_sidebar">
        <aside className="sidebar">
          <nav className="sidebar__nav">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => "sidebar__link" + (isActive ? " sidebar__link--active" : "")}
              >
                <Icon size={18} strokeWidth={2} className="sidebar__link-icon" />
                <span className="sidebar__link-label">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* <div className="sidebar__quick-actions">
            <span className="sidebar__section-label">Quick Actions</span>
            <div className="sidebar__qa-list">
              {QUICK_ACTIONS.map((a) => (
                <button className="sidebar__qa-item" key={a.label}>
                  <span className={`sidebar__qa-icon ${a.iconClass}`}>
                    <a.icon size={16} strokeWidth={2} />
                  </span>
                  <span className="sidebar__qa-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div> */}

          <div className="sidebar__help">
            <span className="sidebar__help-icon">
              <Headset size={18} strokeWidth={2} />
            </span>
            <div className="sidebar__help-text">
              <span className="sidebar__help-title">Need Help?</span>
              <span className="sidebar__help-subtitle">Contact IT Support</span>
            </div>
          </div>

          <div className="sidebar__footer">
            <p>© 2025 AMS Hospital</p>
            <p>All rights reserved.</p>
          </div>
        </aside>
      </section>

      {/* middle: doctor-specific working content */}
      <section className="doc_main">
        {/* <div className="dashboard">
          <section className="stat-row">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className={`stat-icon ${s.iconClass}`}>
                  <s.icon size={20} strokeWidth={2} />
                </span>
                <span className="stat-card__label">{s.label}</span>
                <span className="stat-card__value">{s.value}</span>
                <a className="stat-card__action" href="#">
                  {s.action} <ChevronRight size={13} />
                </a>
              </div>
            ))}
          </section>

          {nextPatient && (
            <section className="next-patient">
              <div className="next-patient__info">
                <span className="next-patient__label">Next patient</span>
                <span className="next-patient__name">
                  {nextPatient.name} · {nextPatient.reason} · {nextPatient.meta}
                </span>
              </div>
              <button className="next-patient__cta">
                <PlayCircle size={16} /> Start consultation
              </button>
            </section>
          )}

          <section className="dashboard__grid">
            <div className="panel panel--queue">
              <div className="panel__header">
                <h2><Users size={16} className="panel__header-icon" /> Patient Queue</h2>
                <a href="#">View All</a>
              </div>
              <div className="queue-list">
                {QUEUE.map((p) => (
                  <div className="queue-row" key={p.pid}>
                    <span className="queue-row__id">{p.id}</span>
                    <img className="queue-row__avatar" src={p.patientImage} alt={p.name} />
                    <div className="queue-row__info">
                      <span className="queue-row__name">{p.name}</span>
                      <span className="queue-row__pid">{p.pid}</span>
                    </div>
                    <div className="queue-row__time">
                      <span>{p.time}</span>
                      <span className="queue-row__meta">{p.meta}</span>
                    </div>
                    <div className="queue-row__reason">
                      <span>{p.reason}</span>
                      <span className="queue-row__dept">{p.dept}</span>
                    </div>
                    <span className={`badge badge--${p.status}`}>{STATUS_LABEL[p.status]}</span>
                    <button className="queue-row__menu" aria-label="More options">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel panel--schedule">
              <div className="panel__header">
                <h2>
                  <CalendarDays size={16} className="panel__header-icon" /> Today's Schedule
                </h2>
                <a href="#">View Calendar</a>
              </div>
              <div className="timeline">
                {SCHEDULE.map((item, i) => (
                  <div className="timeline-row" key={i}>
                    <span className="timeline-row__time">{item.time}</span>
                    <span className={`timeline-row__dot timeline-row__dot--${item.status}`} />
                    <div className="timeline-row__info">
                      <span className="timeline-row__title">{item.title}</span>
                      <span className="timeline-row__patient">Patient: {item.patient}</span>
                    </div>
                    <span className={`badge badge--${item.status}`}>
                      {SCHEDULE_STATUS_LABEL[item.status]}
                    </span>
                  </div>
                ))}
              </div>
              <button className="panel__full-btn">View Full Schedule</button>
            </div>

            <div className="panel panel--actioncenter">
              <div className="panel__header">
                <h2><ClipboardList size={16} className="panel__header-icon" /> Action Center</h2>
                <a href="#">View All</a>
              </div>
              <div className="action-list">
                {ACTION_ITEMS.map((a) => (
                  <div className={`action-item action-item--${a.tier}`} key={a.id}>
                    <span className="action-item__icon"><a.icon size={16} /></span>
                    <div className="action-item__info">
                      <span className="action-item__title">{a.title}</span>
                      <span className="action-item__subtitle">{a.subtitle}</span>
                    </div>
                    <button className="action-item__cta">{a.cta}</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="perf-strip">
            <div className="perf-strip__header">
              <span>This Month</span>
              <a href="/performance">Full report <ChevronRight size={13} /></a>
            </div>
            <div className="perf-strip__row">
              {PERFORMANCE.map((p) => (
                <div className="perf-strip__item" key={p.label}>
                  <span className={`perf-icon ${p.iconClass}`}>
                    <p.icon size={16} strokeWidth={2} />
                  </span>
                  <span className="perf-strip__value">{p.value}</span>
                  <span className="perf-strip__label">{p.label}</span>
                </div>
              ))}
            </div>
          </section>
          
        </div> */}
      </section>

      {/* right: permanent clock + calendar  */}
      <section className="doc_aside">
        <aside className="aside-rail">
          {/* <div className="panel panel--clock">
            <span className="clock-time">{timeStr}</span>
            <span className="clock-date">{dateStr}</span>
          </div> */}

          <div className="panel panel--quick-actions">
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

          <div className="panel panel--calendar-v2">
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
                {[0, 3, 6, 9].map((i) => (
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

export default DoctorDashboard;