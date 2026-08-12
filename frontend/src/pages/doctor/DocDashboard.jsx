import React from "react";
import { 
  Users, CalendarDays, AlertTriangle, ClipboardList, ChevronRight, PlayCircle, MoreVertical, FlaskConical, Pill, UserPlus, CheckCircle2, ClipboardCheck, Star, Timer 
} from "lucide-react";
import doc from "../../assets/home/doc3.png";
import "../../styles/Doctor/Doctor-Dashboard.css";


const QUEUE = [
  { id: "01", name: "John Doe", pid: "AMS-2025-0012", time: "09:30 AM", meta: "20 mins ago", reason: "Follow-up", dept: "Hypertension", status: "waiting", patientImage: doc },
  { id: "02", name: "Priyanghu Kaur", pid: "AMS-2025-0013", time: "09:45 AM", meta: "5 mins ago", reason: "Fever & Cold", dept: "General", status: "checkedin", patientImage: doc },
  { id: "03", name: "Priya Mehta", pid: "AMS-2025-0014", time: "10:00 AM", meta: "In 15 mins", reason: "Chest Pain", dept: "Cardiology", status: "upcoming", patientImage: doc },
  { id: "04", name: "Ramesh Kumar", pid: "AMS-2025-0015", time: "10:20 AM", meta: "In 35 mins", reason: "Diabetes Checkup", dept: "Endocrinology", status: "upcoming", patientImage: doc },
  { id: "05", name: "Sneha Kapoor", pid: "AMS-2025-0016", time: "10:40 AM", meta: "In 55 mins", reason: "Thyroid Follow-up", dept: "Endocrinology", status: "upcoming", patientImage: doc },
];

const STATUS_LABEL = { waiting: "Waiting", checkedin: "Checked In", upcoming: "Upcoming" };

const SCHEDULE = [
  { time: "09:00 AM", title: "Consultation", patient: "Michael Brown", status: "completed" },
  { time: "09:30 AM", title: "Consultation", patient: "John Doe", status: "completed" },
  { time: "10:00 AM", title: "Consultation", patient: "Aniruddha Paul", status: "progress" },
  { time: "10:30 AM", title: "Follow-up", patient: "Priya Mehta", status: "upcoming" },
  { time: "11:00 AM", title: "Consultation", patient: "Ramesh Kumar", status: "upcoming" },
  { time: "11:30 AM", title: "Consultation", patient: "Sneha Kapoor", status: "upcoming" },
];

const SCHEDULE_STATUS_LABEL = { completed: "Completed", progress: "In Progress", upcoming: "Upcoming" };

const ACTION_ITEMS = [
  { id: "a1", tier: "critical", icon: AlertTriangle, title: "Emergency patient admitted", subtitle: "Bed 4 · needs triage now", cta: "Review" },
  { id: "a2", tier: "clinical", icon: FlaskConical, title: "Abnormal lab flagged", subtitle: "Aniruddha Paul · CBC out of range", cta: "View report" },
  { id: "a3", tier: "admin", icon: Pill, title: "2 prescriptions to sign", subtitle: "Ramesh Kumar, Sneha Kapoor", cta: "Sign" },
  { id: "a4", tier: "admin", icon: UserPlus, title: "1 referral to approve", subtitle: "Priya Mehta → Cardiology", cta: "Approve" },
];

const PERFORMANCE = [
  { icon: CheckCircle2, iconClass: "perf-icon--green", value: "142", label: "Patients Seen", trend: "+12%", up: true },
  { icon: ClipboardCheck, iconClass: "perf-icon--purple", value: "128", label: "Prescriptions", trend: "+8%", up: true },
  { icon: FlaskConical, iconClass: "perf-icon--blue", value: "96", label: "Lab Requests", trend: "+15%", up: true },
  { icon: Star, iconClass: "perf-icon--orange", value: "4.8/5", label: "Avg. Rating", trend: "+0.3", up: true },
  { icon: Timer, iconClass: "perf-icon--teal", value: "18 min", label: "Avg. Time", trend: "-2 min", up: false },
];

const STATS = [
  { icon: CalendarDays, iconClass: "stat-icon--blue", label: "Today's Appointments", value: 24, action: "View all" },
  { icon: Users, iconClass: "stat-icon--green", label: "Waiting Patients", value: QUEUE.filter((p) => p.status === "waiting" || p.status === "checkedin").length, action: "View queue" },
  { icon: AlertTriangle, iconClass: "stat-icon--red", label: "Emergency Cases", value: 2, action: "View now" },
  { icon: ClipboardList, iconClass: "stat-icon--purple", label: "Action Items Open", value: ACTION_ITEMS.length, action: "View all" },
];

export default function DocDashboard() {
  const nextPatient =
    QUEUE.find((p) => p.status === "checkedin") || QUEUE.find((p) => p.status === "waiting");

  return (
    <>
      <div className="dashboard">
        {/* <section className="stat-row">
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
        </section> */}

        {/* {nextPatient && (
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
        )} */}

        <section className="dashboard__grid">
          <div className="panel panel--queue">
            <div className="panel__header">
              <h2><Users size={16} className="panel__header-icon" /> Patient Queue</h2>
              <a href="#">View All</a>
            </div>
            <div className="queue-list">
              {QUEUE.slice(0, 3).map((p) => (
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
              {SCHEDULE.slice(0, 3).map((item, i) => (
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
      </div>
  
    </>      

  );
}

