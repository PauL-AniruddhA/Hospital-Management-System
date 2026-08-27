import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/Doctor/Doctor-Schedule.css";

import {
  ChevronLeft, ChevronRight, CalendarDays, Filter, Plus, UserRound, Video, FlaskConical, Users, ClipboardList, HeartPulse, Coffee, BriefcaseMedical, Stethoscope,
  Repeat,
  ChevronDown,
  RefreshCcw,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const ROW_MIN = 30;
const DAY_START_HOUR = 10;
const DAY_END_HOUR = 20;
const SLOT_MINUTES = 30;
const TOTAL_ROWS = ((DAY_END_HOUR - DAY_START_HOUR) * 60) / SLOT_MINUTES;
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MIN_VISIBLE_ROWS = 2;
const MIN_ROW_HEIGHT = 120;
const GRID_GAP = 0;

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


function getMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);

  // Start on Sunday
  const calendarStart = new Date(firstDay);
  calendarStart.setDate(
    firstDay.getDate() - firstDay.getDay()
  );

  const days = [];

  for (let i = 0; i < 42; i++) {
    const day = new Date(calendarStart);
    day.setDate(calendarStart.getDate() + i);
    days.push(day);
  }

  return days;
}
function formatMonthLabel(date) {
  return date.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });
}
function isSameMonth(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth()
  );
}


function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
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

function getEventEndTime(start, duration) {
  const [hour, minute] = start
    .split(":")
    .map(Number);

  const totalMinutes =
    hour * 60 +
    minute +
    duration;

  const endHour =
    Math.floor(totalMinutes / 60);

  const endMinute =
    totalMinutes % 60;

  return `${String(endHour).padStart(2, "0")}:${String(
    endMinute
  ).padStart(2, "0")}`;
}

function getWeekNumber(date) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  target.setDate(
    target.getDate() +
    4 -
    (target.getDay() || 7)
  );

  const yearStart = new Date(
    target.getFullYear(),
    0,
    1
  );

  return Math.ceil(
    (
      (
        (target - yearStart) / 86400000
      ) + 1
    ) / 7
  );
}

function getDayAvailability( dayEvents, scheduleFilter) {
  const filters =
    scheduleFilter === "all"
      ? appointmentFilters
      : appointmentFilters.filter(
          (filter) =>
            filter.id === scheduleFilter
        );

  let totalSlots = 0;
  let filledSlots = 0;

  filters.forEach((filter) => {
    const filled = dayEvents.filter(
      (event) =>
        event.type === filter.id
    ).length;

    totalSlots += filter.capacity;

    filledSlots += Math.min(
      filled,
      filter.capacity
    );
  });

  return {
    totalSlots,
    filledSlots,
    availableSlots: Math.max(
      0,
      totalSlots - filledSlots
    ),
  };
}

function getEventTypeCounts(dayEvents) {
  return Object.entries(
    dayEvents.reduce((counts, event) => {
      counts[event.type] =
        (counts[event.type] || 0) + 1;

      return counts;
    }, {})
  ).map(([type, count]) => ({
    type,
    count,
  }));
}

