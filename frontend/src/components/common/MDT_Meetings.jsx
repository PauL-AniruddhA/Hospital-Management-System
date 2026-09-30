import React, { useState } from "react";
import {
  Search,
  Bell,
  Calendar as CalendarIcon,
  Plus,
  Link2,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Download,
  ArrowUpDown,
  SlidersHorizontal,
  Play,
} from "lucide-react";
import "../../styles/Components/Common/MDT_Meetings.css";


/**
 * MeetingsDashboard
 * A fully responsive recreation of the "Meetings" dashboard layout.
 * All visual styling lives in MeetingsDashboard.css — this file is
 * structure and data only.
 */
 
const CIRCLE_COLORS = ["#F5A88E", "#F2C879", "#7FB6A8", "#8FA7D9", "#C79FD9"];
 
function AvatarStack({ count = 4 }) {
  return (
    <div className="avatar-stack">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="avatar-stack__item"
          style={{ backgroundColor: CIRCLE_COLORS[i % CIRCLE_COLORS.length] }}
        />
      ))}
      <div className="avatar-stack__more">+2</div>
    </div>
  );
}
 
function TeamTag({ color, label }) {
  return (
    <div className="team-tag">
      <span className="team-tag__dot" style={{ backgroundColor: color }}>
        <span className="team-tag__dot-inner" />
      </span>
      <span className="team-tag__label">{label}</span>
    </div>
  );
}
 
const ACTION_CARDS = [
  {
    icon: Plus,
    title: "Start an Instant Meeting",
    desc: "Launch a meeting immediately with your team.",
  },
  {
    icon: CalendarIcon,
    title: "Set a Scheduled Meeting",
    desc: "Pick a date and time to notify your team in advance.",
  },
  {
    icon: Link2,
    title: "Create & Share Later",
    desc: "Generate a link to use anytime later.",
  },
  {
    icon: FolderOpen,
    title: "Meeting History",
    desc: "Access recordings, notes, and attendance logs.",
  },
];
 
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
 
// Feb 2025 calendar grid (Mon-first), with prev/next month spillover days.
const CALENDAR_ROWS = [
  [27, 28, 29, 30, 31, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 1, 2],
];
const CURRENT_MONTH_ROWS = new Set([1, 2, 3, 4]); // rows fully/partly in Feb
const DOT_DAYS = { green: [6, 11, 12, 14], red: [20, 21, 26, 27] };
const SELECTED_DAY = 19;
 
