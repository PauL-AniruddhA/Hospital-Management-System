import React, { useMemo, useState } from "react";
import { Users, Video, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from "recharts";

import doc from "../../assets/home/doc7.png";
import "../../styles/Doctor/Doctor-Dashboard.css";



const MOCK_SELECTED_DOCTOR = {
  id: 3,
  name: "Dr. Binti Biswas",
  specialty: "Nephrology Specialist",
  photo: doc,
  department: "Nephrology",
  joiningDate: "01-Jun-2025",
  email: "binti@birdem.net",
  phone: "+880 1518443329",
};

const sessions = [
  {
    id: 1,
    patientName: 'Anita Roy',
    room: 'Room 2',
    startTime: '9:45 am',
    elapsedMin: 22,      // recompute this every minute from startTime via setInterval
    expectedMin: 240,
  },
  {
    id: 2,
    patientName: 'Rahul Sen',
  },
];

const session = {
  // room: 'Room 3',
  patientName: 'Anita Roy',
  scheduledTime: '10:30 am',
  minutesUntil: 25,    // recompute the same way against scheduledTime
  time: "10:30pm",
  title: "Super Admin",
  patient: "Rafig Ahmed",
  remaining: "45min"
};

// const DATA = {
//   W: [
//     { label: "Mon", patients: 82 },
//     { label: "Tue", patients: 96 },
//     { label: "Wed", patients: 91 },
//     { label: "Thu", patients: 112 },
//     { label: "Fri", patients: 104 },
//     { label: "Sat", patients: 126 },
//     { label: "Sun", patients: 118 },
//   ],

//   M: [
//     { label: "W1", patients: 125 },
//     { label: "W2", patients: 106 },
//     { label: "W3", patients: 54 },
//     { label: "W4", patients: 101 },
//     { label: "W5", patients: 138 },
//   ],

//   Y: [
//     { label: "Jul", patients: 126 },
//     { label: "Aug", patients: 106 },
//     { label: "Sep", patients: 54 },
//     { label: "Oct", patients: 101 },
//     { label: "Nov", patients: 130 },
//     { label: "Dec", patients: 151 },
//   ],
// };

const PERIOD_DATA = {
  W: [
    { label: "Mon", patients: 0 },
    { label: "Tue", patients: 200 },
    { label: "Wed", patients: 165 },
    { label: "Thu", patients: 270 },
    { label: "Fri", patients: 190 },
    { label: "Sat", patients: 230 },
    { label: "Sun", patients: 290 },
  ],

  M: [
    { label: "Week 1", patients: 420 },
    { label: "Week 2", patients: 560 },
    { label: "Week 3", patients: 490 },
    { label: "Week 4", patients: 680 },
  ],

  Y: [
    { label: "Jan", patients: 420 },
    { label: "Feb", patients: 510 },
    { label: "Mar", patients: 590 },
    { label: "Apr", patients: 680 },
    { label: "May", patients: 1060 },
    { label: "Jun", patients: 890 },
    { label: "Jul", patients: 1020 },
    { label: "Aug", patients: 1140 },
    { label: "Sep", patients: 1248 },
  ],
};

const PERIOD_LABELS = {
  W: "This Week",
  M: "This Month",
  Y: "This Year",
};

const attendanceData = {
  month: "September",
  percentage: 73,
  presentDays: 22,
  totalDays: 30,
  // 30 entries, one per day, in chronological order — drives the mini calendar grid
  days: [
    "present", "present", "present", "present", "present", "off",
    "present", "present", "half", "present", "present", "off",
    "present", "leave", "present", "present", "present", "off",
    "present", "present", "half", "leave", "present", "off",
    "present", "present", "leave", "half", "present", "off",
  ],
  stats: [
    { count: 3, label: "half day" },
    { count: 3, label: "leave" },
    { count: 2, label: "off" },
  ],
};

const dayStatusColor = {
  present: "var(--attendance-present)",
  half: "var(--attendance-half)",
  leave: "var(--attendance-leave)",
  off: "var(--attendance-off)",
};

const attendanceDatas = {
  month: "September",
  percentage: 73,
  presentDays: 22,
  totalDays: 30,
  stats: [
    { count: 3, label: "half day" },
    { count: 3, label: "leave" },
    { count: 2, label: "off" },
  ],
};

const meetings = [
  {
    id: 1,
    name: "Dr. Sarah Reyes",
    meta_1: "Cardiology  ·  follow-up",
    meta_2: "10:30 AM ",
    status: "Meeting Starts in 15 min",
    isLive: false,
    ctaLabel: "Tap to join",
    variant: "default",
    className: "",
  },
  // add more meeting objects here — later, swap this array for backend data
];
const departments = [
  {
    name: "ICU",
    percentage: 91,
    status: "critical",
  },
  {
    name: "ER",
    percentage: 84,
    status: "warning",
  },
  {
    name: "OPD",
    percentage: 72,
    status: "normal",
  },
  {
    name: "Ward",
    percentage: 63,
    status: "normal",
  },
  {
    name: "OT",
    percentage: 40,
    status: "normal",
  },
];
const AVATARS = [
  { initials: "MA", color: "red" },
  { initials: "SK", color: "amber" },
  { initials: "RB", color: "gray" },
];

const ReferralsCard = {
  count: 32,
  period: "this month",
  urgentCount: 3,
  pendingCount: 6,
  extraCount: 6,
  AcceptedCount: 23,
  recentName: "M. Ali",
  recentTime: "40 min ago",

  // onReview = () => { },
};

const allVitals = [
  {
    id: "hr",
    label: "Heart rate",
    value: "72",
    unit: "bpm",
    color: "#16a34a",
    type: "ecg",
    points: "0,20 20,20 25,5 30,35 35,20 45,20 50,10 55,20 70,20 90,20 95,5 100,35 105,20 115,20 120,10 125,20 140,20",
  },
  {
    id: "bp",
    label: "BP",
    value: "134/86",
    unit: "",
    color: "#d85a30",
    type: "arterial",
    path: "M0,30 C10,30 15,5 25,10 C32,13 30,22 35,20 C45,17 50,30 60,30 C70,30 75,5 85,10 C92,13 90,22 95,20 C105,17 110,30 120,30 C125,30 130,30 140,30",
  },
  {
    id: "spo2",
    label: "SpO2",
    value: "98%",
    unit: "",
    color: "#3B6D11",
    type: "pleth",
    path: "M0,25 C8,25 12,8 18,10 C24,12 22,25 30,25 C40,25 44,8 50,10 C56,12 54,25 62,25 C72,25 76,8 82,10 C88,12 86,25 94,25 C104,25 108,8 114,10 C120,12 118,25 126,25 L140,25",
  },
  {
    id: "temp",
    label: "Temp",
    value: "36.6",
    unit: "°C",
    color: "#aa7f22",
    type: "gauge",
    // gauge needs a fill percentage instead of a shape
    percent: 65, // e.g. 36.6°C mapped to a 0-100 scale between normal min/max
  },
];
function handleJoinMeeting(meeting) {
  console.log("Join clicked:", meeting.name);
}



const DEFAULT_ALERTS = [
  { id: "critical", tone: "danger", icon: "alert", label: "Critical alerts", value: "3 active", note: "1 code blue, ICU-B" },
  { id: "pharmacy", tone: "warning", icon: "pill", label: "Pharmacy alert", value: "2 low stock", note: "Insulin, Adrenaline" },
];

const DEFAULT_KPIS = [
  { id: "er", label: "ER wait", value: "34 min", note: "12 in queue" },
  { id: "staff", label: "Staff on duty", value: "86%", note: "Ward B short 2" },
  { id: "ot", label: "OT status", value: "3/5", note: "OT-2 ends ~15 min" },
  { id: "admissions", label: "Admissions", value: "+21 / −17", note: "Net +4 patients" },
  { id: "trend", label: "Diagnosis trend", value: "Dengue ↑", note: "+40% vs last week" },
];

const DEFAULT_WARDS = [
  { name: "ICU", occupied: 8, total: 10 },
  { name: "General", occupied: 28, total: 40 },
  { name: "Cardiology", occupied: 12, total: 15 },
  { name: "Maternity", occupied: 7, total: 12 },
  { name: "Orthopedics", occupied: 6, total: 10 },
  { name: "Neurology", occupied: 8, total: 8 },
];

const ICONS = {
  alert: (
    <>
      <path d="M12 4 3 20h18L12 4Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  pill: (
    <>
      <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" />
      <path d="m9.5 9.5 5 5" />
    </>
  ),
};

const HospitalOverview = {
  alerts: DEFAULT_ALERTS,
  kpis: DEFAULT_KPIS,
  wards: DEFAULT_WARDS,
  dark: false,
};

function Icon({ name }) {
  return (
    <svg className="ho-icon" viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

// normal: under 80% · high: 80–99% · full: 100%
const getLevel = (pct) => (pct >= 100 ? "full" : pct >= 80 ? "high" : "normal");

function AlertTile({ tone, icon, label, value, note }) {
  return (
    <div className={`ho-alert ho-alert--${tone}`}>
      <Icon name={icon} />
      <div>
        <div className="ho-label">{label}</div>
        <div className="ho-alert__value">{value}</div>
        <div className="ho-note">{note}</div>
      </div>
    </div>
  );
}

function KpiTile({ label, value, note }) {
  return (
    <div className="ho-kpi">
      <div className="ho-label">{label}</div>
      <div className="ho-kpi__value">{value}</div>
      <div className="ho-note">{note}</div>
    </div>
  );
}

function WardBar({ name, occupied, total }) {
  const pct = Math.round((occupied / total) * 100);
  return (
    <div className="ho-ward">
      <div className="ho-ward__head">
        <span className="ho-ward__name">{name}</span>
        <span className="ho-ward__count">
          {occupied}/{total} · {pct}%
        </span>
      </div>
      <div
        className="ho-track"
        role="progressbar"
        aria-label={`${name} bed occupancy`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={occupied}
      >
        <div className={`ho-fill ho-fill--${getLevel(pct)}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}


// function buildArc(percentage) {
//   const radius = 76;
//   const circumference = Math.PI * radius;
//   const clamped = Math.max(0, Math.min(100, percentage));
//   const dashoffset = circumference * (1 - clamped / 100);
//   return { circumference, dashoffset };
// }

export default function DocDashboard() {
  const [activeId, setActiveId] = useState("hr");
  const hero = allVitals.find((v) => v.id === activeId);
  const rest = allVitals.filter((v) => v.id !== activeId);

  const occupied = HospitalOverview.wards.reduce((sum, w) => sum + w.occupied, 0);
  const total = HospitalOverview.wards.reduce((sum, w) => sum + w.total, 0);

  // const [activeNav, setActiveNav] = useState("Doctors");
  // const [selectedDoctorId, setSelectedDoctorId] = useState(MOCK_SELECTED_DOCTOR.id);
  // const [activeDayId, setActiveDayId] = useState(4);
  // const [tablePage, setTablePage] = useState(1);

  const doctor = MOCK_SELECTED_DOCTOR; // in real app: look up MOCK_DOCTORS by selectedDoctorId

  const [period, setPeriod] = useState("W");
  const [activeIndex, setActiveIndex] = useState(PERIOD_DATA[period].length - 3);
  const chartData = useMemo(() => PERIOD_DATA[period], [period]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const hoverPoint = hoverIndex !== null ? chartData[hoverIndex] : null;
  // const { circumference, dashoffset } = buildArc(ATTENDANCE.percentage);

  // const total = referrals.length;
  // const urgentCount = referrals.filter((r) => r.urgent).length;

  const chartMax = useMemo(() => {
    const maxValue = Math.max(...chartData.map((item) => item.patients)
    );

    return Math.ceil(maxValue / 100) * 100;
  }, [chartData]);
  // Week , month and year change 
  const handlePeriodChange = (value) => {
    setPeriod(value);
    setActiveIndex(Math.max(0, Math.floor(PERIOD_DATA[value].length * 0.6)));
  };


  return (
    <main className="doc_homepage-body">
      <section className="content-grid">

        <section className="panel profile-card">

          <div className="profile-header">
            <span className="profile-eyebrow">
              Basic Information
            </span>

            <div className="profile-card-actions">
              <button
                type="button"
                className="icon-button-ghost"
                aria-label="View"
              >
                👁
              </button>

              <button
                type="button"
                className="icon-button-ghost"
                aria-label="Edit"
              >
                ✎
              </button>
            </div>
          </div>

          <div className="profile-identity">
            <h3 className="profile-name">
              {doctor.name}
            </h3>

            <p className="profile-specialty">
              {doctor.specialty}
            </p>
          </div>

          <div className="profile-image-area">
            <img
              className="profile-photo"
              src={doctor.photo}
              alt={doctor.name}
            />
          </div>

          <div className="profile-meta-grid">

            <div className="profile-meta-item">
              <span className="profile-meta-label">
                Department
              </span>

              <span className="profile-meta-value">
                {doctor.department}
              </span>
            </div>

            <div className="profile-meta-item">
              <span className="profile-meta-label">
                Joining Date
              </span>

              <span className="profile-meta-value">
                {doctor.joiningDate}
              </span>
            </div>

          </div>

          <div className="profile-contact-list">

            <div className="profile-contact-item">
              <span aria-hidden="true">✉</span>
              <span>{doctor.email}</span>
            </div>

            <div className="profile-contact-item">
              <span aria-hidden="true">📞</span>
              <span>{doctor.phone}</span>
            </div>

          </div>

        </section>

        <section className="panel overview-card-1">

          {/* <section className="panel schedule-card-ring">
            <div className="ring-wrap">
              <svg viewBox="0 0 56 56" className="ring-svg">
                <circle
                  className="ring-track"
                  cx="28" cy="28" r="24"
                  fill="none" strokeWidth="4"
                />
                <circle
                  className="ring-progress"
                  cx="28" cy="28" r="24"
                  fill="none" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  transform="rotate(-90 28 28)"
                />
                <text x="28" y="32" textAnchor="middle" className="ring-label">
                  {session.remaining}
                </text>
              </svg>
            </div>
            <span className="ring-title">{session.title} · {session.time}</span>
            <span className="ring-patient">{session.patient} · {session.room}</span>
          </section> */}

          <section className="queue-card">
            <div className="queue-card__active">
              <svg className="queue-card__ring" viewBox="0 0 60 60">
                <circle className="queue-card__ring-track" cx="30" cy="30" r="26" />
                <circle
                  className="queue-card__ring-progress"
                  cx="30"
                  cy="30"
                  r="26"
                  strokeDasharray={163.36}
                  strokeDashoffset={163.36 * (1 - 45 / 60)}
                />
                <text x="30" y="35" textAnchor="middle" className="queue-card__ring-label">
                  45m
                </text>
              </svg>

              <p className="queue-card__title">Super admin</p>
              <p className="queue-card__subtitle">Rafiq Ahmed · 10:30 pm</p>
            </div>

            <div className="queue-card__footer">
              <div className="queue-card__progress-track">
                <div className="queue-card__progress-fill" style={{ width: "75%" }} />
              </div>
              <p className="queue-card__next">Next: Anita Roy, 10:30 am</p>
            </div>
          </section>

        </section>

        <section className="panel overview-card-2">
          {/* Dialyses Overview */}
          <section className="patient-stat-card">

            {/* STATS HEADER */}
            <div className="patient-stat-header">
              <div className="patient-stat-heading">
                <span className="patient-stat-icon">
                  {/* <Users size={13} strokeWidth={2.4} /> */}
                </span>
                <h3> Patients Statistics </h3>
              </div>

              {/* Period Switch */}
              <div className="patient-stat-period">
                {Object.entries(PERIOD_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    className={period === key ? "active" : ""}
                    onClick={() => handlePeriodChange(key)}
                    title={label}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            {/* CHART AREA */}
            <div className="patient-stat-chart">
              <ResponsiveContainer width="100%" height="100%">

                <AreaChart
                  data={chartData}
                  margin={{ top: 25, right: 14, left: 2, bottom: 0 }}
                  onMouseMove={(state) => {
                    if (
                      state?.activeTooltipIndex !== undefined &&
                      state.activeTooltipIndex !== null
                    ) {
                      setHoverIndex(Number(state.activeTooltipIndex));
                    }
                  }}
                  onMouseLeave={() => { setHoverIndex(null); }}
                >

                  {/* AREA GRADIENT */}
                  <defs>
                    <linearGradient id="patientStatGradient" x1="0" y1="0" x2="0" y2="1" >
                      <stop offset="0%" stopColor="#35a89c" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#35a89c" stopOpacity={0.025} />
                    </linearGradient>
                  </defs>

                  {/* GRID */}
                  <CartesianGrid vertical={false} horizontal={true} stroke="#dfe6e5" strokeDasharray="3 4" />

                  {/* X AXIS */}
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#707a7a", fontSize: 9, fontWeight: 500 }}
                    dy={5}
                  />

                  {/* Y AXIS */}
                  <YAxis
                    domain={[0, chartMax]}
                    tickCount={4}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#737c7c", fontSize: 8, fontWeight: 500 }}
                    width={27}
                  />


                  {/* TOOLTIP Hidden because values are displayed directly above the points. */}
                  <Tooltip cursor={{ stroke: "#159489", strokeWidth: 1, strokeDasharray: "4 4" }}
                    content={({ active, payload, label }) => {

                      if (!active || !payload?.length) { return null; }
                      const patients = payload[0]?.value;
                      return (
                        <div className="patient-chart-tooltip">
                          <div className="patient-chart-tooltip__period">
                            {label}
                          </div>
                          <div className="patient-chart-tooltip__value">
                            {patients}
                            <span>patients</span>
                          </div>
                          <div className="patient-chart-tooltip__detail">
                            Patient visits
                          </div>

                        </div>
                      );
                    }}
                  />

                  {/* PATIENT AREA */}
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#159489"
                    strokeWidth={1.8}
                    fill="url(#patientStatGradient)"
                    dot={{ r: 3, fill: "#159489", stroke: "#ffffff", strokeWidth: 1.5 }}
                    activeDot={{ r: 5, fill: "#ffffff", stroke: "#159489", strokeWidth: 2 }}
                    label={{ position: "top", fill: "#159489", fontSize: 9, fontWeight: 700 }}
                    animationDuration={500}
                  />
                </AreaChart>

              </ResponsiveContainer>
            </div>


            {/* CHART AREA */}
            {/* <div className="patient-stat-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 25,
                    right: 8,
                    left: 0,
                    bottom: 4,
                  }}
                  onMouseMove={(state) => {
                    if (
                      state?.activeTooltipIndex !== undefined &&
                      state.activeTooltipIndex !== null
                    ) {
                      setHoverIndex(Number(state.activeTooltipIndex));
                    }
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null);
                  }}
                >

                  <defs>
                    <linearGradient
                      id="patientStatGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#35a89c"
                        stopOpacity={0.28}
                      />

                      <stop
                        offset="100%"
                        stopColor="#35a89c"
                        stopOpacity={0.025}
                      />
                    </linearGradient>
                  </defs>

  
                  <CartesianGrid
                    vertical={false}
                    horizontal={true}
                    stroke="#dfe6e5"
                    strokeDasharray="3 4"
                  />


                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#707a7a",
                      fontSize: 9,
                      fontWeight: 500,
                    }}
                    dy={5}
                  />


                  <YAxis
                    domain={[0, chartMax]}
                    tickCount={4}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#737c7c",
                      fontSize: 8,
                      fontWeight: 500,
                    }}
                    width={27}
                  />


                  <Tooltip
                    cursor={{
                      stroke: "#159489",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                    content={() => null}
                  />

  
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#159489"
                    strokeWidth={1.8}
                    fill="url(#patientStatGradient)"
                    dot={{
                      r: 3,
                      fill: "#159489",
                      stroke: "#ffffff",
                      strokeWidth: 1.5,
                    }}
                    activeDot={{
                      r: 5,
                      fill: "#ffffff",
                      stroke: "#159489",
                      strokeWidth: 2,
                    }}
                    
                    label={({ x, y, value, index }) => {

   
                      if (value === 0) {
                        return null;
                      }

                      if (index === 0) {
                        return (
                          <text
                            x={x + 10}
                            y={y + 3}
                            textAnchor="start"
                            fill="#159489"
                            fontSize={9}
                            fontWeight={700}
                          >
                            {value}
                          </text>
                        );
                      }

               
                      if (index === chartData.length - 1) {
                        return (
                          <text
                            x={x - 4}
                            y={y - 8}
                            textAnchor="end"
                            fill="#159489"
                            fontSize={9}
                            fontWeight={700}
                          >
                            {value}
                          </text>
                        );
                      }

              
                      return (
                        <text
                          x={x}
                          y={y - 8}
                          textAnchor="middle"
                          fill="#159489"
                          fontSize={9}
                          fontWeight={700}
                        >
                          {value}
                        </text>
                      );
                    }}

                    animationDuration={0}
                  />

                </AreaChart>
              </ResponsiveContainer>
            </div> */}
          </section>
        </section>

        <section className="panel overview-card-3">
          {/* Patients */}
          {/* <section className={`ho${HospitalOverview.dark ? " ho--dark" : ""}`} aria-label="Hospital overview"> */}
            {/* <div className="ho-alerts">
              {HospitalOverview.alerts.map(({ id, ...a }) => (
                <AlertTile key={id} {...a} />
              ))}
            </div> */}

            {/* <div className="ho-kpis">
              {HospitalOverview.kpis.map(({ id, ...k }) => (
                <KpiTile key={id} {...k} />
              ))}
            </div> */}

            <div className="ho-card">
              <div className="ho-card__head">
                <h3 className="ho-card__title">
                  Hospital Plus
                </h3>
                <ul className="ho-legend">
                  <span className="ho-card__total">{occupied}/{total}</span>
                  {/* <li><i className="ho-fill */}
                </ul>
              </div>
              <div className="ho-wards">
                {HospitalOverview.wards.map((w) => (
                  <WardBar key={w.name} {...w} />
                ))}
              </div>
            </div>
          {/* </section> */}
        </section>

        <section className="panel overview-card-4">
          {/* Patients */}
          <div className="attendance-card-v3">
            <div className="attendance-card-v3__header">
              Attendance
            </div>

            <div className="attendance-card-v3__top">
              <span className="attendance-card-v3__month">{attendanceDatas.month}</span>
              <span className="attendance-card-v3__percentage">
                {attendanceDatas.percentage}%
              </span>
              <span className="attendance-card-v3__subtext">
                present, {attendanceDatas.presentDays} of {attendanceDatas.totalDays} days
              </span>
            </div>

            <div className="attendance-card-v3__bottom">
              {attendanceDatas.stats.map((item, index) => (
                <div className="attendance-card-v3__stat" key={index}>
                  <span className="attendance-card-v3__stat-count">{item.count}</span>
                  <span className="attendance-card-v3__stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel table-card-1">
          {/* Patient Table */}
          <div className="vitals-card">
            <div className="vitals-header">
              <span className="vitals-title">
                {/* <span className="vitals-title_icon"> 
                  <Users size={13} strokeWidth={2.4} /> 
                </span>   */}
                <h3> Vitals </h3>
              </span>
              <span className="vitals-today">Today</span>
            </div>

            <div className="vitals-body">
              <div className="vitals-left">
                <p className="hr-label">{hero.label.toUpperCase()}</p>
                <p className="hr-value" style={{ "--pc": hero.color }}>
                  {hero.value} <span className="hr-unit">{hero.unit}</span>
                </p>

                {/* {(hero.type === "ecg") && (
                  <svg className="hr-graph" viewBox="0 0 140 40" preserveAspectRatio="none">
                    <polyline points={hero.points} fill="none" stroke={hero.color} strokeWidth="2" />
                  </svg>
                )}

                {(hero.type === "arterial" || hero.type === "pleth") && (
                  <svg className="hr-graph" viewBox="0 0 140 40" preserveAspectRatio="none">
                    <path d={hero.path} fill="none" stroke={hero.color} strokeWidth="2" />
                  </svg>
                )}

                {hero.type === "gauge" && (
                  <svg className="hr-graph" viewBox="0 0 140 40">
                    <rect x="4" y="14" width="132" height="8" rx="4" fill="#f0e6d2" />
                    <rect x="4" y="14" width={132 * (hero.percent / 100)} height="8" rx="4" fill={hero.color} />
                    <circle cx={4 + 132 * (hero.percent / 100)} cy="18" r="6" fill={hero.color} />
                  </svg>
                )} */}
              </div>

              <div className="vitals-right">
                {rest.map((v) => (
                  <div
                    key={v.id}
                    className="vital-row"
                    style={{ "--pc": v.color }}
                    onClick={() => setActiveId(v.id)}
                  >
                    <span className="vital-label">{v.label}</span>
                    <span className="vital-value">
                      {v.value} {v.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        <section className="panel table-card-2">
          {/* Patient Table */}
          {/* <div className="meeting-section"> */}
          {/* <h2 className="meeting-section-title">Meeting</h2>/ */}
          {meetings.map((meeting) => (
            <div key={meeting.id} className={`meeting-card-wrap ${meeting.className}`}>
              <button
                type="button"
                onClick={() => handleJoinMeeting(meeting)}
                aria-label={`Join meeting with ${meeting.name}. ${meeting.status}.`}
                className={`meeting-card ${meeting.variant === "row" ? "meeting-card--row" : ""}`}
              >
                <span className="meeting-card__blob" aria-hidden="true" />

                <span className="meeting-card__top">
                  {meeting.status && (
                    <span className="meeting-card__status">
                      <span
                        className={`meeting-card__dot ${meeting.isLive ? "meeting-card__dot--live" : ""}`}
                      />
                      <span>{meeting.status}</span>
                    </span>
                  )}
                  <span className="meeting-card__icon">
                    <Video strokeWidth={2} aria-hidden="true" />
                  </span>
                </span>

                <span className="meeting-card__body">
                  <span className="meeting-card__name">{meeting.name}</span>
                  <div className="meeeting-card__meta">
                    <span className="meeting-card__meta_1">{meeting.meta_1} </span>
                    <span className="meeting-card__meta_2">{meeting.meta_2}</span>

                  </div>
                </span>

                <span className="meeting-card__cta">
                  {meeting.ctaLabel}
                  <ArrowRight strokeWidth={2} aria-hidden="true" />
                </span>
              </button>
            </div>
          ))}

          {/* </div> */}
        </section>

        <section className="panel table-card-3">
          {/* Patient Table */}
          <div className="referrals-card">
            {/* Header */}
            <div className="referrals-header">
              <div className="referrals-header-left">
                {/* CHANGED 1: removed <i className="ti ti-user-plus ..."/> (not in the design) */}
                <span className="referrals-title">Referrals</span>
                {/* CHANGED 2: count moved into header-left, reusing your commented-out class + data */}
                {/* <p className="referrals-count">{ReferralsCard.count}</p> */}
              </div>
              <div className="referrals-header-right">
                <div className="referrals-avatars">
                  {AVATARS.map((a) => (
                    <div key={a.initials} className={`avatar avatar-${a.color}`}>
                      {a.initials}
                    </div>
                  ))}
                  <div className="avatar avatar-extra">+{ReferralsCard.extraCount}</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="referrals-body">
              <div className="referrals-tags">
                <span className="tag tag-urgent">
                  <span className="tag-urgent-A">{ReferralsCard.urgentCount}</span>
                  <span className="tag-urgent-B">Important</span>
                </span>
                <span className="tag tag-pending">
                  <span className="tag-pending-A">{ReferralsCard.pendingCount}</span>
                  <span className="tag-pending-B">pending</span>
                </span>
                <span className="tag tag-accepted">
                  <span className="tag-accepted-A">{ReferralsCard.AcceptedCount}</span>
                  <span className="tag-accepted-B">Accepted</span>
                </span>
              </div>

              {/* Footer */}
              <button className="referrals-footer" type="button">
                View all referrals
                <ArrowRight strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

      </section>
    </main >
  );
}