const EVENTS = [
  /* ================= MONDAY ================= */

  {
    id: 1,
    dayOffset: 0,
    start: "10:00",
    duration: 30,
    type: "appointment",
    title: "Aniruddha Ranjan PAul",
    subtitle: "Appointment",
  },

  {
    id: 2,
    dayOffset: 0,
    start: "11:00",
    duration: 30,
    type: "appointment",
    title: "Priya Sharma",
    subtitle: "Appointment",
  },

  {
    id: 3,
    dayOffset: 0,
    start: "12:00",
    duration: 30,
    type: "followup",
    title: "Neha Verma",
    subtitle: "Follow-up",
  },

  {
    id: 4,
    dayOffset: 0,
    start: "13:00",
    duration: 30,
    type: "followup",
    title: "Amit Roy",
    subtitle: "Follow-up",
  },

  {
    id: 5,
    dayOffset: 0,
    start: "14:00",
    duration: 30,
    type: "consultation",
    title: "Ananya Sharma",
    subtitle: "Consultation",
  },

  {
    id: 6,
    dayOffset: 0,
    start: "15:00",
    duration: 30,
    type: "diagnostic",
    title: "Arjun Mehta",
    subtitle: "Cardiology Review",
  },

  {
    id: 7,
    dayOffset: 0,
    start: "16:00",
    duration: 30,
    type: "video",
    title: "Mitali Gupta",
    subtitle: "ECG Review",
  },

  /* ================= TUESDAY ================= */

  {
    id: 8,
    dayOffset: 1,
    start: "10:30",
    duration: 30,
    type: "appointment",
    title: "Sourav Roy",
    subtitle: "Appointment",
  },

  {
    id: 9,
    dayOffset: 1,
    start: "11:00",
    duration: 30,
    type: "appointment",
    title: "Kavita Das",
    subtitle: "Appointment",
  },

  {
    id: 10,
    dayOffset: 1,
    start: "12:00",
    duration: 30,
    type: "appointment",
    title: "Rohan Sen",
    subtitle: "Appointment",
  },

  {
    id: 11,
    dayOffset: 1,
    start: "13:00",
    duration: 30,
    type: "followup",
    title: "Priya Das",
    subtitle: "Follow-up",
  },

  {
    id: 12,
    dayOffset: 1,
    start: "14:00",
    duration: 30,
    type: "consultation",
    title: "Rina Paul",
    subtitle: "Consultation",
  },

  {
    id: 13,
    dayOffset: 1,
    start: "15:00",
    duration: 30,
    type: "video",
    title: "Mitali Gupta",
    subtitle: "Video Consultation",
  },

  {
    id: 14,
    dayOffset: 1,
    start: "16:00",
    duration: 60,
    type: "meeting",
    title: "Resident Training",
    subtitle: "Clinical training",
  },

  /* ================= WEDNESDAY ================= */

  {
    id: 15,
    dayOffset: 2,
    start: "10:30",
    duration: 30,
    type: "appointment",
    title: "Amit Paul",
    subtitle: "Appointment",
  },

  {
    id: 16,
    dayOffset: 2,
    start: "11:30",
    duration: 30,
    type: "followup",
    title: "Rina Das",
    subtitle: "Follow-up",
  },

  {
    id: 17,
    dayOffset: 2,
    start: "12:00",
    duration: 30,
    type: "consultation",
    title: "Kunal Sharma",
    subtitle: "Cardiology Consultation",
  },

  {
    id: 18,
    dayOffset: 2,
    start: "13:00",
    duration: 30,
    type: "diagnostic",
    title: "Sneha Roy",
    subtitle: "Diagnostic Review",
  },

  {
    id: 19,
    dayOffset: 2,
    start: "14:30",
    duration: 30,
    type: "video",
    title: "Meera Gupta",
    subtitle: "Video Consultation",
  },

  {
    id: 20,
    dayOffset: 2,
    start: "16:00",
    duration: 60,
    type: "break",
    title: "Lunch Break",
    subtitle: "Scheduled break",
  },

  /* ================= THURSDAY ================= */

  {
    id: 21,
    dayOffset: 3,
    start: "10:00",
    duration: 30,
    type: "appointment",
    title: "Vivek Sharma",
    subtitle: "Appointment",
  },

  {
    id: 22,
    dayOffset: 3,
    start: "11:00",
    duration: 30,
    type: "appointment",
    title: "Rohit Verma",
    subtitle: "Appointment",
  },

  {
    id: 23,
    dayOffset: 3,
    start: "12:00",
    duration: 30,
    type: "followup",
    title: "Neha Singh",
    subtitle: "Follow-up",
  },

  {
    id: 24,
    dayOffset: 3,
    start: "13:00",
    duration: 30,
    type: "followup",
    title: "Vikas Das",
    subtitle: "Follow-up",
  },

  {
    id: 25,
    dayOffset: 3,
    start: "14:00",
    duration: 30,
    type: "consultation",
    title: "Sanjay Roy",
    subtitle: "Consultation",
  },

  {
    id: 26,
    dayOffset: 3,
    start: "15:30",
    duration: 60,
    type: "meeting",
    title: "Case Discussion",
    subtitle: "Clinical review",
  },

  /* ================= FRIDAY ================= */

  {
    id: 27,
    dayOffset: 4,
    start: "10:30",
    duration: 30,
    type: "appointment",
    title: "Rohan Das",
    subtitle: "Appointment",
  },

  {
    id: 28,
    dayOffset: 4,
    start: "11:00",
    duration: 30,
    type: "followup",
    title: "Vijay Patel",
    subtitle: "Follow-up",
  },

  {
    id: 29,
    dayOffset: 4,
    start: "12:00",
    duration: 30,
    type: "consultation",
    title: "Pooja Sharma",
    subtitle: "Consultation",
  },

  {
    id: 30,
    dayOffset: 4,
    start: "13:00",
    duration: 30,
    type: "diagnostic",
    title: "Karan Mehta",
    subtitle: "Diagnostic Review",
  },

  {
    id: 31,
    dayOffset: 4,
    start: "14:00",
    duration: 30,
    type: "video",
    title: "Nisha Roy",
    subtitle: "Video Consultation",
  },

  {
    id: 32,
    dayOffset: 4,
    start: "15:00",
    duration: 60,
    type: "admin",
    title: "Documentation",
    subtitle: "Administrative work",
  },

  /* ================= SATURDAY ================= */

  {
    id: 33,
    dayOffset: 5,
    start: "10:00",
    duration: 30,
    type: "appointment",
    title: "Kavya Singh",
    subtitle: "Appointment",
  },

  {
    id: 34,
    dayOffset: 5,
    start: "11:30",
    duration: 30,
    type: "followup",
    title: "Nitin Das",
    subtitle: "Follow-up",
  },

  {
    id: 35,
    dayOffset: 5,
    start: "12:00",
    duration: 30,
    type: "consultation",
    title: "Aarav Roy",
    subtitle: "Consultation",
  },

  {
    id: 36,
    dayOffset: 5,
    start: "14:00",
    duration: 30,
    type: "diagnostic",
    title: "Ishita Sharma",
    subtitle: "Diagnostic Review",
  },

  {
    id: 37,
    dayOffset: 5,
    start: "15:00",
    duration: 60,
    type: "admin",
    title: "Hospital Records",
    subtitle: "Administrative work",
  },

  /* ================= SUNDAY ================= */

  {
    id: 38,
    dayOffset: 6,
    start: "10:00",
    duration: 30,
    type: "appointment",
    title: "Megha Roy",
    subtitle: "Appointment",
  },

  {
    id: 39,
    dayOffset: 6,
    start: "11:00",
    duration: 30,
    type: "followup",
    title: "Aditya Verma",
    subtitle: "Follow-up",
  },

  {
    id: 40,
    dayOffset: 6,
    start: "12:00",
    duration: 30,
    type: "followup",
    title: "Riya Das",
    subtitle: "Follow-up",
  },

  {
    id: 41,
    dayOffset: 6,
    start: "14:00",
    duration: 30,
    type: "consultation",
    title: "Tanmay Paul",
    subtitle: "Consultation",
  },

  {
    id: 42,
    dayOffset: 6,
    start: "15:00",
    duration: 60,
    type: "meeting",
    title: "Weekly Review",
    subtitle: "Department review",
  },
];

