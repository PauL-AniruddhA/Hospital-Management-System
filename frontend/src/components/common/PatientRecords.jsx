import React ,{useRef,useState,useEffect}from 'react'
import "../../styles/Components/Common/Patient-Records.css";
import {
  Heart, Activity, Thermometer, Droplet, Calendar, Stethoscope,
  ArrowRight, MoreVertical, Clock, CheckCircle2, FlaskConical,
  Bell, AlertTriangle, RotateCw, CalendarCheck,
} from "lucide-react";
const STATUS_LABELS = {
  "in-consultation": "In Consultation",
  "waiting": "Waiting",
  "scheduled": "Scheduled",
  "follow-up": "Follow-up",
  "completed": "Completed",
  "high-risk": "High Risk",
  "lab-pending": "Lab Pending",
  "review-due": "Review Due",
};
const statusLabel = (s) => STATUS_LABELS[s] || s;

const PATIENTS = [
  {
    Id:1, pid: "AMS-2026-001", name: "Aniruddha Paul", initials: "AP", age: 23, gender: "Male", blood: "O+",
    status: "in-consultation",
    vitals: [
      { icon: Heart, label: "BP", value: "120/80", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "72", unit: "bpm" },
      { icon: Thermometer, label: "Temp", value: "98.6°F" },
    ],
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Today, 10:30 AM" },
      { icon: Stethoscope, label: "Department", value: "General Medicine" },
    ],
  },
  {
    Id:2, pid: "AMS-2026-014", name: "Priya Sharma", initials: "PS", age: 42, gender: "Female", blood: "A+",
    status: "waiting",
    vitals: [
      { icon: Heart, label: "BP", value: "138/88", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "84", unit: "bpm" },
      { icon: Thermometer, label: "Temp", value: "99.1°F" },
    ],
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Today, 11:00 AM" },
      { icon: Stethoscope, label: "Department", value: "General Medicine" },
    ],
  },
  {
    Id:3, pid: "AMS-2026-021", name: "Rahul Das", initials: "RD", age: 56, gender: "Male", blood: "B+",
    status: "scheduled",
    vitals: [
      { icon: Heart, label: "BP", value: "145/92", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "91", unit: "bpm" },
      { icon: Thermometer, label: "Temp", value: "98.2°F" },
    ],
    meta: [
      { icon: Calendar, label: "Appointment", value: "Today, 11:30 AM" },
      { icon: Heart, label: "Department", value: "Cardiology" },
    ],
  },
  {
    Id:4, pid: "AMS-2026-027", name: "Sneha Das", initials: "SD", age: 31, gender: "Female", blood: "O+",
    status: "follow-up",
    vitals: [
      { icon: Heart, label: "BP", value: "118/76", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "70", unit: "bpm" },
      { icon: Droplet, label: "Sugar", value: "102", unit: "mg/dL" },
    ],
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Aug 09, 2026" },
      { icon: Stethoscope, label: "Department", value: "General Medicine" },
    ],
  },
  {
    Id:5, pid: "AMS-2026-031", name: "Arjun Sharma", initials: "AS", age: 28, gender: "Male", blood: "AB+",
    status: "completed",
    vitals: [
      { icon: Heart, label: "BP", value: "124/82", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "76", unit: "bpm" },
      { icon: Thermometer, label: "Temp", value: "98.4°F" },
    ],
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Aug 07, 2026" },
      { icon: Stethoscope, label: "Department", value: "Orthopedics" },
    ],
  },
  {
    Id:6, pid: "AMS-2026-038", name: "Riya Paul", initials: "RP", age: 19, gender: "Female", blood: "B+",
    status: "completed",
    theme: "blue", // overrides the default green completed theme, matches ref image
    vitals: [
      { icon: Heart, label: "BP", value: "110/70", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "68", unit: "bpm" },
      { icon: Thermometer, label: "Temp", value: "98.1°F" },
    ],
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Aug 06, 2026" },
      { icon: Stethoscope, label: "Department", value: "General Medicine" },
    ],
  },
  {
    Id:7, pid: "AMS-2026-044", name: "Amit Roy", initials: "AR", age: 64, gender: "Male", blood: "A+",
    status: "high-risk",
    vitals: [
      { icon: Heart, label: "BP", value: "150/96", unit: "mmHg", up: true },
      { icon: Activity, label: "Pulse", value: "96", unit: "bpm", up: true },
      { icon: Thermometer, label: "Temp", value: "99.3°F" },
    ],
    condition: "Hypertension",
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Today, 09:15 AM" },
    ],
  },
  {
    Id:8, pid: "AMS-2026-052", name: "Neha Sharma", initials: "NS", age: 36, gender: "Female", blood: "O+",
    status: "lab-pending",
    labNote: { title: "Lab Reports Pending", detail: "CBC, LFT, Lipid Profile", status: "Awaiting Results" },
    meta: [
      { icon: Calendar, label: "Last Visit", value: "Aug 13, 2026" },
      { icon: Stethoscope, label: "Department", value: "General Medicine" },
    ],
  },
  {
    Id:9, pid: "AMS-2026-061", name: "Vikash Das", initials: "VD", age: 47, gender: "Male", blood: "B+",
    status: "review-due",
    vitals: [
      { icon: Heart, label: "BP", value: "132/84", unit: "mmHg" },
      { icon: Activity, label: "Pulse", value: "81", unit: "bpm" },
      { icon: Droplet, label: "Sugar", value: "128", unit: "mg/dL" },
    ],
    meta: [
      { icon: CalendarCheck, label: "Follow-up Due", value: "Aug 20, 2026" },
      { icon: Heart, label: "Department", value: "Cardiology" },
    ],
  },
];

