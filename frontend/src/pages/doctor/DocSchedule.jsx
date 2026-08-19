import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/Doctor/Doctor-Schedule.css";

import {
  ChevronLeft, ChevronRight, CalendarDays, Filter, Plus, UserRound, Video, FlaskConical, Users, ClipboardList, HeartPulse, Coffee, BriefcaseMedical, Stethoscope,
  Repeat,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const ROW_MIN = 30;
// const ROW_HEIGHT = 40.5;
const VISIBLE_ROWS = 10; // 5 hours visible
const DAY_START_HOUR = 10;
const DAY_END_HOUR = 20.5;
const TOTAL_ROWS = ((DAY_END_HOUR - DAY_START_HOUR) * 60) / ROW_MIN;
const DAY_LABELS = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];


const TYPE_STYLE = {
  appointment: { icon: UserRound, color: "blue" },

  followup: { icon: ClipboardList, color: "green" },

  consultation: { icon: Stethoscope, color: "purple" },

  diagnostic: { icon: FlaskConical, color: "orange" },

  video: { icon: Video, color: "pink" },

  meeting: { icon: Users, color: "yellow" },

  admin: { icon: BriefcaseMedical, color: "blue" },

  break: { icon: Coffee, color: "yellow" },
};

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDayDate(date) { 
  return date.getDate();
}

function formatRange(weekStart) {
  const end = addDays(weekStart, 6);
  const startMonth = weekStart.toLocaleDateString([], { month: "short" });
  const endMonth = end.toLocaleDateString([], { month: "short" });
  const startYear = weekStart.getFullYear();
  const endYear = end.getFullYear();
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${weekStart.getDate()} – ${end.getDate()}, ${endYear}`;
  }

  return `${startMonth} ${weekStart.getDate()}, ${startYear} – ${endMonth} ${end.getDate()}, ${endYear}`;
}

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart( 2, "0" )} ${suffix}`;
}

function timeToRow(time) {
  const [hour, minute] = time.split(":").map(Number);
  return (
    ((hour - DAY_START_HOUR) * 60 + minute) / ROW_MIN
  );
}

function createTimeLabel(rowIndex) {
  const totalMinutes = rowIndex * ROW_MIN;
  const hour = DAY_START_HOUR + Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return { 
    hour, 
    minute,
    label: `${displayHour}:${String(minute).padStart(2, "0")}`,
    ampm: hour >= 12 ? "PM" : "AM",
    isHour: minute === 0,
  };
}

const EVENTS = [
  {
    id: 1,
    dayOffset: 0,
    start: "10:00",
    duration: 30,
    type: "appointment",
    title: "Rahul Das",
    subtitle: "Follow-up",
  },

  {
    id: 2,
    dayOffset: 0,
    start: "11:00",
    duration: 30,
    type: "consultation",
    title: "Ananya Sharma",
    subtitle: "Consultation",
  },

  {
    id: 3,
    dayOffset: 0,
    start: "12:30",
    duration: 30,
    type: "diagnostic",
    title: "Arjun Mehta",
    subtitle: "Cardiology Review",
  },

  {
    id: 4,
    dayOffset: 0,
    start: "12:00",
    duration: 30,
    type: "followup",
    title: "Neha Verma",
    subtitle: "Follow-up",
  },

  {
    id: 5,
    dayOffset: 0,
    start: "14:00",
    duration: 60,
    type: "meeting",
    title: "MDT Meeting",
    subtitle: "Multidisciplinary discussion",
  },

  /* ---------------- TUESDAY ---------------- */

  {
    id: 6,
    dayOffset: 1,
    start: "07:30",
    duration: 30,
    type: "followup",
    title: "Priya Das",
    subtitle: "Follow-up",
  },

  {
    id: 7,
    dayOffset: 1,
    start: "08:30",
    duration: 30,
    type: "appointment",
    title: "Sourav Roy",
    subtitle: "Consultation",
  },

  {
    id: 8,
    dayOffset: 1,
    start: "11:00",
    duration: 30,
    type: "video",
    title: "Mitali Gupta",
    subtitle: "ECG Review",
  },

  {
    id: 9,
    dayOffset: 1,
    start: "14:00",
    duration: 60,
    type: "consultation",
    title: "Training Session",
    subtitle: "Resident training",
  },

  /* ---------------- WEDNESDAY ---------------- */

  {
    id: 10,
    dayOffset: 2,
    start: "07:00",
    duration: 30,
    type: "appointment",
    title: "Amit Paul",
    subtitle: "Follow-up",
  },

  {
    id: 11,
    dayOffset: 2,
    start: "07:30",
    duration: 30,
    type: "followup",
    title: "Rina Das",
    subtitle: "New Consultation",
  },

  {
    id: 12,
    dayOffset: 2,
    start: "09:00",
    duration: 30,
    type: "diagnostic",
    title: "Kunal Sharma",
    subtitle: "Cardiology Review",
  },

  {
    id: 13,
    dayOffset: 2,
    start: "10:30",
    duration: 30,
    type: "video",
    title: "Sneha Roy",
    subtitle: "Consultation",
  },

  {
    id: 14,
    dayOffset: 2,
    start: "13:00",
    duration: 60,
    type: "break",
    title: "Lunch Break",
    subtitle: "01:00 – 02:00 PM",
  },

  /* ---------------- THURSDAY ---------------- */

  {
    id: 15,
    dayOffset: 3,
    start: "08:00",
    duration: 30,
    type: "appointment",
    title: "Vivek Sharma",
    subtitle: "Follow-up",
  },

  {
    id: 16,
    dayOffset: 3,
    start: "09:30",
    duration: 30,
    type: "followup",
    title: "Neha Singh",
    subtitle: "Consultation",
  },

  {
    id: 17,
    dayOffset: 3,
    start: "11:30",
    duration: 30,
    type: "appointment",
    title: "Rohit Verma",
    subtitle: "Follow-up",
  },

  {
    id: 18,
    dayOffset: 3,
    start: "14:00",
    duration: 60,
    type: "meeting",
    title: "Case Discussion",
    subtitle: "Clinical review",
  },

  /* ---------------- FRIDAY ---------------- */

  {
    id: 19,
    dayOffset: 4,
    start: "07:30",
    duration: 30,
    type: "appointment",
    title: "Rohan Das",
    subtitle: "Follow-up",
  },

  {
    id: 20,
    dayOffset: 4,
    start: "10:00",
    duration: 30,
    type: "diagnostic",
    title: "Pooja Sharma",
    subtitle: "Cardiology Review",
  },

  {
    id: 21,
    dayOffset: 4,
    start: "11:30",
    duration: 30,
    type: "followup",
    title: "Vijay Patel",
    subtitle: "Consultation",
  },

  {
    id: 22,
    dayOffset: 4,
    start: "14:00",
    duration: 60,
    type: "admin",
    title: "Admin Work",
    subtitle: "Documentation",
  },

  /* ---------------- SATURDAY ---------------- */

  {
    id: 23,
    dayOffset: 5,
    start: "08:00",
    duration: 30,
    type: "consultation",
    title: "Nitin Das",
    subtitle: "Consultation",
  },

  {
    id: 24,
    dayOffset: 5,
    start: "09:30",
    duration: 30,
    type: "appointment",
    title: "Kavya Singh",
    subtitle: "Follow-up",
  },

  {
    id: 25,
    dayOffset: 5,
    start: "14:00",
    duration: 60,
    type: "admin",
    title: "Admin Work",
    subtitle: "Hospital records",
  },

  /* ---------------- SUNDAY ---------------- */

  {
    id: 26,
    dayOffset: 6,
    start: "10:00",
    duration: 30,
    type: "followup",
    title: "Aditya Verma",
    subtitle: "Consultation",
  },

  {
    id: 27,
    dayOffset: 6,
    start: "11:30",
    duration: 30,
    type: "appointment",
    title: "Megha Roy",
    subtitle: "Follow-up",
  },

  {
    id: 28,
    dayOffset: 6,
    start: "14:00",
    duration: 60,
    type: "meeting",
    title: "Weekly Review",
    subtitle: "Department review",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function DocSchedule() {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [now, setNow] = useState(new Date());
  const [view, setView] = useState("week");
  const [filter, setFilter] = useState("all");
  const scrollRef = useRef(null);

  
  
  /* ---------------- current time ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getScheduleRowHeight = () => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--schedule-row-height");

    return parseFloat(value);
  };
  /* ---------------- days ---------------- */

  const weekDays = useMemo(() => {
    return DAY_LABELS.map((label, index) => ({
      label,
      date: addDays(weekStart, index),
    }));
  }, [weekStart]);

  /* ---------------- rows ---------------- */

  const rows = useMemo(() => {
    return Array.from(
      { length: TOTAL_ROWS },
      (_, index) => createTimeLabel(index)
    );
  }, []);

  /* ---------------- filtered events ---------------- */

  const filteredEvents = useMemo(() => {
    if (filter === "all") return EVENTS;
    return EVENTS.filter(
      (event) => event.type === filter
    );
  }, [filter]);

  /* ---------------- positioned events ---------------- */

  const eventsWithPosition = useMemo(() => {
    return filteredEvents
      .map((event) => {
        const startRow = timeToRow(
          event.start
        );

        const span = event.duration / ROW_MIN;

        return {
          ...event,
          startRow,
          span,
        };
      })
      .filter(
        (event) =>
          event.startRow >= 0 &&
          event.startRow < TOTAL_ROWS
      );
  }, [filteredEvents]);

  /* ---------------- appointment counts ---------------- */

  const appointmentCounts = useMemo(() => {
    return DAY_LABELS.map((_, index) => {
      return EVENTS.filter(
        (event) =>
          event.dayOffset === index &&
          !["break", "meeting", "admin"].includes(
            event.type
          )
      ).length;
    });
  }, []);

  /* ---------------- today ---------------- */

  const todayColumn = weekDays.findIndex(
    (day) => isSameDate(day.date, now)
  );

  const todayRow = useMemo(() => {
    const minutes =
      (now.getHours() - DAY_START_HOUR) * 60 +
      now.getMinutes();

    const row = minutes / ROW_MIN;

    if (row < 0 || row >= TOTAL_ROWS) {
      return null;
    }

    return row;
  }, [now]);

  /* ---------------- initial scroll ---------------- */

  useEffect(() => {
    if (!scrollRef.current) return;

    const minutes =
      (now.getHours() - DAY_START_HOUR) *
        60 +
      now.getMinutes();

    const row = minutes / ROW_MIN;

    const target =
      Math.max(
        0,
        Math.min(
          TOTAL_ROWS - VISIBLE_ROWS,
          Math.floor(row) - 2
        )
      );

    scrollRef.current.scrollTop =
      target * getScheduleRowHeight();
  }, []);

  /* ---------------- handlers ---------------- */

  const previousWeek = () => {
    setWeekStart((current) =>
      addDays(current, -7)
    );
  };

  const nextWeek = () => {
    setWeekStart((current) =>
      addDays(current, 7)
    );
  };

  const goToday = () => {
    setWeekStart(getMonday(new Date()));
  };

  return (
    <section className="sched">
      {/* <div className="sched__header">

        <div className="sched__heading">

          <div className="sched__heading-icon">
            <CalendarDays size={20} />
          </div>

          <div>
            <h1 className="sched__title">
              Schedule
            </h1>

            <p className="sched__subtitle">
              Manage your appointments and daily
              consultations
            </p>
          </div>

        </div>

        <button className="sched__new-btn">
          <Plus size={17} />
          New Appointment
        </button>

      </div> */}

      <div className="sched__toolbar">
        <div className="sched__view-switch">
          <button className={ view === "day" ? "is-active" : "" } onClick={() => setView("day")}>
            Day
          </button>

          <button className={ view === "week" ? "is-active" : "" } onClick={() => setView("week")}>
            Week
          </button>

          <button className={ view === "month" ? "is-active" : "" } onClick={() => setView("month")}>
            Month
          </button>

        </div>

        <div className="sched__date-navigation">

          <button className="sched__nav-btn" onClick={previousWeek} >
            <ChevronLeft size={17} />
          </button>

          <button className="sched__date-btn" onClick={goToday} >
            <span>
              {formatRange(weekStart)}
            </span>

            <CalendarDays size={15} />
          </button>

          <button className="sched__nav-btn" onClick={nextWeek} >
            <ChevronRight size={17} />
          </button>

        </div>

        <button className="sched__filter-btn">
          <span>All Appointments</span>
          <Filter size={14} />
        </button>

      </div>


      <div className="sched__card">
        <div className="sched__daybar">
          <div className="sched__time-header"> TIME </div>

          {weekDays.map((day, index) => {
            const isToday = isSameDate(day.date, now);
            return (
              <div key={day.label} className={`sched__daycell ${ isToday ? "sched__daycell--today" : "" }`}>

                <span className="sched__day-name">
                  {day.label}
                </span>

                <span className="sched__day-date">
                  {formatDayDate(day.date)}
                </span>

                <span className="sched__day-count">
                  <i/>
                  {appointmentCounts[index]} Appts
                </span>

              </div>
            );
          })}

        </div>

        {/* GRID */}

        <div ref={scrollRef} className="sched__scroll" >
          <div className="sched__grid" style={{ gridTemplateRows: `repeat(${TOTAL_ROWS}, var(--schedule-row-height))`}} >
            {/* BACKGROUND GRID */}
            {rows.map((time, rowIndex) => (
              <React.Fragment key={rowIndex}>

                <div className="sched__time-cell" style={{ gridColumn: 1, gridRow: rowIndex + 1 }}>
                  <span className={`sched__time-label ${!time.isHour ? "sched__time-label--minor" : ""}`}>
                    {time.label}
                    <small>{time.ampm}</small>
                  </span>
                </div>

                {weekDays.map((_, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={`sched__cell ${
                      time.isHour
                        ? "sched__cell--hour"
                        : ""
                    }`}
                    style={{
                      gridColumn:columnIndex + 2,
                      gridRow:
                        rowIndex + 1,
                    }}
                  />
                ))}

              </React.Fragment>
            ))}

            {/* =================================================
                CURRENT TIME
            ================================================= */}

            {todayRow !== null && todayColumn !== -1 && (
                <div
                  className="sched__now-line"
                  style={{
                    gridColumn:
                      todayColumn + 2,
                    gridRow: `${
                      Math.floor(todayRow) + 1
                    } / span 1`,
                    top: `${
                      (todayRow % 1) *
                      getScheduleRowHeight()
                    }px`,
                  }}
                />
              )}

            {/* =================================================
                EVENTS
            ================================================= */}

            {eventsWithPosition.map((event) => {

              const config = TYPE_STYLE[event.type] || TYPE_STYLE.appointment;
              const Icon = config.icon;
              const isShort = event.duration === 30;

              return (
                <div
                  key={event.id}
                  className={`sched__event sched__event--${config.color} ${ isShort ? "sched__event--compact" : ""}`}
                  style={{ gridColumn: event.dayOffset + 2,
                    gridRow: `${ Math.round( event.startRow) + 1} / span ${ Math.max(1,Math.round(event.span)) }`,}} 
                >

                  <span className="sched__event-subtitle">
                    {event.subtitle}
                  </span>
                  <div className="sched__event-top">

                    <span className="sched__event-icon">
                      <Icon size={15} strokeWidth={2.2} />
                    </span>

                    <span className="sched__event-title">
                      {event.title}
                    </span>

                  </div>

                  <span className="sched__event-time">
                    {formatTime(event.start)}
                    {" – "}
                    {formatTime(`${String(Math.floor((event.start.split(":")[0] * 60 + Number(event.start.split(":")[1]) + event.duration) / 60 )).padStart(2, "0")}:${String(( Number( event.start.split(":")[1] ) + event.duration ) % 60 ).padStart(2, "0")}`)}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}

export default DocSchedule;