const appointmentFilters = [
  {
    id: "appointment",
    label: "Appointments",
    capacity: 4,
  },
  {
    id: "followup",
    label: "Follow-up",
    capacity: 5,
  },
  {
    id: "consultation",
    label: "Consultations",
    capacity: 3,
  },
  {
    id: "diagnostic",
    label: "Diagnostics",
    capacity: 2,
  },
  {
    id: "video",
    label: "Video Appointments",
    capacity: 2,
  },
  {
    id: "meeting",
    label: "Meetings",
    capacity: 2,
  },
  {
    id: "admin",
    label: "Administrative",
    capacity: 2,
  },
  {
    id: "break",
    label: "Breaks",
    capacity: 1,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function DocSchedule() {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [now, setNow] = useState(new Date());
  const [view, setView] = useState("week");
  const [scheduleEvents, setScheduleEvents] = useState(EVENTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState(null);

  const scrollRef = useRef(null);
  const filterRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(MIN_VISIBLE_ROWS);
  const [rowHeight, setRowHeight] = useState(MIN_ROW_HEIGHT);

  const [filterOpen, setFilterOpen] = useState(false);
  const [scheduleFilter, setScheduleFilter] = useState("all");
  /* ---------------- days ---------------- */

  const weekDays = useMemo(() => {
    return DAY_LABELS.map((label, index) => ({
      label,
      date: addDays(weekStart, index),
    }));
  }, [weekStart]);

  /* ---------------- month days ---------------- */

  const monthDays = useMemo(() => {
    return getMonthDays(weekStart);
  }, [weekStart]);

  /* ---------------- rows ---------------- */

  const rows = useMemo(() => {
    return Array.from(
      { length: TOTAL_ROWS },
      (_, index) => createTimeLabel(index)
    );
  }, []);

  /* ---------------- filtered events ---------------- */

  // const filteredEvents = useMemo(() => {
  //   if (filter === "all") return EVENTS;
  //   return EVENTS.filter(
  //     (event) => event.type === filter
  //   );
  // }, [filter]);
 
  const filteredEvents = useMemo(() => {
    if (scheduleFilter === "all") {
      return scheduleEvents;
    }

    return scheduleEvents.filter(
      (event) => event.type === scheduleFilter
    );
  }, [scheduleEvents, scheduleFilter]);

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
      const dayEvents = filteredEvents.filter(
        (event) =>
          event.dayOffset === index
      );

      if (scheduleFilter === "all") {
        return dayEvents.filter(
          (event) =>
            ![
              "break",
              "meeting",
              "admin",
            ].includes(event.type)
        ).length;
      }

      return dayEvents.length;
    });
  }, [filteredEvents, scheduleFilter]);
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

/* ---------------- month events ---------------- */

  const monthEvents = useMemo(() => {

    return monthDays.map((day) => {

      const jsDay = day.getDay();

      // Convert Sunday-based JS day
      // to your existing Monday-based dayOffset
      const dayOffset =
        jsDay === 0 ? 6 : jsDay - 1;

      return filteredEvents.filter(
        (event) =>
          event.dayOffset === dayOffset
      );

    });

  }, [monthDays, filteredEvents]);

  const refreshSchedule = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);
      setRefreshError(null);

      /*
      * BACKEND:
      * Replace this with your actual API call.
      *
      * const response = await fetch("/api/doctor/schedule");
      *
      * if (!response.ok) {
      *   throw new Error("Failed to refresh schedule");
      * }
      *
      * const data = await response.json();
      *
      * setScheduleEvents(data);
      */

      // Temporary development implementation
      await new Promise((resolve) => setTimeout(resolve, 600));
      setScheduleEvents([...EVENTS]);
      // Keep "now" synchronized after refresh
      setNow(new Date());
      // Reset filter to default
      setScheduleFilter("all");

    } catch (error) {
      console.error("Schedule refresh failed:", error);

      setRefreshError( "Unable to refresh schedule");
    } finally {
      setIsRefreshing(false);
    }
  };
  

  // after Backend connection:

//   const refreshSchedule = async () => {
//   if (isRefreshing) return;

//   try {
//     setIsRefreshing(true);
//     setRefreshError(null);

//     const response = await fetch(
//       "/api/doctor/schedule"
//     );

//     if (!response.ok) {
//       throw new Error(
//         "Failed to fetch schedule"
//       );
//     }

//     const data = await response.json();

//     setScheduleEvents(data);
//     setNow(new Date());

//   } catch (error) {
//     console.error(error);

//     setRefreshError(
//       "Unable to refresh schedule"
//     );

//   } finally {
//     setIsRefreshing(false);
//   }
// };
  
