import React , { useRef, useState, useEffect } from 'react';
import "../../../styles/Dash-Board/patient-home.css";
import { CalendarDays, FileText, Pill, FlaskConical, Receipt,  HeartPulse, Weight, Droplets, Heart, CalendarPlus ,UserRoundSearch, MessageCircle, ChevronRight , Stethoscope, ShieldAlert,  CreditCard, CircleCheckBig, ShieldCheck, CalendarCheck, MessageSquare,  Ticket, MapPin,ChevronDown,CheckCircle2, ArrowRight, IndianRupee,Check,CalendarClock,Video,Download, BellRing, Tablets, GlassWater, Syringe, Droplet, SprayCan,Apple,Dumbbell,Moon,HeartHandshake,ChevronLeft,BadgeCheck,Hospital,UserRound,BedDouble } from "lucide-react";
import homeimage from "../../../assets/hero-images/Hoispital Image 7.png";
import doc1 from "../../../assets/home/doc3.png";

const ICON_REGISTRY = {
  tablet: Pill,
  capsule: Tablets,
  syrup: GlassWater,
  injection: Syringe,
  drops: Droplet,
  inhaler: SprayCan,
  ointment: FlaskConical,
};

const actions = [
  {  title: "Appointments", subtitle: "Manage your visits", icon: CalendarDays  },
  {  title: "Medical Records", subtitle: "View health history", icon: FileText  },
  {  title: "Prescriptions", subtitle: "Current medications", icon: Pill  },
  {  title: "Lab Reports", subtitle: "Download reports", icon: FlaskConical  },
  {  title: "Bills", subtitle: "Payments & invoices", icon: Receipt  },
];
const healthStats = [
  {  title: "Height",value: "172",unit: "cm",status: ""},
  {  title: "Weight",value: "72",unit: "kg",status: ""},
  {  title: "Blood Pressure",value: "120/80",unit: "mmHg",status: "Normal"},
  {  title: "Blood Sugar",value: "98",unit: "mg/dL",status: "Normal"},
  {  title: "BMI",value: "24.3",unit: "",status: "Healthy Range" },
  {  title: "Heart Rate",value: "72",unit: "bpm",status: "Normal"},
];
const quickActions = [
  {  title: "Book an Appointment", icon: CalendarPlus },
  {  title: "Book a Lab Test", icon: FlaskConical },
  {  title: "Find a Doctor", icon: UserRoundSearch},
  {  title: "Chat with Support", icon: MessageCircle },
];
const appointments = [
  {  id: 1, doctorName: "Dr. Rajesh Sharma",doctorImage: doc1,department: "Cardiology",appointmentDate: "2026-06-18",appointmentDay:"Wednesday",appointmentTime: "10:30 AM",location: "AMS Hospital, Guwahati",type: "Video Consultation",status: "Upcoming", TokenNo :"T30" ,progress:"Confirmed", degree:"MBBS | MD | MS "},

  {  id: 2,doctorName: "Dr. Priya Singh",doctorImage: "/images/doctors/doctor-2.jpg",department: "Neurology",appointmentDate: "2026-06-22",appointmentTime: "02:15 PM",location: "AMS Hospital, Guwahati",type: "In-Person",status: "Upcoming",TokenNo :"T5",progress:"Pending" }
];
// const medicines = [
//   {
//     id: 1,
//     name: "Amlodipine",
//     dose: "5mg",
//     schedule: "1 tablet · once daily, morning",
//     instruction: "Take after breakfast, with water",
//     status: "30 days",
//     refill: false,
//   },
//   {
//     id: 2,
//     name: "Atorvastatin",
//     dose: "10mg",
//     schedule: "1 tablet · once daily, night",
//     instruction: "Take before sleep",
//     status: "30 days",
//     refill: false,
//   },
//   {
//     id: 3,
//     name: "Metformin",
//     dose: "500mg",
//     schedule: "1 tablet · twice daily",
//     instruction: "Morning and night, after meals",
//     status: "Refill ",
//     refill: true,
//   },
//   {
//     id: 4,
//     name: "Aspirin",
//     dose: "75mg",
//     schedule: "1 tablet · once daily, afternoon",
//     instruction: "Take after lunch",
//     status: "30 days",
//     refill: false,
//   },
// ];
const medicines = [
  { id: 1, name: "Amlodipine", dose: "5mg", type: "tablet", schedule: { AM: "1 tab" }, foodTiming: "After food ", supply: "30 days" },
  { id: 2, name: "Atorvastatin", dose: "10mg", type: "inhaler", schedule: { PM: "15ml" }, foodTiming: "Bedtime", supply: "30 days" },
  { id: 3, name: "Metformin", dose: "500mg", type: "injection", schedule: { AM: "1 tab", PM: "1 tab" }, foodTiming: "After food", refill: true },
  { id: 4, name: "Aspirin", dose: "75mg", type: "drops", schedule: { Noon: "1 tbsp" }, foodTiming: "After food", supply: "30 days" },
  { id: 4, name: "Aspirin", dose: "75mg", type: "drops", schedule: { Noon: "1 tbsp" }, foodTiming: "After food", supply: "30 days" },
];
const slots = ["AM", "Noon", "PM"];
const labReports = [
  {  id: 1,reportName: "Complete Blood Count (CBC)",category: "Hematology",uploadedDate: "2026-06-15",doctorName: "Dr. Rajesh Sharma",fileType: "PDF",fileSize: "2.3 MB",status: "Available"},

  {  id: 2,reportName: "Lipid Profile",category: "Cardiology",uploadedDate: "2026-06-10",doctorName: "Dr. Priya Singh",fileType: "PDF",fileSize: "1.8 MB",status: "Available"},

  {  id: 3,reportName: "Blood Sugar Test",category: "Diabetes",uploadedDate: "2026-06-04",doctorName: "Dr. Ankit Das",fileType: "PDF",fileSize: "1.1 MB",status: "Available"}
];
const healthAdvice = [
  {  id: 1,  title: "Stay Hydrated",  description: "Drink 8–10 glasses of water daily to maintain proper hydration and body functions.",  icon: Droplets,  category: "Daily Habit",  color: "#E8F7FF" },

  {  id: 2,  title: "Eat Healthy",  description: "Include fruits, vegetables, whole grains and lean proteins in your daily meals.",  icon: Apple,  category: "Nutrition",  color: "#FFF4E6"   },

  {  id: 3,  title: "Exercise Daily",  description: "Aim for at least 30 minutes of moderate physical activity every day.",  icon: Dumbbell,  category: "Fitness",  color: "#F3F0FF"   },

  {  id: 4,  title: "Sleep Well",  description: "Maintain a consistent sleep schedule and get 7–8 hours of quality sleep.",  icon: Moon,  category: "Wellness",  color: "#EEF5FF"   },

  {  id: 5,  title: "Manage Stress",  description: "Practice meditation, breathing exercises or mindfulness for better mental health.",  icon: HeartHandshake,  category: "Mental Health",  color: "#FFF0F3"   },

  {  id: 6,  title: "Regular Checkup",  description: "Visit your doctor regularly for preventive health screenings and early diagnosis.",  icon: Stethoscope,  category: "Prevention",  color: "#ECFFF3"   },

];
const insurance = {
  status: "Active",
  provider: "HealthCare Plus Insurance",
  memberId: "PT-458921",
  policyNo: "HC-45789-AX",
  type: "Cashless",
  validity: "31 Dec 2027",
  hospital: "AMS Hospital",
  room: "Private Room",
  coverage: "5,00,000",
};

