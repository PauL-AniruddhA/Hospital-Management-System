import React from 'react';
import "../../../styles/Dash-Board/patient-home.css";
import { CalendarDays, FileText, Pill, FlaskConical, Receipt,  HeartPulse, Weight, Droplets, Heart, CalendarPlus ,UserRoundSearch, MessageCircle, ChevronRight , Stethoscope, ShieldAlert,  CreditCard, CircleCheckBig, ShieldCheck, CalendarCheck, MessageSquare,  
  Ticket,
  MapPin,
  Video,
  ChevronDown,
  CheckCircle2 } from "lucide-react";
import homeimage from "../../../assets/hero-images/Hoispital Image 7.png";
import doc1 from "../../../assets/home/doc3.png";

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
  {  id: 1,doctorName: "Dr. Rajesh Sharma",doctorImage: doc1,department: "Cardiology",appointmentDate: "2026-06-18",appointmentDay:"Wednesday",appointmentTime: "10:30 AM",location: "AMS Hospital, Guwahati",type: "Video Consultation",status: "Upcoming"},

  {  id: 2,doctorName: "Dr. Priya Singh",doctorImage: "/images/doctors/doctor-2.jpg",department: "Neurology",appointmentDate: "2026-06-22",appointmentTime: "02:15 PM",location: "AMS Hospital, Guwahati",type: "In-Person",status: "Upcoming" }
];
const labReports = [
  {  id: 1,reportName: "Complete Blood Count (CBC)",category: "Hematology",uploadedDate: "2026-06-15",doctorName: "Dr. Rajesh Sharma",fileType: "PDF",fileSize: "2.3 MB",status: "Available"},

  {  id: 2,reportName: "Lipid Profile",category: "Cardiology",uploadedDate: "2026-06-10",doctorName: "Dr. Priya Singh",fileType: "PDF",fileSize: "1.8 MB",status: "Available"},

  {  id: 3,reportName: "Blood Sugar Test",category: "Diabetes",uploadedDate: "2026-06-04",doctorName: "Dr. Ankit Das",fileType: "PDF",fileSize: "1.1 MB",status: "Available"}
];
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
const invoices = [
  { id: "INV-2026-101",service: "Cardiology Consultation",amount: "₹1,200",date: "12 Jun 2026",status: "Paid" },
  { id: "INV-2026-102",service: "Blood Test Package",amount: "₹850",date: "15 Jun 2026",status: "Pending" },
  { id: "INV-2026-103",service: "MRI Scan",amount: "₹4,500",date: "20 Jun 2026",status: "Paid" },
];
const notifications = [
  {icon: CalendarCheck,title: "Appointment Confirmed",message: "Your appointment with Dr. Sharma is scheduled for 18 Jun at 10:30 AM.",time: "2 hours ago" },
  {icon: FlaskConical,title: "Lab Report Available",message: "Your Complete Blood Count (CBC) report is ready to view.",time: "Yesterday" },
  {icon: Pill,title: "Prescription Updated",message: "Dr. Sharma updated your medication plan.",time: "2 days ago" },
  { icon: CreditCard,title: "Payment Successful",message: "Invoice INV-2026-101 has been paid successfully.",time: "3 days ago" },
  { icon: MessageSquare,title: "Doctor Message",message: "Please schedule a follow-up consultation next week.",time: "5 days ago" },
];

function PatientHomeSection()  {
  const nextAppointment = appointments[0];
  const appointmentDate = new Date(nextAppointment.appointmentDate);
  const day = appointmentDate.toLocaleDateString(
    "en-US",
    { weekday: "long" }
  ).toUpperCase();
  const date = appointmentDate.getDate();
  const month = appointmentDate.toLocaleString(
      "en-US",
      { month: "short" }
    ).toUpperCase();
  const year = appointmentDate.getFullYear();
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

              <div className="appointment-status">

                <div className="appointment-title">
                  <CalendarDays size={16}/>
                  <span>Upcoming Appointment</span>
                </div>

                <div className="appointment-badge">
                  <CheckCircle2 size={14}/>
                  Confirmed
                </div>

              </div>

              <div className="doctor-avatar">
                <img
                  src={nextAppointment.doctorImage}
                  alt={nextAppointment.doctorName}
                />
              </div>

              <h3>{nextAppointment.doctorName}</h3>

              <p className="department">
                {nextAppointment.department}
              </p>

              <div className="appointment-info-row">

                <div className="info-pill">
                  <Ticket size={14}/>
                  <span>T36</span>
                </div>

                <div className="info-pill">
                  <MapPin size={14}/>
                  <span>{nextAppointment.location}</span>
                </div>
              </div>
              <div className="center-divider"/>
              <div className="appointment-actions">
                <button className="join-btn">
                  Join Consultation
                </button>
                <button className="details-btn">
                  View Details
                </button>
              </div>
            </div>
          </div>

        </section>
        <section> </section>
        {/* Lab Reports */}
        <section className="lab-widget">
          <div className="widget-header">
            <h3>Lab Reports</h3>
            <button>View All</button>
          </div>

          <div className="mini-report-list">

            {labReports.slice(0,3).map((report)=>(

              <div key={report.id} className="mini-report-item">
                <div className="report-content">
                  <div className="report-icon">
                    🧪
                  </div>

                  <div className="report-details">

                    <h4>
                      {report.reportName}
                    </h4>

                    <p>
                      {report.category}
                    </p>

                    <span>
                      {report.uploadedDate}
                    </span>

                  </div>
                </div>
                <button className="report-download" >↓</button>

              </div>

            ))}

          </div>

        </section>

      </section>

      <section className="patient-health-wrapper">
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

      <section className="billing-section">
        <div className="section-header">
          <h2>Billing & Payments</h2>
          <button>View All</button>
        </div>

        <div className="billing-stats">

          {billingStats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="billing-stat-card"
              >
                <div className="billing-icon">
                  <Icon size={24} />
                </div>

                <div>
                  <h3>{item.value}</h3>
                  <p>{item.title}</p>
                  <span>{item.status}</span>
                </div>
              </div>
            );
          })}

        </div>

        <div className="invoice-list">

          {invoices.map((invoice, index) => (
            <div
              key={index}
              className="invoice-card"
            >
              <div className="invoice-left">
                <h4>{invoice.service}</h4>

                <p>
                  {invoice.id} • {invoice.date}
                </p>
              </div>

              <div className="invoice-right">

                <h3>{invoice.amount}</h3>

                <span
                  className={
                    invoice.status === "Paid"
                      ? "paid-status"
                      : "pending-status"
                  }
                >
                  {invoice.status}
                </span>

                <div className="invoice-actions">
                  <button className="download-btn">
                    Download
                  </button>

                  {invoice.status === "Pending" && (
                    <button className="pay-btn">
                      Pay Now
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}

        </div>

      </section>

      <section className="notifications-section">
        <div className="section-header">
          <h2>Notifications</h2>
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
                  <Icon size={22} />
                </div>
                <div className="notification-content">
                  <h4>{item.title}</h4>
                  <p>{item.message}</p>
                  <span>{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

export default PatientHomeSection