export default function PatientRecords() {

  const gridRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const el = gridRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const newCols = width > 1100 ? 4 : width > 800 ? 3 : 2;
      setCols(newCols);
      // after layout, compare natural grid size to container, compute scale
      // e.g. scale = Math.min(width / naturalWidth, height / naturalHeight, 1)
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div   ref={gridRef} className="pcard-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, transform: `scale(${scale})`,transformOrigin: 'top left' }}>
      {PATIENTS.map((patient) => (
        <article key={patient.Id} className={`pcard pcard--${patient.theme || patient.status}`}>
          <header className="pcard__top">
            <span className="pcard__status">
              <span className="pcard__status-dot" />
              {statusLabel(patient.status)}
            </span>
            <button className="pcard__more" aria-label="More options">
              <MoreVertical size={16} />
            </button>
          </header>

          <div className="pcard__identity">
            <span className="pcard__avatar">{patient.initials}</span>
            <div className="pcard__id-block">
              <h3 className="pcard__name">{patient.name}</h3>
              <span className="pcard__id">{patient.pid}</span>
              <span className="pcard__sub">
                {patient.age} Yrs&nbsp;&nbsp;•&nbsp;&nbsp;{patient.gender}&nbsp;&nbsp;•&nbsp;&nbsp;{patient.blood}
              </span>
            </div>
            <span className="pcard__status-icon">
              <Stethoscope size={18} strokeWidth={2} />
            </span>
          </div>

          {patient.vitals && (
            <div className="pcard__vitals">
              {patient.vitals.map((v, i) => (
                <div className="pcard__vital" key={i}>
                  <v.icon size={15} className="pcard__vital-icon" />
                  <div className="pcard__vital-text">
                    <span className="pcard__vital-value">{v.value}</span>
                    {v.unit && <span className="pcard__vital-unit">{v.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {patient.labNote && (
            <div className="pcard__labnote">
              <FlaskConical size={16} />
              <div>
                <p className="pcard__labnote-title">{patient.labNote.title}</p>
                <p className="pcard__labnote-detail">{patient.labNote.detail}</p>
                <span className="pcard__labnote-status">{patient.labNote.status}</span>
              </div>
            </div>
          )}

          {patient.condition && (
            <div className="pcard__condition">
              <AlertTriangle size={14} /> {patient.condition}
            </div>
          )}

          <div className="pcard__meta">
            {patient.meta.map((m, i) => (
              <div className="pcard__meta-item" key={i}>
                <m.icon size={14} className="pcard__meta-icon" />
                <div className="pcard__meta-text">
                  <span className="pcard__meta-label">{m.label}</span>
                  <span className="pcard__meta-value">{m.value}</span>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="pcard__footer">
            View Patient Record
            <ArrowRight size={16} />
          </button>
        </article>
      ))}
    </div>
  );
}