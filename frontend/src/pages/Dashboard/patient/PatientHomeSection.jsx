import React , { useRef, useState, useEffect,useMemo } from 'react';
import "../../../styles/Dash-Board/patient-home.css";
import { CalendarDays, FileText, Pill, FlaskConical, Receipt,  HeartPulse, Weight, Droplets, Heart, CalendarPlus ,UserRoundSearch, MessageCircle, ChevronRight , Stethoscope, ShieldAlert,  CreditCard, CircleCheckBig, ShieldCheck, CalendarCheck, MessageSquare,  Ticket, MapPin,ChevronDown,CheckCircle2, ArrowRight, IndianRupee,Check,CalendarClock,Video,Download, BellRing, Tablets, GlassWater, Syringe, Droplet, SprayCan,Apple,Dumbbell,Moon,HeartHandshake,ChevronLeft,BadgeCheck,Hospital,UserRound,BedDouble,Activity ,Sparkles, Smile, Glasses,Monitor,Eye,Zap,Bone,ClipboardList,Search}  from "lucide-react";
import homeimage from "../../../assets/hero-images/Hoispital Image 7.png";
import doc1 from "../../../assets/home/doc3.png";
import cc1 from "../../../assets/carousel cards/1-stay-hydrated-copy.png";
import cc2 from "../../../assets/carousel cards/2-eat-healthy-copy.png";
import cc3 from "../../../assets/carousel cards/3-move-every-day-copy.png";
import cc4 from "../../../assets/carousel cards/4-get-quality-sleep-copy.png";
import cc5 from "../../../assets/carousel cards/5-take-time-to-relax-copy.png";

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
;
const quickActions = [
  {
    icon: FlaskConical,
    title: "Book a Lab Test",
    color: "blue",
  },
  {
    icon: Pill,
    title: "Order Medicines",
    color: "purple",
  },
  {
    icon: UserRoundSearch,
    title: "Find a Doctor",
    color: "teal",
  },
  {
    icon: MessageCircle,
    title: "Chat with Support",
    color: "orange",
  },
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
// const healthAdvice = [
//   {  id: 1,  title: "Stay Hydrated",  description: "Drink 8–10 glasses of water daily to maintain proper hydration and body functions.",  icon: Droplets,  category: "Daily Habit",  color: "#E8F7FF" },

//   {  id: 2,  title: "Eat Healthy",  description: "Include fruits, vegetables, whole grains and lean proteins in your daily meals.",  icon: Apple,  category: "Nutrition",  color: "#FFF4E6"   },

//   {  id: 3,  title: "Exercise Daily",  description: "Aim for at least 30 minutes of moderate physical activity every day.",  icon: Dumbbell,  category: "Fitness",  color: "#F3F0FF"   },

//   {  id: 4,  title: "Sleep Well",  description: "Maintain a consistent sleep schedule and get 7–8 hours of quality sleep.",  icon: Moon,  category: "Wellness",  color: "#EEF5FF"   },

//   {  id: 5,  title: "Manage Stress",  description: "Practice meditation, breathing exercises or mindfulness for better mental health.",  icon: HeartHandshake,  category: "Mental Health",  color: "#FFF0F3"   },

//   {  id: 6,  title: "Regular Checkup",  description: "Visit your doctor regularly for preventive health screenings and early diagnosis.",  icon: Stethoscope,  category: "Prevention",  color: "#ECFFF3"   },

// ];
const healthAdvice = [
  {
    id: 1,
    title: "Stay Hydrated",
    description:"Drink 8–10 glasses of water daily to maintain proper hydration and body functions.",
    icon: Droplets,
    category: "Daily Wellness",
    headerGradient: "linear-gradient(135deg, #0B4F92 0%, #1C6BC5 100%)",
    themes:"linear-gradient(135deg, #F9FCFF 0%, #CFE8FF 45%, #79B9FF 100%)",
    color: "#EAF6FF",
    accent: "#2F9BE8",
    btn:"#135caa",
    image: cc1,
    stats: [
      { icon: Droplets, label: "Prevents Dehydration" },
      { icon: HeartHandshake, label: "Supports Heart Health" },
      { icon: Stethoscope, label: "Improves Focus" },
      { icon: Dumbbell, label: "Boosts Energy" },
    ],
  },
  {
    id: 2,
    title: "Eat Healthy",
    description:
      "Fill half your plate with vegetables and fruits while including lean proteins and whole grains for a balanced diet.",
    icon: Apple,
    category: "Nutrition",
    headerGradient: "linear-gradient(135deg, #B85A00 0%, #D97706 100%)",
    themes:"linear-gradient(135deg, #FFFDF8 0%, #FFE3B6 45%, #FFBE63 100%)",
    color: "#FFF1E6",
    accent: "#F08A3C",
    btn:"#c96903",
    image: cc2,
    stats: [
      { icon: Apple, label: "Rich in Vitamins" },
      { icon: Droplets, label: "High Fiber" },
      { icon: HeartHandshake, label: "Heart Friendly" },
      { icon: Dumbbell, label: "More Energy" },
    ],
  },
  {
    id: 3,
    title: "Move Every Day",
    description:
      "Aim for 30 minutes of walking, cycling, or moderate exercise daily to strengthen your heart and improve overall fitness.",
    icon: Dumbbell,
    category: "Fitness",
    headerGradient:"linear-gradient(135deg, #4C2FC4 0%, #6D52EB 100%)",
    themes:"linear-gradient(135deg, #FCFAFF 0%, #E3D8FF 45%, #AA8FFF 100%)",
    color: "#F2EEFF",
    accent: "#7C5CFC",
    btn:"#5d41d8",
    image: cc3,
    stats: [
      { icon: Dumbbell, label: "Strong Muscles" },
      { icon: HeartHandshake, label: "Better Circulation" },
      { icon: Stethoscope, label: "Healthy Weight" },
      { icon: Moon, label: "Improves Mood" },
    ],
  },
  {
    id: 4,
    title: "Take Time to Relax",
    description:
      "Practice meditation, breathing exercises or mindfulness for better mental health.",
    icon: HeartHandshake,
    category: "Mental Wellness",
    headerGradient: "linear-gradient(135deg, #167447 0%, #28A768 100%)",
    themes:"linear-gradient(135deg, #F8FFF9 0%, #D8F8E6 45%, #6FD49D 100%)",
    color: "#E9FBF1",
    accent: "#2FBE72",
    btn:"#1b8250",
    image: cc5,
    stats: [
      { icon: Stethoscope, label: "Better Focus" },
      { icon: HeartHandshake, label: "Lower Blood Pressure" },
      { icon: Moon, label: "Positive Mood" },
      { icon: Droplets, label: "Better Sleep" },
    ],
  },
  {
    id: 5,
    title: "Get Quality Sleep",
    description:
      "Adults should sleep 7–9 hours every night to improve immunity, memory, and physical recovery.",
    icon: Moon,
    category: "Healthy Sleep",
    headerGradient: "linear-gradient(135deg, #2549A7 0%, #3D6FE3 100%)",
    themes:"linear-gradient(135deg, #FAFCFF 0%, #D6E3FF 45%, #95B5FF 100%)",
    color: "#EAF0FF",
    accent: "#4C6FE7",
    btn:"#305bc4",
    image: cc4,
    stats: [
      { icon: HeartHandshake, label: "Better Recovery" },
      { icon: Stethoscope, label: "Sharper Memory" },
      { icon: Droplets, label: "Strong Immunity" },
      { icon: Moon, label: "Reduces Stress" },
    ],
  },
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

const medicalHistory = [
  {
    diagnosis: "Type 2 Diabetes",
    doctorName: "Dr. Meera Nair",
    department: "Endocrinology",
    diagnosedDate: "2024-03-04",
    hospital: "AMS Main Campus",
    status: "ongoing",
    severity: "moderate",
    icon: Activity,
  },
  {
    diagnosis: "Fractured Radius (Left arm)",
    doctorName: "Dr. Karan Vohra",
    department: "Orthopedics",
    diagnosedDate: "2023-11-12",
    hospital: "AMS City Branch",
    status: "resolved",
    severity: "mild",
    icon: Bone,
  },
  {
    diagnosis: "Hypertension",
    doctorName: "Dr. Rajesh Sharma",
    department: "Cardiology",
    diagnosedDate: "2026-01-18",
    hospital: "AMS Main Campus",
    status: "monitoring",
    severity: "moderate",
    icon: HeartPulse,
  },
  {
    diagnosis: "Routine ECG Check",
    doctorName: "Dr. Rajesh Sharma",
    department: "Cardiology",
    diagnosedDate: "2026-01-05",
    hospital: "AMS Main Campus",
    status: "resolved",
    severity: "mild",
    icon: HeartPulse,
  },
];

function formatMonthDay(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function formatYear(dateStr) {
  return new Date(dateStr).getFullYear();
}

function PatientHomeSection()  {
const [searchQuery, setSearchQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
  const CARD_COUNT = healthAdvice.length;
  const [current, setCurrent] = useState(1);          // 1..CARD_COUNT are real slides
  const [withTransition, setWithTransition] = useState(true);
  const isHoveringRef = useRef(false);
  const autoplayTimerRef = useRef(null);

  const realIndex = (current - 1 + CARD_COUNT) % CARD_COUNT;
  const activeItem = healthAdvice[realIndex];
  const ActiveIcon = activeItem.icon;
 
  const extendedAdvice = [ healthAdvice[CARD_COUNT - 1], ...healthAdvice, healthAdvice[0] ]

  const sortedHistory = useMemo(
    () => [...medicalHistory].sort((a, b) => new Date(b.diagnosedDate) - new Date(a.diagnosedDate)),
    []
  );

  const filteredHistory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sortedHistory.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesSearch =
        query === "" ||
        item.diagnosis.toLowerCase().includes(query) ||
        item.doctorName.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [sortedHistory, searchQuery, statusFilter]);

  const goToSlide = (index) => {
    setWithTransition(true);
    setCurrent(index);
  };
  const goNext = () => goToSlide(current + 1);
  const goPrev = () => goToSlide(current - 1);
  const goToDot = (dotIndex) => goToSlide(dotIndex + 1);

  // autoplay
  useEffect(() => {
    autoplayTimerRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        setWithTransition(true);
        setCurrent((c) => c + 1);
      }
    }, 4000);
    return () => clearInterval(autoplayTimerRef.current);
  }, []);

  // when we land on a cloned slide, snap invisibly back to the real one
  const handleTransitionEnd = () => {
    if (current === 0) {
      setWithTransition(false);
      setCurrent(CARD_COUNT);
    } else if (current === CARD_COUNT + 1) {
      setWithTransition(false);
      setCurrent(1);
    }
  };

  // re-enable transition on the next frame after a silent jump
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  
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
    <>
    <div className="patient-home">
        <section className="patient-hero-overlay">
          <div className="patient-glass-card">
            <img src={homeimage} alt="Hospital" className="hero-bg-image-blur" />
            <img src={homeimage} alt="Hospital" className="hero-bg-image" />
            <div className="hero-blur-transition" />
            <div className="patient-info">
              <div className="patient-profile-card">
                <h1>Aniruddha Paul</h1>
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
                <IndianRupee size={22} />
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
              <FlaskConical size={22} />
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
                <FileText size={22} />
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
                <BellRing  size={22} strokeWidth={2.2}  />
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
        
        {/* Health Advice */}
        <section className="health-carousel"style={{ background: activeItem.themes }}>
          <div className="health-carousel-header" style={{ "--header-gradient": activeItem.headerGradient }} >
            <div className="carousel-header">
              <div className="header-icon-tile" style={{ background: activeItem.color }}>
                <ActiveIcon size={22} color={activeItem.accent} />
              </div>
              <h2>Health Advice</h2>
            </div>
            <button className="health-card-view-all-btn" style={{ "--header-btn": activeItem.btn}}> View All <ChevronRight size={14} /> </button>
          </div>

          <div className="carousel-wrapper" onMouseEnter={() => (isHoveringRef.current = true)} onMouseLeave={() => (isHoveringRef.current = false)} >

            <div className="carousel-viewport">
              <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)`, transition: withTransition ? "transform 0.5s ease" : "none" ,}} onTransitionEnd={handleTransitionEnd}>
                {extendedAdvice.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div className="health-card" key={`${item.id}-${i}`}>
                      <div className="health-card-top">
                        <img src={item.image} alt={item.title} className="health-illustration-img" />
                        <div className="health-content">
                          <span className="health-tag" style={{ background: item.color, color: item.accent }}>
                            {item.category}
                          </span>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                          <button className="health-learn-more" style={{ color: item.accent, borderColor: item.accent }}>
                            Learn More
                            <span className="health-learn-more-arrow" style={{ background: item.accent }}>
                              <ArrowRight size={13} color="#fff" />
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="health-stats-bar">
                        {item.stats.map((stat, si) => {
                          const StatIcon = stat.icon;
                          return (
                            <div className="health-stat-chip" key={si}>
                              <span className="health-stat-icon" style={{ background: item.color }}>
                                <StatIcon size={16} color={item.accent} />
                              </span>
                              <span className="health-stat-label">{stat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="carousel-dots">
            {healthAdvice.map((item, i) => (
              <span
                key={item.id}
                className={i === realIndex ? "active" : ""}
                onClick={() => goToDot(i)}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Quick Links */}    
        <section className="patient-quick-links">
          {/* Header card */}
          <div className="quick-header-card">
            <div className="quick-header-icon">
              <Zap size={22} />
            </div>
            <div className="quick-header-text">
              <h2>Quick Actions</h2>
            </div>
          </div>
        
          {/* Tree connector-1*/}
          <div className="tree-connector">
            <span className="line line-trunk-top" />
            <span className="dot dot-junction" />
            <span className="elbow-left" />
            <span className="elbow-right" />
            <span className="dot dot-left" />
            <span className="dot dot-right" />
          </div>
            
          <div className="quick-link-grid">
            {/* Row 1 tiles */}
            {quickActions.slice(0, 2).map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="quick-tile">
                  <div className="quick-tile-icon">
                    <Icon size={22} />
                  </div>
                  <span>{item.title}</span>
                </div>
              );
            })}
        
            {/* Tree connector-2*/}
            <div className="tree-connector-2">
              <span className="dot dot-junction-2" />
              <span className="elbow-left-2" />
              <span className="elbow-right-2" />
              <span className="dot dot-left-2" />
              <span className="dot dot-right-2" />
            </div>
        
            {/* Row 2 tiles */}
            {quickActions.slice(2, 4).map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index + 2} className="quick-tile">
                  <div className="quick-tile-icon">
                    <Icon size={22} />
                  </div>
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Insurance  */}
        <section className="insurance-card">
          {/* Header */}
          <div className="insurance-header">
            <div className="insurance-title">
              <div className="insurance-icon">
                <ShieldCheck size={22} />
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
              <span className="item-icon">
                <ShieldCheck size={15} />
              </span>
              <div className="item-text">
                <p className="item-label">Coverage</p>
                <p className="item-value">{insurance.type}</p>
              </div>
            </div>
    
            <div className="insurance-item">
              <span className="item-icon">
                <CalendarDays size={15} />
              </span>
              <div className="item-text">
                <p className="item-label">Valid Till</p>
                <p className="item-value">{insurance.validity}</p>
              </div>
            </div>
    
            <div className="insurance-item">
              <span className="item-icon">
                <Hospital size={15} />
              </span>
              <div className="item-text">
                <p className="item-label">Network Hospital</p>
                <p className="item-value">{insurance.hospital}</p>
              </div>
            </div>
    
            <div className="insurance-item">
              <span className="item-icon">
                <BedDouble size={15} />
              </span>
              <div className="item-text">
                <p className="item-label">Room</p>
                <p className="item-value">{insurance.room}</p>
              </div>
            </div>
          </div>
    
          {/* Footer - redesigned: coverage as a highlighted pill, button balanced beside it */}
          <div className="insurance-footer">
            <div className="coverage-box">
              <span className="coverage-icon">
                <IndianRupee size={16} />
              </span>
              <div>
                <p className="coverage-label">Total coverage</p>
                <p className="coverage-value">₹{insurance.coverage}</p>
              </div>
            </div>
    
            <button className="view-policy-btn">
              View Policy
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
            
      </section>

      <section className="medical-history-section">
        <div className="section-header">
          <div className="ing-left">
            <div className="ing-icon">
              <ClipboardList size={22} strokeWidth={2.2} />
            </div>
            <h2>Medical History</h2>
          </div>
          <button className="history-view-all">View All</button>
        </div>
        <div className="medical-header-divider"/>

        <div className="history-toolbar">
          <div className="history-search">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search diagnosis or doctor"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="history-status-pills">
            {["all", "ongoing", "monitoring", "resolved"].map((status) => (
              <button
                key={status}
                className={`history-pill ${statusFilter === status ? "active" : ""}`}
                onClick={() => setStatusFilter(status)}
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="history-list">
          {filteredHistory.length === 0 ? (
            <p className="history-empty">No records match your search.</p>
          ) : (
            filteredHistory.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="history-card">
                  <div className="history-card-top">
                    <div className={`history-icon history-icon--${item.severity}`}>
                      <Icon size={18} />
                    </div>
                    <span className={`history-status history-status--${item.status}`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="history-title">{item.diagnosis}</h4>
                  <p className="history-doctor">
                    {item.department} &middot; {item.doctorName}
                  </p>

                  <div className="history-date-row">
                    <span className="history-date-badge">
                      <CalendarDays size={12} />
                      {formatMonthDay(item.diagnosedDate)}, {formatYear(item.diagnosedDate)}
                    </span>
                  </div>

                  <div className="history-meta">
                    <div className="history-meta-item">
                      <Hospital size={12} />
                      <span>{item.hospital}</span>
                    </div>
                  </div>

                  <button className="history-view-btn" aria-label="View diagnosis details">
                    <FileText size={14} />
                    View details
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* <section className="Empty"/> */}
    </div>
    </>
  );
}

export default PatientHomeSection