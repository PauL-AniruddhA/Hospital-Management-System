import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/DashBoard/Doctor/doctor-home.css";
import { NavLink } from "react-router-dom";
import doc from "../../assets/home/doc3.png";
import {
  Cross, LayoutDashboard, Users, FileText, Stethoscope, Pill, FlaskConical,
  CalendarDays, Bell, BarChart3, UserRound, Headset, Settings as SettingsIcon,
  Menu, Search, MessageCircle, ChevronDown, CheckCircle2, Clock, ChevronLeft,
  ChevronRight, MoreVertical, AlertTriangle, UserPlus, BedDouble, ClipboardCheck,
  Star, Timer, ClipboardList, PlayCircle,
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

  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
  const monthLabel = now.toLocaleDateString([], { month: "long", year: "numeric" });
  const todayDate = now.getDate();

  const calendarCells = useMemo(() => getMonthGrid(now), [now.getMonth(), now.getFullYear()]);

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

        <div className="topbar__clock">
          <span className="topbar__clock-time">{timeStr}</span>
          <span className="topbar__clock-date">{dateStr}</span>
        </div>

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

          <div className="sidebar__quick-actions">
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
          </div>

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
        <div className="dashboard">
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

          {/* Performance: condensed strip only — full breakdown lives on /performance */}
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
        </div>
      </section>

      {/* right: permanent clock + calendar + today's schedule rail */}
      <section className="doc_aside">
        <aside className="aside-rail">
          {/* <div className="panel panel--clock">
            <span className="clock-time">{timeStr}</span>
            <span className="clock-date">{dateStr}</span>
          </div> */}

          <div className="panel panel--calendar">
            <div className="panel__header">
              <h2><CalendarDays size={16} className="panel__header-icon" /> Calendar</h2>
            </div>
            <div className="calendar-nav">
              <span>{monthLabel}</span>
              <div className="calendar-nav__arrows">
                <button aria-label="Previous month"><ChevronLeft size={15} /></button>
                <button aria-label="Next month"><ChevronRight size={15} /></button>
              </div>
            </div>
            <div className="calendar-grid">
              {WEEKDAYS.map((d) => (
                <span className="calendar-grid__weekday" key={d}>{d}</span>
              ))}
              {calendarCells.map((d, i) => (
                <span
                  key={i}
                  className={
                    "calendar-grid__day" +
                    (d === todayDate ? " calendar-grid__day--selected" : "") +
                    (d === null ? " calendar-grid__day--empty" : "")
                  }
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="panel panel--schedule">
            <div className="panel__header">
              <h2><Clock size={16} className="panel__header-icon" /> Today's Schedule</h2>
              <a href="#">Full view</a>
            </div>
            <div className="mini-schedule-list">
              {SCHEDULE.map((item, i) => (
                <div className="mini-schedule-row" key={i}>
                  <span className={`mini-schedule-dot mini-schedule-dot--${item.status}`} />
                  <div className="mini-schedule-info">
                    <div className="mini-schedule-top">
                      <span className="mini-schedule-time">{item.time}</span>
                      <span className={`badge badge--${item.status}`}>
                        {SCHEDULE_STATUS_LABEL[item.status]}
                      </span>
                    </div>
                    <span className="mini-schedule-patient">
                      {item.patient} · {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default DoctorDashboard;