const medicalRecords = { diagnoses: 12,surgeries: 2,allergies: 3 };
const recentRecords = [
  { title: "Annual Health Checkup", date: "12 Jun 2026" },
  { title: "Cardiology Consultation", date: "28 May 2026" },
  { title: "Diabetes Follow-up", date: "15 May 2026" },
];
const billingStats = [
  { title: "Outstanding",value: "₹2,450",icon: Receipt,status: "Pending" },
  { title: "Paid This Year",value: "₹18,700",icon: CircleCheckBig,status: "Completed" },
  { title: "Insurance Claims",value: "4",icon: ShieldCheck,status: "Processed" },
];
// const invoices = [
//   { id: "INV-2026-101",service: "Cardiology Consultation",amount: "₹1,200",date: "12 Jun 2026",status: "Paid" },
//   { id: "INV-2026-102",service: "Blood Test Package",amount: "₹850",date: "15 Jun 2026",status: "Pending" },
//   { id: "INV-2026-103",service: "MRI Scan",amount: "₹4,500",date: "20 Jun 2026",status: "Paid" },
// ];
const notifications = [
  {icon: CalendarCheck,title: "Appointment Confirmed",message: "Your appointment with Dr. Sharma is scheduled for 18 Jun at 10:30 AM.",time: "2 hours ago" },
  {icon: FlaskConical,title: "Lab Report Available",message: "Your Complete Blood Count (CBC) report is ready to view.",time: "Yesterday" },
  {icon: Pill,title: "Prescription Updated",message: "Dr. Sharma updated your medication plan.",time: "2 days ago" },
  { icon: CreditCard,title: "Payment Successful",message: "Invoice INV-2026-101 has been paid successfully.",time: "3 days ago" },
  { icon: MessageSquare,title: "Doctor Message",message: "Please schedule a follow-up consultation next week.",time: "5 days ago" },
];


function PatientHomeSection()  {

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = healthAdvice[activeIndex];
  const ActiveIcon = activeItem.icon;
 
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
 
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
 
        if (mostVisible) {
          const idx = cardRefs.current.indexOf(mostVisible.target);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { root: track, threshold: [0.5, 0.75, 1] }
    );
 
    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);
 
  const scrollToIndex = (index) => {
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const nextAppointment = appointments
    .filter((a) => a.status === "Upcoming")
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))[0];

  if (!nextAppointment) {return <div className="patient-home">{/* empty-state UI */}</div>; }

  const [year, month0, dateNum] = nextAppointment.appointmentDate
    .split("-")
    .map(Number);
  const appointmentDate = new Date(year, month0 - 1, dateNum);

  const day = appointmentDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const date = appointmentDate.getDate();
  const month = appointmentDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const displayYear = appointmentDate.getFullYear(); // renamed — don't shadow the destructured `year`

   return (
    <div className="patient-home">

      <section className="patient-hero-overlay">
        <div className="patient-glass-card">
          <img src={homeimage} alt="Hospital" className="hero-bg-image-blur" />
          <img src={homeimage} alt="Hospital" className="hero-bg-image" />
          <div className="hero-blur-transition" />
          <div className="patient-info">
            <div className="patient-profile-card">
              <h1>Aniruddha Paul</h1>
              <div className='patient-profile-divider' />
              <div className='patient-header-row'>
                <div className="patient-id">
                  Patient ID - AMS-2026-001
                </div>
                <div className="patient-meta">
                  <span>Male</span><div className="meta-divider"/>
                  <span>23 Years</span><div className="meta-divider"/>
                  <span>O+</span>
                </div>
              </div>

            </div>
            <div className="patient-divider" />
            <div className="health-stats-grid">

              {healthStats.map((item, index) => (
                <div key={index} className="health-stat-card">
                  <span>{item.title}</span>

                  <h3>
                    {item.value}
                    <small>{item.unit}</small>
                  </h3>

                  <p>{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="patient-dashboard-card">
        <div className="patient-actions-grid">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <div
                key={index}
                className="patient-action-card"
              >
                <div className="patient-action-icon">
                  <Icon size={28} />
                </div>

                <div className="patient-action-content">
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <section className="patient-dashboard-widgets">
        
        {/* Billing Preview */}
        <section className="bill-card">
          <div className="bill-card-header">
            <div className="bill-header-left">
              <div className="bill-icon-tile">
                <IndianRupee size={24} />
              </div>
              <div>
                <h3>Payment</h3>
              </div>
            </div>
            <span className="bill-badge">
              <div>3 </div>  
              <div>Unpaid</div>  
            </span>
          </div>

          <div className="bill-hero">
            <div className="bill-hero-text">
              <span className="bill-hero-label">Outstanding Balance </span>
              <span className="bill-hero-value">
                <IndianRupee className="rupee-icon"/>
                <div>6,280</div>
                </span>
              <span className="bill-hero-sub">Due by Jul 5, 2026</span>
            </div>
          </div>

          <div className="bill-stat-grid">
            <div className="bill-stat-chip">
              <span className="bill-stat-num">3</span>
              <span className="bill-stat-label">Unpaid bills</span>
            </div>
            <div className="bill-stat-chip">
              <span className="bill-stat-num">₹18,700</span>
              <span className="bill-stat-label">Paid this year</span>
            </div>
            <div className="bill-stat-chip">
              <span className="bill-stat-num">4</span>
              <span className="bill-stat-label">Claims processed</span>
            </div>
          </div>

          <div className="bill-footer">
            <button className="bill-btn-solid">
              Pay now <ArrowRight size={16} />
            </button>
          </div>

        </section>
        
        {/* Appointments */}
        <section className="appointment-widget">
          <div className="appointment-body">

            {/* LEFT DATE RAIL */}
            <div className="appointment-side">

              <div className="icon-circle">
                <CalendarDays size={22}/>
              </div>

              <span className="day">
                {day}
              </span>
              <span className="date-number">
                {date}
              </span>

              <span className="month">
                {month}
              </span>

              <span className="year">
                {year}
              </span>

              <div className="side-divider"/>

              {/* <div className="icon-circle small">
                <Clock3 size={18}/>
              </div> */}

              <span className="label">
                Appointment
              </span>

              <h4 className="time">
                {nextAppointment.appointmentTime}
              </h4>

            </div>

            {/* CENTER */}
            <div className="appointment-details">
              {/* Header */}
              <div className="appointment-status">

                <div className="appointment-title">
                  <CalendarDays size={16}/>
                  <span>Upcoming Appointment</span>
                </div>

                <div className="appointment-badge">
                  <CheckCircle2 size={14}/>
                  {nextAppointment.progress}
                </div>

              </div>

              <div className="doctor-profile">
                <div className="doctor-content">
                  <h3>{nextAppointment.doctorName}</h3>
                  <p className="degree">
                    {nextAppointment.degree} 
                  </p>
                  <p className="department">
                    {nextAppointment.department} Specialist
                  </p>
                </div>
                <div className="doctor-avatar">
                    <img
                        src={nextAppointment.doctorImage}
                        alt={nextAppointment.doctorName}
                    />
                </div>
                
                <div className="info-pill-1">
                  <MapPin size={14}/>
                  <span>{nextAppointment.location}</span>
                </div>
                
                <div className="info-pill-2">
                  <Ticket size={14}/>
                  <span>{nextAppointment.TokenNo}</span>
                </div>
              </div>
              

              <div className="center-divider"/>
              <div className="appointment-actions">
                <button className="join-btn">
                  <Video size={16} />
                  Join Consultation
                </button>
                <button className="details-btn">
                  <FileText size={16} />
                  View Details
                </button>
              </div>
              <div className="view-more">
                <button className="view-more-btn">
                  <CalendarDays size={18}/>
                  <span>View Upcoming Appointments</span>
                  <ArrowRight size={16}/>
                </button>
              </div>
            </div>
          </div>

        </section>

        {/* Lab Report Card */}
         <section className="lab-report-card-v2">
          <div className="lrc-status-strip abnormal">
            <div className="lrc-icon-badge">
              <FlaskConical size={24} />
            </div>
            <span>Report</span>

            <div className="lrc-stats">
              <span className="lrc-stat">
                {/* <CheckCircle2 size={14}  /> */}
                <b> 20 /</b>
                <b> 30 </b>
              </span>
            </div>
          </div>

          <div className="lrc-body">

            <div className="lrc-header">
              <div className="lrc-icon-tile">
                <FlaskConical size={22} />
              </div>
              <div className="lrc-title-block">
                <h3>{labReports[1].reportName}</h3>
                <p>{labReports[1].category} &middot; {labReports[1].doctorName}</p>
              </div>
            </div>

            <div className="lrc-divider" />

            {/* <div className="lrc-range-section">
              <div className="lrc-range-top">
              <span className="lrc-range-name">LDL Cholesterol</span>
              <span className="lrc-range-value">142 <small>mg/dL</small></span>
              </div>
              
              <div className="lrc-range-track">
              <div className="lrc-zone normal" style={{ width: "55%" }} />
              <div className="lrc-zone borderline" style={{ width: "25%" }} />
              <div className="lrc-zone high" style={{ width: "20%" }} />
              <div className="lrc-marker" style={{ left: "78%" }} />
              </div>
              
              <div className="lrc-range-labels">
              <span>Normal</span>
              <span>Borderline</span>
              <span>High</span>
              </div>
              </div> */}

            <div className="lrc-meta-row">
              <div className="lrc-meta-item">
                <CalendarDays size={14} />
                <span>{labReports[1].uploadedDate}</span>
              </div>
              <div className="lrc-meta-item">
                <FileText size={14} />
                <span>{labReports[1].fileType} &middot; {labReports[1].fileSize}</span>
              </div>
            </div>

          <div className="lrc-divider" />
          </div>
          

          <div className="lrc-footer">
            <button className="lrc-btn-ghost">View full report</button>
            <button className="lrc-btn-solid">Download</button>
          </div>
          <div className="lrc-footer lrc-footer-single">
            <button className="lrc-btn-solid full">View more reports</button>
          </div>

        </section>

      </section>
      
      <section className="patient-prescription-notification">
        {/* Prescription */}
        <section className="prescription-card">

          {/* HEADER */}
          <div className="prescription-header">
            <div className="header-left">
              <div className="icon-circle">
                <FileText size={20} />
              </div>
              <h2>Prescription</h2>
            </div>
            <div className="rx-number">
              Rx-2026-0417
            </div>
            {/* <div className="rx-number">
              Rx-2026-0417
            </div> */}
            
          </div>

                {/* DOCTOR */}

                {/* <div className="doctor-section">
                  <div className="doctor-left">
                    <div className="icon-circle doctor">
                      <Stethoscope size={22} />
                    </div>
                    <div>
                      <h3>Dr. Rajesh Sharma</h3>
                      <p>MBBS, MD · Cardiology</p>
                    </div>
                  </div>

                  <div className="issued-date">

                    <span>Issued</span>

                    <strong>18 Jun 2026</strong>

                  </div>

                </div> */}

          {/* MEDICINES */}
          <div className="medicine-list-wrapper">
            <div className="medicine-list">

              {medicines.map((medicine) => {
                const Icon = ICON_REGISTRY[medicine.type] ?? Pill;   // now scoped per-iteration
                return (
                  <div key={medicine.id} className="medicine-card" >
                    <div className="medicine-name">
                      <div className={`medicine-icon medicine-icon--${medicine.type}`}>
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <h4>
                          {medicine.name}
                          <span>{medicine.dose}</span>
                        </h4>
                      </div>
                    </div>

                    <div className="dose-timeline">
                      {slots.map((slot, i) => (
                        <React.Fragment key={slot}>
                          <div className="dose-stack">
                            <span className={`dose-pill ${medicine.schedule[slot] ? "active" : ""}`}>
                              {slot}
                            </span>
                            <span className={`dose-qty ${medicine.schedule[slot] ? "" : "empty"}`}>
                              {medicine.schedule[slot] || "x"}
                            </span>
                          </div>
                          {i < slots.length - 1 && <span className="dose-line" />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="food-tag">
                      <span > {medicine.foodTiming} </span>
                    </div>
                    <div className={medicine.refill ? "status warning" : "status green"}>
                      {medicine.refill ? "Refill" : medicine.supply}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div className="prescription-footer">

            <button className="outline-btn">
              View Full Prescription
            </button>

            <button className="download-btn">
              <Download size={18} />
              Download
            </button>

          </div>
        </section>

        {/* Notification */}
        <section className="notifications-section">
          <div className="section-header">
            <div className="ing-left">
              <div className="ing-icon">
                <BellRing  size={20} strokeWidth={2.2}  />
              </div>

              <h2>Notifications</h2>
            </div>
            <button>Mark All Read</button>
          </div>
          <div className="notification-list">
            {notifications.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="notification-card"
                >
                  <div className="notification-icon">
                    <Icon size={20} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-time">
                      <h4>{item.title}</h4>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.message}</p>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>

      <section className="patient-health-wrapper">
        
        {/* Insurance  */}
        <section className="insurance-card">
          {/* Header */}
          <div className="insurance-header">
            <div className="insurance-title">
              <div className="insurance-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3>Insurance</h3>
              </div>
            </div>
    
            <span className="insurance-status">
              <span className="status-dot" />
              {insurance.status}
            </span>
          </div>
    
          {/* ID band */}
          <div className="insurance-id-band">
            <p className="id-label">Provider</p>
            <p className="id-provider">{insurance.provider}</p>
    
            <div className="id-row">
              <div>
                <p className="id-label">Member ID</p>
                <p className="id-value">{insurance.memberId}</p>
              </div>
              <div className="id-right">
                <p className="id-label">Policy No.</p>
                <p className="id-value">{insurance.policyNo}</p>
              </div>
            </div>
          </div>
    
          {/* Detail grid */}
          <div className="insurance-grid">
            <div className="insurance-item">
              <p className="item-label">
                <ShieldCheck size={13} /> Coverage
              </p>
              <p className="item-value">{insurance.type}</p>
            </div>
    
            <div className="insurance-item bordered-left">
              <p className="item-label">
                <CalendarDays size={13} /> Valid Till
              </p>
              <p className="item-value">{insurance.validity}</p>
            </div>
    
            <div className="insurance-item">
              <p className="item-label">
                <Hospital size={13} /> Network Hospital
              </p>
              <p className="item-value">{insurance.hospital}</p>
            </div>
    
            <div className="insurance-item bordered-left">
              <p className="item-label">
                <BedDouble size={13} /> Room
              </p>
              <p className="item-value">{insurance.room}</p>
            </div>
          </div>
    
          {/* Footer */}
          <div className="insurance-footer">
            <div>
              <p className="coverage-label">Total coverage</p>
              <p className="coverage-value">
                <IndianRupee size={16} />
                {insurance.coverage}
              </p>
            </div>
    
            <button className="view-policy-btn">
              View Policy
              <ArrowRight size={15} />
            </button>
          </div>
    
        </section>

        {/* Quick Links */}    
        <section className="patient-quick-links">
          <h2>Quick Actions</h2>
          {quickActions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="quick-link-item">
                <div className="quick-link-left">
                  <Icon size={20} />
                  <span>{item.title}</span>
                </div>
                <ChevronRight size={18} />
              </div>
            );
          })}
        </section>

        {/* Health Advice */}
        <section className="health-carousel">
          <div className="health-carousel-header">
            <div className="carousel-header">
              <div className="header-icon-tile" style={{ background: activeItem.color }}>
                <ActiveIcon size={20} />
              </div>
              <h2>Health Advice</h2>
            </div>
            <button>View All</button>
          </div>
    
          <div className="carousel-wrapper">
            <div className="carousel-track" ref={trackRef}>
              {healthAdvice.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    className="health-card"
                    key={item.id}
                    ref={(el) => (cardRefs.current[i] = el)}
                  >
                    <div className="health-image" style={{ background: item.color }}>
                      <Icon size={56} />
                    </div>
    
                    <div className="health-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span>{item.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
    
          <div className="carousel-dots">
            {healthAdvice.map((item, i) => (
              <span
                key={item.id}
                className={i === activeIndex ? "active" : ""}
                onClick={() => scrollToIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>
        

      </section>

      <section className="medical-records-section">
        <div className="section-header">
          <h2>Medical Records</h2>
          <button>View Complete</button>
        </div>
        <div className="record-stats">

          <div className="record-stat-card">
            <FileText size={24} />
            <h3>{medicalRecords.diagnoses}</h3>
            <p>Diagnoses</p>
          </div>

          <div className="record-stat-card">
            <Stethoscope size={24} />
            <h3>{medicalRecords.surgeries}</h3>
            <p>Surgeries</p>
          </div>

          <div className="record-stat-card">
            <ShieldAlert size={24} />
            <h3>{medicalRecords.allergies}</h3>
            <p>Allergies</p>
          </div>

        </div>
        <div className="recent-records">
          <h3>Recent Records</h3>
          {recentRecords.map((record, index) => (
            <div className="record-item" key={index}>
              <div>
                <h4>{record.title}</h4>
                <p>{record.date}</p>
              </div>
              <button>View</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default PatientHomeSection