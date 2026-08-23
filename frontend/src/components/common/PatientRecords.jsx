import React ,{useRef,useState,useEffect}from 'react'
import "../../styles/Components/Common/Patient_Records.css";
import {
  Heart, Activity, Thermometer, Droplet, Calendar, Stethoscope,
  ArrowRight, MoreVertical, Clock, CheckCircle2, FlaskConical,
  Bell, AlertTriangle, RotateCw, CalendarCheck, Eye, Phone,
  MessageCircle, VenetianMask, User, IdCard
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
    phone: "+91 98765 43210",
    status: "in-consultation",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit", date: "16 May 2025" },
  },
  {
    Id:2, pid: "AMS-2026-014", name: "Priya Sharma", initials: "PS", age: 42, gender: "Female", blood: "A+",
    phone: "+91 91234 56780",
    status: "waiting",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit", date: "15 May 2025" },
  },
  {
    Id:3, pid: "AMS-2026-021", name: "Rahul Das", initials: "RD", age: 56, gender: "Male", blood: "B+",
    phone: "+91 90071 22334",
    status: "scheduled",
    theme: "blue",
    calender: { icon: Calendar, label: "Appointment", date: "18 May 2025" },
  },
  {
    Id:4, pid: "AMS-2026-027", name: "Sneha Das", initials: "SD", age: 31, gender: "Female", blood: "O+",
    phone: "+91 98123 44556",
    status: "follow-up",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit", date: "09 Aug 2026" },
  },
  {
    Id:5, pid: "AMS-2026-031", name: "Arjun Sharma", initials: "AS", age: 28, gender: "Male", blood: "AB+",
    phone: "+91 97001 88213",
    status: "completed",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit", date: "07 Aug 2026" },
  },
  {
    Id:6, pid: "AMS-2026-038", name: "Riya Paul", initials: "RP", age: 19, gender: "Female", blood: "B+",
    phone: "+91 96543 21098",
    status: "completed",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit",  date: "06 Aug 2026" },
  },
  {
    Id:7, pid: "AMS-2026-044", name: "Amit Roy", initials: "AR", age: 64, gender: "Male", blood: "A+",
    phone: "+91 94002 77651",
    status: "high-risk",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit", date: "05 Aug 2026" },
  },
  {
    Id:8, pid: "AMS-2026-052", name: "Neha Sharma", initials: "NS", age: 36, gender: "Female", blood: "O+",
    phone: "+91 93456 09871",
    status: "lab-pending",
    theme: "blue",
    calender: { icon: Calendar, label: "Last Visit",  date: "13 Aug 2026" },
  },
  {
    Id:9, pid: "AMS-2026-061", name: "Vikash Das", initials: "VD", age: 47, gender: "Male", blood: "B+",
    phone: "+91 99887 66554",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due", date: "20 Aug 2026" },
  },
  {
    Id:10, pid: "AMS-2026-062", name: "Sanjay Kalita", initials: "SK", age: 39, gender: "Male", blood: "B+",
    phone: "+91 99887 66555",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due", date: "20 Aug 2026" },
  },
  {
    Id:11, pid: "AMS-2026-063", name: "Mridul Bora", initials: "MB", age: 52, gender: "Male", blood: "O-",
    phone: "+91 99887 66556",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due", date: "20 Aug 2026" },
  },
  {
    Id:12, pid: "AMS-2026-064", name: "Nirmali Gogoi", initials: "NG", age: 44, gender: "Female", blood: "A-",
    phone: "+91 99887 66557",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due", date: "20 Aug 2026" },
  },
  {
    Id:13, pid: "AMS-2026-065", name: "Bikash Saikia", initials: "BS", age: 58, gender: "Male", blood: "AB-",
    phone: "+91 99887 66558",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due", date: "20 Aug 2026" },
  },
  {
    Id:14, pid: "AMS-2026-066", name: "Rituparna Deka", initials: "RD", age: 33, gender: "Female", blood: "B-",
    phone: "+91 99887 66559",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due", date: "20 Aug 2026" },
  },
  {
    Id:15, pid: "AMS-2026-067", name: "Diganta Hazarika", initials: "DH", age: 61, gender: "Male", blood: "O+",
    phone: "+91 99887 66560",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due",  date: "20 Aug 2026" },
  },
  {
    Id:16, pid: "AMS-2026-068", name: "Junmoni Baruah", initials: "JB", age: 27, gender: "Female", blood: "A+",
    phone: "+91 99887 66561",
    status: "review-due",
    theme: "blue",
    calender: { icon: Calendar, label: "Follow-up Due" , date: "20 Aug 2026" },
  },
];

export default function PatientRecords() {

  const gridRef = useRef(null);
  const [gridSize, setGridSize] = useState({columns: 1,rows: 1});

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const GAP = 10;
    const MIN_CARD_WIDTH = 280;
    const MIN_CARD_HEIGHT = 190; //minimum around 190–210px

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      //  COLUMN CALCULATION
      const columns = Math.max(1,Math.floor((width + GAP) /(MIN_CARD_WIDTH + GAP)));

      //  ROW CALCULATION
      const rows = Math.max(1,Math.floor((height + GAP) /(MIN_CARD_HEIGHT + GAP)));

      //  ACTUAL ROW HEIGHT
      const rowHeight =(height -GAP * (rows - 1)) / rows;
      
      setGridSize({columns,rows,rowHeight});

    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };

  }, []);
  
  return (
    <div ref={gridRef} className="pcard-grid"
      style={{
        "--pcard-columns": gridSize.columns,
        "--pcard-row-height": `${gridSize.rowHeight}px`,
    }}>
      {PATIENTS.map((patient) => (
        <article key={patient.Id} className={`pcard pcard--${patient.theme}`}>
          <div className="pcard__identity">
            <span className="pcard__avatar">{patient.initials}</span>
            <div className="pcard__block">
              <div className="pcard__id-block">
                <h3 className="pcard__name">{patient.name}</h3>
                <span className="pcard__id-pill"> <IdCard size={14} /> {patient.pid} </span>
              </div>

            </div>
            <button className="pcard__more" aria-label="More options">
              <MoreVertical size={16} />
            </button>
          </div>

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
          
          <div className="pcard__phone-box">
            <div className="pcard__phone-left">
              <span className="pcard__phone-icon"> <Phone size={14} /> </span>
              <div className="pcard__phone-text">
                <span className="pcard__phone-label">Phone No.</span>
                <span className="pcard__phone-value">{patient.phone}</span>
              </div>
            </div>
            <span className="pcard__phone-divider" />
            <div className="pcard__call-communication">
              <button className="pcard__call-btn" aria-label={`Call ${patient.name}`}>
                <Phone size={16} />
              </button>
              <button className="pcard__call-btn" aria-label={`Call ${patient.name}`}>
                <MessageCircle size={16} />
              </button>
            </div>
          </div>

          <div className="pcard__footer-box">
            <div className="pcard__footer-left">
              <patient.calender.icon size={16} className="pcard__footer-icon" />
              <div className="pcard__footer-text">
                <span className="pcard__footer-label">{patient.calender.label}</span>
                <div className='pcard__footer-day'>
                  <span className="pcard__footer-date">{patient.calender.date}</span>
                </div>
              </div>
            </div>
            <span className="pcard__footer-divider" />
            <button type="button" className="pcard__footer-btn">
              <Eye size={14} /> View
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}