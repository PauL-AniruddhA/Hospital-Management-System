import React, { useMemo, useState } from "react";
import { Users } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from "recharts";

import doc from "../../assets/home/doc9.png";
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


export default function DocDashboard() {
  const [activeNav, setActiveNav] = useState("Doctors");
  const [selectedDoctorId, setSelectedDoctorId] = useState(MOCK_SELECTED_DOCTOR.id);
  const [activeDayId, setActiveDayId] = useState(4);
  const [tablePage, setTablePage] = useState(1);
  const doctor = MOCK_SELECTED_DOCTOR; // in real app: look up MOCK_DOCTORS by selectedDoctorId

  const [period, setPeriod] = useState("W");
  const [activeIndex, setActiveIndex] = useState(PERIOD_DATA[period].length - 3);
  const chartData = useMemo(() => PERIOD_DATA[period], [period]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const hoverPoint = hoverIndex !== null ? chartData[hoverIndex] : null;

  const chartMax = useMemo(() => {
    const maxValue = Math.max(...chartData.map((item) => item.patients)
    );

    return Math.ceil(maxValue / 100) * 100;
  }, [chartData]);

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
                  <Users size={13} strokeWidth={2.4} />
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
            
          </section>
        </section>

        <section className="panel patients-card-1">
          {/* Patients */}
        </section>

        <section className="panel patients-card-2">
          {/* Patients */}
        </section>
        <section className="panel patients-card-3">
          {/* Patients */}
        </section>

        <section className="panel table-card-1">
          {/* Patient Table */}
        </section>
        <section className="panel table-card-2">
          {/* Patient Table */}
        </section>
        <section className="panel table-card-3">
          {/* Patient Table */}
        </section>

      </section>

    </main>
  );
}