/* ---------------- handlers ---------------- */

  const previousPeriod = () => {
    setWeekStart((current) => {
      if (view === "month") {
        const previousMonth = new Date( current.getFullYear(), current.getMonth() - 1, 1);
        return previousMonth;
      }
      if (view === "day") {
        return addDays(current, -1);
      }
      return addDays(current, -7);
    });
  };
  const nextPeriod = () => {
    setWeekStart((current) => {
      if (view === "month") {
        const nextMonth = new Date( current.getFullYear(), current.getMonth() + 1, 1);
        return nextMonth;
      }
      if (view === "day") {
        return addDays(current, 1);
      }
      return addDays(current, 7);
    });
  };
  const goToday = () => {
    const today = new Date();
    if (view === "month") {
      setWeekStart( new Date( today.getFullYear(), today.getMonth(), 1));
      return;
    }
    setWeekStart( getMonday(today) );
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    // Month view doesn't use the time-grid measurements.
    if (view !== "week") {
      return;
    }

    const el = scrollRef.current;

    if (!el) {
      return;
    }


    const updateScheduleDimensions = (height) => {

      if (height <= 0) {
        return;
      }

      const rowsThatFit =
        Math.floor(
          height / MIN_ROW_HEIGHT
        );

      const rows = Math.min(
        TOTAL_ROWS,
        Math.max(
          MIN_VISIBLE_ROWS,
          rowsThatFit
        )
      );

      const totalGapHeight =
        GRID_GAP * Math.max(
          0,
          rows - 1
        );

      const calculatedRowHeight =
        (
          height -
          totalGapHeight
        ) / rows;


      setVisibleRows(rows);
      setRowHeight(calculatedRowHeight);
    };


    // Initial measurement
    updateScheduleDimensions(
      el.getBoundingClientRect().height
    );


    const observer =
      new ResizeObserver(([entry]) => {

        updateScheduleDimensions(
          entry.contentRect.height
        );

      });


    observer.observe(el);


    return () => {
      observer.disconnect();
    };

  }, [view]);

 useEffect(() => {
  if (view !== "week") { return; }

  const element = scrollRef.current;

  if (!element) {
    return;
  }

  if (!rowHeight || rowHeight <= 0) {
    return;
  }


  const minutes =
    (now.getHours() - DAY_START_HOUR) * 60 +
    now.getMinutes();

  const currentRow =
    minutes / ROW_MIN;

  const targetRow = Math.max(
    0,
    Math.min(
      TOTAL_ROWS - visibleRows,
      Math.floor(currentRow) - 2
    )
  );


  element.scrollTop =
    targetRow * rowHeight;


 }, [ view, rowHeight, visibleRows, now ]);

 useEffect(() => {
  const handleOutsideClick = (event) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target)
    ) {
      setFilterOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleOutsideClick
    );
  };
}, []);


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
          {/* <button className={view === "day" ? "is-active" : ""} onClick={() => setView("day")}>
            Day
          </button> */}

          <button className={view === "week" ? "is-active" : ""} onClick={() => setView("week")}>
            Week
          </button>

          <button className={view === "month" ? "is-active" : ""} onClick={() => setView("month")}>
            Month
          </button>

        </div>

        <div className="sched__date-navigation">

          <button type="button" className="sched__nav-btn" onClick={previousPeriod} aria-label={ view === "month" ? "Previous month" : "Previous week"}>
            <ChevronLeft size={17} strokeWidth={2}/>
          </button>

          <button type="button" className="sched__date-btn" onClick={goToday} title="Go to today" >
              <CalendarDays size={15} />
            <span className="sched__date-content">
              <strong>
                {view === "month"
                  ? formatMonthLabel(weekStart)
                  : formatRange(weekStart)}
              </strong>
              {view === "week" && (
                <small>
                  Week {getWeekNumber(weekStart)}
                </small>
              )}
            </span>
          </button>

          <button className="sched__nav-btn" onClick={nextPeriod} aria-label={ view === "month" ? "Next month" : "Next week" }>
            <ChevronRight size={17} strokeWidth={2}/>
          </button>

        </div>

        <div ref={filterRef} className="sched__filter">
          <div className="sched__filter-dropdown">

            <button
              type="button"
              className="sched__filter-select"
              onClick={() => {
                setFilterOpen((prev) => !prev);
              }}
              aria-expanded={filterOpen}
              aria-haspopup="menu"
            >
              <span>
                {scheduleFilter === "all"
                  ? "All Schedule"
                  : appointmentFilters.find(
                      (filter) =>
                        filter.id === scheduleFilter
                    )?.label
                }
              </span>

              <ChevronDown
                size={16}
                strokeWidth={2}
                className={
                  filterOpen ? "is-open" : ""
                }
              />
            </button>


            {filterOpen && (
              <div className="sched__filter-menu">

                <div className="sched__filter-heading">
                  FILTER BY
                </div>


                {/* ALL */}

                <button
                  type="button"
                  className={`sched__filter-option ${
                    scheduleFilter === "all"
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() => {
                    setScheduleFilter("all");
                    setFilterOpen(false);
                  }}
                >

                  <span className="sched__filter-radio">

                    {scheduleFilter === "all" && (
                      <span className="sched__filter-radio-dot" />
                    )}

                  </span>

                  <span>
                    All Schedule
                  </span>

                </button>


                {/* FILTER OPTIONS */}

                {appointmentFilters.map((filter) => (

                  <button
                    key={filter.id}
                    type="button"
                    className={`sched__filter-option ${
                      scheduleFilter === filter.id
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() => {
                      setScheduleFilter(filter.id);
                      setFilterOpen(false);
                    }}
                  >

                    <span className="sched__filter-radio">

                      {scheduleFilter === filter.id && (
                        <span className="sched__filter-radio-dot" />
                      )}

                    </span>

                    <span>
                      {filter.label}
                    </span>

                  </button>

                ))}

              </div>
            )}

          </div>

          <button
            type="button"
            className={`sched__refresh-icon ${
              isRefreshing ? "is-refreshing" : ""
            }`}
            aria-label={
              isRefreshing
                ? "Refreshing schedule"
                : "Refresh schedule"
            }
            onClick={refreshSchedule}
            disabled={isRefreshing}
          >
            <RefreshCcw size={19} strokeWidth={2} />
          </button>

        </div>
      </div>


      <div className="sched__card">
        {view === "week" && (
          <>
            <div className="sched__daybar">
              <div className="sched__time-header"> TIME </div>

              {weekDays.map((day, index) => {
                const isToday = isSameDate(day.date, now);
                return (
                  <div key={day.label} className={`sched__daycell ${isToday ? "sched__daycell--today" : ""}`}>

                    <span className="sched__day-name">
                      {day.label}
                    </span>

                    <span className="sched__day-date">
                      {formatDayDate(day.date)}
                    </span>
                    
                    <span className="sched__day-count">
                      <i />
                      {appointmentCounts[index]} task
                    </span>

                    {/* <span className="sched__day-count">
                      <i />
                      {appointmentCounts[index]}{" "}
                      {scheduleFilter === "all"
                        ? appointmentCounts[index] === 1
                          ? "Appt"
                          : "Appts"
                        : appointmentFilters.find(
                            (filter) =>
                              filter.id === scheduleFilter
                          )?.label
                      }
                    </span> */}
                    {/* <span className="sched__day-count">
                      <i />
                      {appointmentCounts[index]}{" "}
                      {appointmentCounts[index] === 1 ? "item" : "items"}
                    </span> */}
                  </div>
                );
              })}

            </div>

            {/* GRID */}

            <div ref={scrollRef} className="sched__scroll">
              <div
                className="sched__grid"
                style={{
                  "--schedule-total-rows": TOTAL_ROWS,
                  "--schedule-visible-rows": visibleRows,
                  "--schedule-row-height": `${rowHeight}px`,
                }}
              >
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
                        className={`sched__cell
                            ${time.isHour ? "sched__cell--hour" : ""}
                            ${ columnIndex < todayColumn ? "sched__cell--past-day" : ""}
                            ${ columnIndex === todayColumn ? "sched__cell--today" : ""}
                            ${ columnIndex > todayColumn ? "sched__cell--future-day" : ""}`}
                        style={{
                          gridColumn: columnIndex + 2,
                          gridRow: rowIndex + 1,
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
                      gridColumn:todayColumn + 2,
                      gridRow: `${Math.floor(todayRow) + 1 } / span 1`,
                      top: `${(todayRow % 1) }px`
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
                      className={`sched__event sched__event--${config.color} ${isShort ? "sched__event--compact" : ""}`}
                      style={{
                        gridColumn: event.dayOffset + 2,
                        gridRow: `${Math.round(event.startRow) + 1} / span ${Math.max(1, Math.round(event.span))}`,
                      }}
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
                        {formatTime(
                          getEventEndTime(
                            event.start,
                            event.duration
                          )
                        )}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>
          </>
        )}

        {view === "month" && (
          <div className="month-view">
            <div className="month-view__header">
              {DAY_LABELS.map((day) => (
                <div key={day} className="month-view__weekday">
                  {day}
                </div>
              ))}
            </div>


            <div className="month-view__grid">
              {monthDays.map((day, index) => {

                const dayEvents = monthEvents[index];
                const isToday = isSameDate(day, now);
                const isCurrentMonth = isSameMonth(day, weekStart);
                const availability = getDayAvailability( dayEvents, scheduleFilter);

                return (
                  <div
                    key={day.toISOString()}
                    className={` month-cell ${isToday ? "month-cell--today" : ""} ${ !isCurrentMonth ? "month-cell--outside" : "" } `}
                  >

                    {/* DATE */}

                    <div className="month-cell__top">

                      <span className="month-cell__date">
                        {day.getDate()}
                      </span>

                      {isToday && (
                        <span className="month-cell__today">
                          Today
                        </span>
                      )}

                    </div>


                    {/* =================================================
                        SINGLE RESPONSIVE CONTAINER
                    ================================================= */}

                    <div className="month-cell__availability">

                      <div className="month-cell__availability-total">

                        <strong>
                          {availability.availableSlots}
                          <span>
                            {" / "}
                            {availability.totalSlots}
                          </span>
                        </strong>

                        <span>
                          Slots Available
                        </span>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}
      </div>

    </section>
  );
}

export default DocSchedule;