function MiniCalendar() {
  return (
    <div className="calendar">
      <div className="calendar__head">
        <h3 className="calendar__title">Meeting Calendar</h3>
        <button className="calendar__more">
          <MoreHorizontal size={16} />
        </button>
      </div>
 
      <div className="calendar__nav">
        <button className="calendar__nav-btn">
          <ChevronLeft size={14} />
        </button>
        <span className="calendar__month">February 2025</span>
        <button className="calendar__nav-btn">
          <ChevronRight size={14} />
        </button>
      </div>
 
      <div className="calendar__grid">
        {WEEKDAYS.map((d) => (
          <div key={d} className="calendar__weekday">
            {d}
          </div>
        ))}
 
        {CALENDAR_ROWS.map((row, ri) =>
          row.map((day, di) => {
            const inMonth =
              CURRENT_MONTH_ROWS.has(ri) &&
              !(ri === 0 && di < 5) &&
              !(ri === 4 && di > 4);
            const isSelected = inMonth && day === SELECTED_DAY;
            const hasGreenDot = inMonth && DOT_DAYS.green.includes(day);
            const hasRedDot = inMonth && DOT_DAYS.red.includes(day);
 
            const dayClass = [
              "calendar__day",
              isSelected ? "calendar__day--selected" : "",
              !inMonth ? "calendar__day--muted" : "",
            ]
              .filter(Boolean)
              .join(" ");
 
            const dotClass = [
              "calendar__dot",
              hasGreenDot ? "calendar__dot--green" : "",
              hasRedDot ? "calendar__dot--red" : "",
            ]
              .filter(Boolean)
              .join(" ");
 
            return (
              <div key={`${ri}-${di}`} className="calendar__cell">
                <button className={dayClass}>{day}</button>
                <span className={dotClass} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
 
const MEETINGS = [
  {
    title: "Design Review",
    subtitle: "ShopEase - Redesign E-Commerce Dashboard",
    team: "Kobam Design",
    teamColor: "#EF6461",
    date: "February 20, 2025",
    time: "09:00 AM",
  },
  {
    title: "Design Review",
    subtitle: "Fina - Finance Mobile App",
    team: "D'Sign Creative",
    teamColor: "#3FA796",
    date: "February 20, 2025",
    time: "11:30 AM",
  },
  {
    title: "Final Handoff Review",
    subtitle: "TravelBuddy - Booking Experience Revamp",
    team: "Creative Hub",
    teamColor: "#6C8FE0",
    date: "February 20, 2025",
    time: "04:00 PM",
  },
  {
    title: "UX Audit Session",
    subtitle: "ShopEase - Redesign E-Commerce Dashboard",
    team: "Kobam Design",
    teamColor: "#EF6461",
    date: "February 21, 2025",
    time: "11:00 AM",
  },
  {
    title: "Wireframe Feedback",
    subtitle: "Health+ - Telemedicine Platform",
    team: "Creative Hub",
    teamColor: "#6C8FE0",
    date: "February 21, 2025",
    time: "02:30 PM",
  },
];

export default function MDT_Meetings   () {
const [query, setQuery] = useState("");
 
  return (
    <section className="dashboard">
      <main className="main">
        {/* Page title row */}
        <div className="page-head">
          <div>
            <h1 className="page-head__title">Meetings</h1>
            <p className="page-head__subtitle">
              Plan meetings, check schedules, and stay connected with your team.
            </p>
          </div>
          <button className="export-btn">
            <Download size={16} />
            Export
          </button>
        </div>
 
        {/* Action cards + calendar */}
        <div className="top-grid">
          <div className="cards-grid">
            {ACTION_CARDS.map(({ icon: Icon, title, desc }, i) => (
              <button
                key={title}
                className={
                  i === 0 ? "action-card action-card--active" : "action-card"
                }
              >
                <span className="action-card__icon">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="action-card__title">{title}</p>
                  <p className="action-card__desc">{desc}</p>
                </div>
              </button>
            ))}
          </div>
 
          <MiniCalendar />
        </div>
 
        {/* Meeting schedule */}
        <section className="schedule">
          <div className="schedule__head">
            <h2 className="schedule__title">Meeting Schedule</h2>
            <div className="schedule__controls">
              <div className="schedule__search">
                <Search size={14} color="#94a3b8" />
                <input placeholder="Search meeting..." />
              </div>
              <button className="pill-btn">
                All Teams
                <ChevronRight size={14} style={{ transform: "rotate(90deg)" }} />
              </button>
              <button className="icon-btn">
                <ArrowUpDown size={14} />
              </button>
              <button className="icon-btn">
                <SlidersHorizontal size={14} />
              </button>
            </div>
          </div>
 
          <div className="schedule__col-head">
            <span>Meeting</span>
            <span>Team</span>
            <span>Date</span>
            <span>Time</span>
            <span>Participant</span>
            <span />
          </div>
 
          <div className="schedule__rows">
            {MEETINGS.map((m, i) => (
              <div key={i} className="schedule__row">
                <div>
                  <p className="schedule__row-title">{m.title}</p>
                  <p className="schedule__row-subtitle">{m.subtitle}</p>
                </div>
 
                <div className="schedule__team">
                  <TeamTag color={m.teamColor} label={m.team} />
                </div>
 
                <div className="schedule__cell">
                  <span className="schedule__mobile-label">Date:</span>
                  {m.date}
                </div>
                <div className="schedule__cell">
                  <span className="schedule__mobile-label">Time:</span>
                  {m.time}
                </div>
 
                <div className="schedule__participant-row">
                  <AvatarStack />
                  <button className="play-btn play-btn--mobile">
                    <Play size={14} fill="#fff" />
                  </button>
                </div>
 
                <button className="play-btn play-btn--desktop">
                  <Play size={14} fill="#fff" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}



