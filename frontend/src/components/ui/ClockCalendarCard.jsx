import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/Components/ui/ClockCalendarCard.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function ClockCalendarCard() {
  const [now, setNow] = useState(new Date());
  const [viewedMonth, setViewedMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // "month" | "year"

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dayName = now.toLocaleDateString([], { weekday: "long" });
  const fullDate = now.toLocaleDateString([], { day: "numeric", month: "long" });
  const hh = now.getHours() % 12 === 0 ? 12 : now.getHours() % 12;
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const monthLabel = viewedMonth.toLocaleDateString([], { month: "long", year: "numeric" });
  const calendarCellsFull = useMemo(
    () => getMonthGridFull(viewedMonth),
    [viewedMonth]
  );

  const isCurrentMonth =
    viewedMonth.getMonth() === now.getMonth() &&
    viewedMonth.getFullYear() === now.getFullYear();
  const todayDate = now.getDate();

  // 12 months of the viewed year, for year view
  const yearMonths = useMemo(() => {
    const year = viewedMonth.getFullYear();
    return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  }, [viewedMonth.getFullYear()]);

  function goToPrevMonth() {
    setViewedMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function goToNextMonth() {
    setViewedMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }
  function goToPrevYear() {
    setViewedMonth((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
  }
  function goToNextYear() {
    setViewedMonth((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));
  }

  function handleLabelClick() {
    setViewMode((m) => (m === "month" ? "year" : "month"));
  }

  function handleMonthBlockClick(monthDate) {
    setViewedMonth(monthDate);
    setViewMode("month");
  }

  const secAngle = now.getSeconds() * 6;
  const minAngle = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const hourAngle = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

  return (
    <div className="calendar__clock">
      <div className="clock_block">
        <div className="clock__info">
          <div className="clock__digital">
            <span className="clock__digital--time">
              {hh}:{mm}
              <span className="clock__digital--ampm">{ampm}</span>
            </span>
          </div>
          <span className="clock_calender--date">{dayName}, {fullDate}</span>
        </div>
        <svg className="analog_card" viewBox="0 0 100 100">
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
        <button
          aria-label={viewMode === "month" ? "Previous month" : "Previous year"}
          onClick={viewMode === "month" ? goToPrevMonth : goToPrevYear}
        >
          <ChevronLeft size={15} />
        </button>

        <span className="cal-card__month-nav cal-card__month-nav--clickable" onClick={handleLabelClick}>
          {viewMode === "month" ? monthLabel : viewedMonth.getFullYear()}
        </span>

        <button
          aria-label={viewMode === "month" ? "Next month" : "Next year"}
          onClick={viewMode === "month" ? goToNextMonth : goToNextYear}
        >
          <ChevronRight size={15} />
        </button>
      </div>
      
      <div className="month_year-grid">
        {viewMode === "month" ? (
          <div className="calendar-month-grid">
            {WEEKDAYS.map((d) => (
              <span className="calendar-month-grid__weekday" key={d}>{d}</span>
            ))}
            {calendarCellsFull.map((c, i) => (
              <span
                key={i}
                className={
                  "calendar-month-grid__day" +
                  (c.muted ? " calendar-month-grid__day--muted" : "") +
                  (!c.muted && isCurrentMonth && c.day === todayDate ? " calendar-month-grid__day--selected" : "")
                }
              >
                {c.day}
              </span>
            ))}
          </div>
        ) : (
          <div className="calendar-year-grid">
            {yearMonths.map((monthDate) => {
              const isActiveMonth =
                monthDate.getMonth() === viewedMonth.getMonth() &&
                monthDate.getFullYear() === viewedMonth.getFullYear();
              const isThisMonth =
                monthDate.getMonth() === now.getMonth() &&
                monthDate.getFullYear() === now.getFullYear();
              return (
                <button
                  key={monthDate.getMonth()}
                  type="button"
                  className={
                    "calendar-year-grid__block" +
                    (isActiveMonth ? " calendar-year-grid__block--active" : "") +
                    (isThisMonth ? " calendar-year-grid__block--current" : "")
                  }
                  onClick={() => handleMonthBlockClick(monthDate)}
                >
                  {monthDate.toLocaleDateString([], { month: "short" })}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClockCalendarCard;