import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import "../../styles/Patient/PatientHome.css";
import TopBar from '../public/common/Public_TopBar';
import Public_Navbar from '../public/common/Public_Navbar';

import {
  CalendarDays, FileText, Pill, FlaskConical, Receipt, HeartPulse, Weight, Droplets, Heart, CalendarPlus, UserRoundSearch, MessageCircle, ChevronRight, Stethoscope, ShieldAlert, CreditCard, CircleCheckBig, ShieldCheck, CalendarCheck, MessageSquare, Ticket, MapPin, ChevronDown, CheckCircle2, ArrowRight, IndianRupee, Check, CalendarClock, Video, Download, BellRing, Tablets, GlassWater, Syringe, Droplet, SprayCan, Apple, Dumbbell, Moon, HeartHandshake, ChevronLeft, BadgeCheck, Hospital, UserRound, BedDouble, Activity, Sparkles, Smile, Glasses, Monitor, Eye, Zap, Bone, ClipboardList, Search, LayoutDashboard, Wallet, RefreshCw, Info, ScanLine, Layers3, Building2, DoorClosed, Clock3, Truck, Bell, Percent, Utensils, MoreVertical, FileDown, ShoppingCart, X, SlidersHorizontal, Upload, TestTube, Wind, House, CircleCheck, UsersRound, Target, Plus, ClipboardCheck, ChartNoAxesColumnIncreasing, Gift, HousePlus, Leaf, Salad, Flower2, Brain, Clock, ScanFace, Shield, Umbrella, MoreHorizontal
} from "lucide-react";

import homeimage from "../../assets/hero-images/Hoispital Image 6.png";
import doc1 from "../../assets/home/doc6.png";
import cc2 from "../../assets/carousel cards/2-eat-healthy-copy.png";
import cc1 from "../../assets/carousel cards/1-stay-hydrated-copy.png";
import cc3 from "../../assets/carousel cards/3-move-every-day-copy.png";
import cc4 from "../../assets/carousel cards/4-get-quality-sleep-copy.png";
import cc5 from "../../assets/carousel cards/5-take-time-to-relax-copy.png";
import cc6 from "../../assets/carousel cards/cc6.png";

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
  // { title: "Dummy", subtitle: "SeeUr style", icon: CalendarDays },
  { title: "Overview", subtitle: "See your Self", icon: LayoutDashboard },
  { title: "Appointments", subtitle: "Manage your visits", icon: CalendarDays },
  { title: "Prescriptions", subtitle: "Current medications", icon: Pill },
  { title: "Lab Reports", subtitle: "Download reports", icon: FlaskConical },
  { title: "Payment", subtitle: "Invoices & Insurance", icon: Receipt },
  // { title: "Medical History", subtitle: "View health history", icon: FileText },
];

const healthStats = [
  { title: "Height", value: "172", unit: "cm", status: "", icon: Weight },
  { title: "Weight", value: "72", unit: "kg", status: "", icon: Weight },
  { title: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal", icon: HeartPulse },
  { title: "Blood Sugar", value: "98", unit: "mg/dL", status: "Normal", icon: Droplets },
  { title: "BMI", value: "24.3", unit: "", status: "Healthy Range", icon: Activity },
  { title: "Heart Rate", value: "72", unit: "bpm", status: "Normal", icon: Heart },
];

const notifications = [
  { icon: CalendarCheck, title: "Appointment Confirmed", message: "Your appointment with Dr. Sharma is scheduled for 18 Jun at 10:30 AM.", time: "2 hours ago" },
  { icon: FlaskConical, title: "Lab Report Available", message: "Your Complete Blood Count (CBC) report is ready to view.", time: "Yesterday" },
  { icon: Pill, title: "Prescription Updated", message: "Dr. Sharma updated your medication plan.", time: "2 days ago" },
  { icon: CreditCard, title: "Payment Successful", message: "Invoice INV-2026-101 has been paid successfully.", time: "3 days ago" },
  { icon: MessageSquare, title: "Doctor Message", message: "Please schedule a follow-up consultation next week.", time: "5 days ago" },
];

const paymentStats = [
  {
    id: 1,
    title: "Unpaid bills",
    value: "3",
    icon: FileText,
    color: "green",
  },
  {
    id: 2,
    title: "Paid this year",
    value: "₹18,700",
    icon: Wallet,
    color: "blue",
  },
  {
    id: 3,
    title: "Claims processed",
    value: "4",
    icon: ShieldCheck,
    color: "purple",
  },
  {
    id: 4,
    title: "Due this month",
    value: "₹0",
    icon: CalendarClock,
    color: "amber",
  },
];

const recentBills = [
  {
    id: 1,
    title: "Consultation",
    date: "12 Jun 2026",
    amount: "₹850",
    status: "Paid",
    icon: Stethoscope,
    color: "blue",
  },
  {
    id: 2,
    title: "Lab Test - Blood Panel",
    date: "5 Jun 2026",
    amount: "₹2,400",
    status: "Paid",
    icon: FlaskConical,
    color: "blue",
  },
  {
    id: 3,
    title: "MRI Scan",
    date: "20 May 2026",
    amount: "₹4,200",
    status: "Unpaid",
    icon: ScanLine,
    color: "red",
  },
  {
    id: 4,
    title: "Pharmacy",
    date: "12 May 2026",
    amount: "₹1,150",
    status: "Paid",
    icon: Pill,
    color: "green",
  },
  {
    id: 5,
    title: "General Checkup",
    date: "28 Apr 2026",
    amount: "₹750",
    status: "Unpaid",
    icon: Stethoscope,
    color: "red",
  },
];

const services = [
  {
    icon: Stethoscope,
    title: "Consultation",
    description:
      "Discuss your health concerns and get expert advice .",
  },
  {
    icon: FileText,
    title: "Prescriptions",
    description:
      "Receive digital prescriptions for your medications .",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    description:
      "Get recommended lab test and view reports online.",
  },
  {
    icon: CreditCard,
    title: "Bills & Insurance",
    description:
      "View and pay bills securely. Insurance support  available .",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Specialist",
    subtitle: "Qualified & experienced doctors",
  },
  {
    icon: Clock3,
    title: "Minimal Waiting",
    subtitle: "Smart queue management",
  },
  {
    icon: Heart,
    title: "Comprehensive Care",
    subtitle: "From consultation to follow-up",
  },
];

const timeline = [
  { title: "Check-in", time: "10:00 AM", status: "completed" },
  { title: "Consultation", time: "10:30 AM", status: "active" },
  { title: "Prescription", time: "~ 11:00 AM", status: "upcoming" },
  { title: "Billing & Exit", time: "~ 11:15 AM", status: "upcoming" },
];

const INITIAL_MEDICATIONS = [
  {
    id: 1,
    name: "Amlodipine",
    dosage: "5 mg",
    purpose: "For Blood Pressure",
    color: "red",
    schedule: { AM: 1, Noon: 0, PM: 0 },
    instructions: "After food",
    daysLeft: 30,
    doctor: "Dr Amit Dutta",
    taken: false,
    type: "capsule",
  },
  {
    id: 2,
    name: "Atorvastatin",
    dosage: "10 mg",
    purpose: "For Cholesterol",
    color: "blue",
    schedule: { AM: 0, Noon: 0, PM: 1 },
    instructions: "At bedtime",
    daysLeft: 11,
    doctor: "Dr Amit Dutta",
    taken: false,
    type: "inhaler",
  },
  {
    id: 3,
    name: "Metformin",
    dosage: "500 mg",
    purpose: "For Blood Sugar",
    color: "white",
    schedule: { AM: 1, Noon: 0, PM: 1 },
    instructions: "After food",
    daysLeft: 8,
    doctor: "Dr Amit Dutta",
    taken: false,
    type: "injection",
  },
  {
    id: 4,
    name: "Aspirin",
    dosage: "75 mg",
    purpose: "For Blood Sugar",
    color: "white",
    schedule: { AM: 0, Noon: 1, PM: 0 },
    instructions: "After food",
    daysLeft: 13,
    doctor: "Dr Amit Dutta",
    taken: false,
    type: "drops",
  },
  {
    id: 5,
    name: "Metformin",
    dosage: "50 mg",
    purpose: "For Blood Sugar",
    color: "white",
    schedule: { AM: 0, Noon: 1, PM: 1 },
    instructions: "After food",
    daysLeft: 15,
    doctor: "Dr Amit Dutta",
    taken: false,
    type: "ointment",
  },
  {
    id: 6,
    name: "Atorvastatin",
    dosage: "10 mg",
    purpose: "For Cholesterol",
    color: "blue",
    schedule: { AM: 0, Noon: 0, PM: 1 },
    instructions: "At bedtime",
    daysLeft: 5,
    doctor: "Dr Amit Dutta",
    taken: false,
    type: "inhaler",
  },
];

const FILTERS = [
  "All Medications",
  "Available",
  "Refill soon",
  "Taken",
  "Not taken",
];

const REPORTS = [
  {
    id: "LR251015003",
    name: "Complete Blood Count (CBC)",
    date: "15 Oct 2025",
    category: "Hematology",
    status: "Pending",
    icon: Droplet,
    color: "blood",
    details: "Complete blood count laboratory report.",
  },
  {
    id: "LR250902011",
    name: "Lipid Profile",
    date: "02 Sep 2025",
    category: "Biochemistry",
    status: "Completed",
    icon: FlaskConical,
    color: "flask",
    details: "Lipid profile laboratory report.",
  },
  {
    id: "LR250818009",
    name: "Urine Routine Examination",
    date: "18 Aug 2025",
    category: "Pathology",
    status: "Completed",
    icon: TestTube,
    color: "urine",
    details: "Urine routine examination report.",
  },
  {
    id: "LR250612006",
    name: "Thyroid Profile (T3, T4, TSH)",
    date: "12 Jun 2025",
    category: "Endocrinology",
    status: "pending",
    icon: HeartPulse,
    color: "thyroid",
    details: "Thyroid profile laboratory report.",
  },
  {
    id: "LR250705004",
    name: "Liver Function Test (LFT)",
    date: "05 Jul 2025",
    category: "Biochemistry",
    status: "Completed",
    icon: Activity,
    color: "liver",
    details: "Liver function test laboratory report.",
  },
  {
    id: "LR250420002",
    name: "Chest X-Ray",
    date: "04 Apr 2025",
    category: "Radiology",
    status: "Completed",
    icon: Wind,
    color: "xray",
    details: "Chest radiology report.",
  },
  {
    id: "LR250705007",
    name: "Liver Function Test (LFT)",
    date: "05 Jul 2025",
    category: "Biochemistry",
    status: "Pending",
    icon: Activity,
    color: "liver",
    details: "Liver function test laboratory report.",
  },
  {
    id: "LR250420032",
    name: "Chest X-Ray",
    date: "04 Apr 2025",
    category: "Radiology",
    status: "Pending",
    icon: Wind,
    color: "xray",
    details: "Chest radiology report.",
  },
];

const REPORT_FILTERS = [
  { label: "All Reports", value: "All" },
  { label: "Normal", value: "Normal" },
  { label: "Abnormal", value: "Abnormal" },
];

const HEALTH_TIPS = [
  {
    id: 1,
    label: "HEALTH TIP",
    // headericon: Leaf,
    icon: Droplets,
    headericon: Droplet,
    badgeIcon: Leaf,
    reminderIcon: Droplet,
    image: cc1,
    title: (
      <>
        Stay Hydrated
        <br />
        Stay <span>Healthier</span>
      </>
    ),
    description:
      "Drinking enough water helps maintain energy levels, improves digestion, and keeps your heart healthy.",
    button: "Learn More",
    reminder: "8 glasses a day",
    theme: {
      accent: "rgb(131 201 244)",
      text: "rgb(176 222 251)",
      background: "rgb(25 66 94 / 32%)",
      border: "rgb(131 201 244 / 28%)",
      iconBackground: "rgb(131 201 244 / 17%)",
      glow: "rgb(131 201 244 / 10%)",
    },
  },

  {
    id: 2,
    label: "DAILY WELLNESS",
    headericon: Apple,
    icon: Apple,
    badgeIcon: Apple,
    reminderIcon: Salad,
    image: cc2,
    title: (
      <>
        Eat Better
        <br />
        Feel <span>Better</span>
      </>
    ),
    description:
      "Balanced nutrition supports immunity, maintains energy, and helps your body recover every day.",
    button: "Explore Tips",
    reminder: "Choose balanced meals",
    theme: {
      accent: "rgb(154 203 101)",
      text: "rgb(193 224 151)",
      background: "rgb(49 77 36 / 32%)",
      border: "rgb(154 203 101 / 27%)",
      iconBackground: "rgb(154 203 101 / 17%)",
      glow: "rgb(154 203 101 / 10%)",
    },
  },

  {
    id: 3,
    label: "STAY ACTIVE",
    headericon: HeartHandshake,
    // icon: HeartHandshake,
    icon: Brain,
    badgeIcon: Sparkles,
    reminderIcon: Flower2,
    image: cc5,
    title: (
      <>
        Move More
        <br />
        Feel <span>Stronger</span>
      </>
    ),
    description:
      "Practice meditation, breathing exercises or mindfulness for better mental health.",
    button: "Explore Tips",
    reminder: "Move every day",
    theme: {
      accent: "rgb(166 201 154)",
      text: "rgb(199 222 190)",
      background: "rgb(49 72 48 / 34%)",
      border: "rgb(166 201 154 / 27%)",
      iconBackground: "rgb(166 201 154 / 17%)",
      glow: "rgb(166 201 154 / 10%)",
    },
  },
  {
    id: 4,
    label: "SLEEP TIP",
    headericon: Moon,
    icon: Moon,
    badgeIcon: Moon,
    reminderIcon: Moon,
    image: cc4,
    title: (
      <>
        Sleep Well
        <br />
        Live <span>Better</span>
      </>
    ),
    description:
      "Quality sleep helps your body recover, improves focus, and supports long-term physical health.",
    button: "Learn More",
    reminder: "sleep 7–9 hours",
    theme: {
      accent: "rgb(156 185 241)",
      text: "rgb(194 211 250)",
      background: "rgb(43 62 105 / 34%)",
      border: "rgb(156 185 241 / 28%)",
      iconBackground: "rgb(156 185 241 / 17%)",
      glow: "rgb(156 185 241 / 10%)",
    },
  },

];

const RECENT_BILLS = [
  {
    id: 1,
    date: "Jun 22, 2025",
    service: "Consultation",
    department: "Dr. Amit Sharma",
    amount: "₹ 600",
    status: "Paid",
    icon: Stethoscope,
    color: "blue",
  },
  {
    id: 2,
    date: "Jun 18, 2025",
    service: "Lab Test",
    department: "Complete Blood Count",
    amount: "₹ 1,250",
    status: "Paid",
    icon: FlaskConical,
    color: "blue",
  },
  {
    id: 3,
    date: "Jun 10, 2025",
    service: "MRI Scan",
    department: "Radiology",
    amount: "₹ 4,500",
    status: "Unpaid",
    icon: ScanFace,
    color: "red",
  },
  {
    id: 4,
    date: "May 28, 2025",
    service: "Pharmacy",
    department: "Prescribed Medicines",
    amount: "₹ 980",
    status: "Paid",
    icon: Pill,
    color: "green",
  },
  {
    id: 5,
    date: "April 28, 2025",
    service: "General Checkup",
    department: "Prescribed Medicines",
    amount: "₹ 980",
    status: "Paid",
    icon: Stethoscope,
    color: "red",
  },
];

function MedicationRow({ medication, onMore }) {
  const Icon = ICON_REGISTRY[medication.type] ?? Pill;
  return (
    <div className="my-med-row">
      <div className="my-med-identity">
        <div className={`my-med-pill ${medication.color}`}>
          <Icon size={31} strokeWidth={1.7} />
        </div>

        <div className="my-med-description">
          <strong>{medication.name}</strong>
          <span>{medication.purpose}</span>
        </div>
      </div>

      {/* <div className="my-med-refill-status">
        <span className={`my-med-status ${medication.refillStatus === "Refill soon" ? "soon" : "available" }`} >
          {medication.refillStatus}
        </span>
      </div> */}

      <div className="my-med-doctors">
        <span className="my-med-prescribed_doc" >
          {medication.doctor}
        </span>
      </div>

      <div className="my-med-dosage">
        <strong>{medication.dosage}</strong>
        <span>1 tablet</span>
      </div>

      <div className="my-med-schedule">
        {["AM", "Noon", "PM"].map((time) => (
          <div className="my-med-time-column" key={time}>
            <span className={`my-med-time-chip ${medication.schedule[time] ? "active" : ""}`} >
              {time}
            </span>
            <small>
              {medication.schedule[time] ? `${medication.schedule[time]} tab` : "–"}
            </small>
          </div>
        ))}
      </div>

      <div className="my-med-instructions">
        {medication.instructions === "At bedtime" ? (
          <Moon size={23} />
        ) : (
          <Utensils size={22} />
        )}
        <span>{medication.instructions}</span>
      </div>

      <div className={`my-med-days ${medication.daysLeft <= 10 ? "warning" : ""}`}>
        <CalendarDays size={23} />
        <span>{medication.daysLeft} days left</span>
      </div>


      <button
        className="my-med-more"
        type="button"
        aria-label={`View ${medication.name} details`}
        onClick={() => onMore(medication)}
      >
        <MoreVertical size={15} />
      </button>
    </div>
  );
}

const AUTO_PLAY_INTERVAL = 5000;


function PatientHomeSection() {
 
  const [autoPay, setAutoPay] = useState(false);
  const [medications, setMedications] = useState(INITIAL_MEDICATIONS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Medications");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [refillRequests, setRefillRequests] = useState([]);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const [reportSearch, setReportSearch] = useState("");
  const [reportFilter, setReportFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const tip = HEALTH_TIPS[activeIndex];


  const handlePayNow = () => {
    // Navigate to your payment gateway or payment page.
    console.log("Initiate payment");
  };

  const handleViewAll = (filter) => {
    // Connect this to your bill listing or routing logic.
    console.log("View bills:", filter);
  };

  const handleBillClick = (bill) => {
    if (!bill) {
      console.log("Open unpaid bills");
      return;
    }

    console.log("Selected bill:", bill);
  };

  const handleCheckEligibility = () => {
    // Open the insurance eligibility section.
    console.log("Check insurance eligibility");
  };



  const reports = REPORTS;

  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        med.name,
        med.dosage,
        med.purpose,
        med.instructions,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      let matchesFilter = true;

      if (filter === "Available" || filter === "Refill soon") {
        matchesFilter = med.refillStatus === filter;
      } else if (filter === "Taken") {
        matchesFilter = med.taken;
      } else if (filter === "Not taken") {
        matchesFilter = !med.taken;
      }

      return matchesSearch && matchesFilter;
    });
  }, [medications, search, filter]);

  const markAsTaken = () => {
    setMedications((current) =>
      current.map((med) =>
        med.id === 1 ? { ...med, taken: true } : med
      )
    );
    setMessage("Amlodipine marked as taken.");
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please select a PDF, JPG, or PNG file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("File size must not exceed 10 MB.");
      event.target.value = "";
      return;
    }

    setPrescriptionFile(file);
    setMessage("Prescription selected. Upload it to your hospital system to complete submission.");
  };

  // const requestRefill = () => {
  //   const medication = medications.find((med) => med.daysLeft <= 15);

  //   if (!medication) {
  //     setMessage("No medication currently requires an urgent refill.");
  //     return;
  //   }

  //   setRefillRequests((current) =>
  //     current.includes(medication.id)
  //       ? current
  //       : [...current, medication.id]
  //   );

  //   setMessage(`Refill request prepared for ${medication.name}.`);
  // };




  const filteredReports = useMemo(() => {
    const query = reportSearch.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        `${report.name} ${report.id} ${report.date} ${report.category}`
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        reportFilter === "All" ||
        report.status === reportFilter;

      return matchesSearch && matchesFilter;
    });
  }, [reports, reportSearch, reportFilter]);

  const visibleReports = showAll ? filteredReports : filteredReports.slice(0, 6);
  const latestReport = reports[0];

  const handleDownload = () => {
    if (onDownload && latestReport) {
      onDownload(latestReport);
      return;
    }

    setMessage(
      "Connect the download action to your report file or API."
    );
  };

  const selectedFilter = REPORT_FILTERS.find(
    (item) => item.value === reportFilter
  );



  const changeSlide = useCallback((index) => {
    setActiveIndex(
      (index + HEALTH_TIPS.length) % HEALTH_TIPS.length
    );

    setProgressKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isPaused || HEALTH_TIPS.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HEALTH_TIPS.length);
      setProgressKey((prev) => prev + 1);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  const [activeSection, setActiveSection] = useState("Overview");
  const renderActiveSection = () => {
    switch (activeSection) {

      case "Overview":
        return (
          <section className='rfc-card_1'>

            <section className="rfc-hero-overlay">

              <aside className="rfc-patient_detail">
                <div className="rfc-info ">
                  <div className="rfc-profile-card">
                    <h1>Aniruddha Paul</h1>
                    <div className="rfc-status-badge"><span className="rfc-pulse-dot" />Active Patient</div>
                    <div className='rfc-header-row'>
                      <div className="rfc-id">
                        Patient ID - AMS-2026-001
                      </div>
                      <div className="rfc-meta">
                        <span>Male</span><div className="rfc-meta-divider" />
                        <span>23 Years</span><div className="rfc-meta-divider" />
                        <span>O+</span>
                      </div>
                    </div>

                  </div>
                  <div className="rfc-divider" />
                  <div className="rfc-health-stats-grid">

                    {healthStats.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="rfc-health-stat-card">
                          <div className="rfc-health-stat-icon-tile"><Icon size={16} /></div>
                          <div className="rfc-health-stat-text">
                            <span>{item.title}</span>
                            <h3>{item.value}<small>{item.unit}</small></h3>
                            <p>{item.status}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </aside>

              <aside className="rfc-hc-health-carousel">

                <section className="rfc-hc-health-carousel__reminder">
                  <div className="rfc-hc-health-carousel__reminder-icon">
                    <Droplet size={18} fill="currentColor" />
                  </div>

                  <div className="rfc-hc-health-carousel__reminder-text">
                    <span>Aim for</span>
                    <strong>{tip.reminder}</strong>
                  </div>
                </section>

                <section className="rfc-hc-health-carousel-body">
                  <div
                    className="rfc-hc-health-carousel__content" key={activeIndex}
                    style={{
                      "--badge-accent": tip.theme.accent,
                      "--badge-text": tip.theme.text,
                      "--badge-bg": tip.theme.background,
                      "--badge-border": tip.theme.border,
                      "--badge-glow": tip.theme.glow,
                    }}
                  >
                    <div className="rfc-hc-health-carousel__badge">
                      <tip.headericon size={13} fill="currentColor" />
                      <span>{tip.label}</span>
                    </div>

                    <h2 className="rfc-hc-health-carousel__title" >
                      {tip.title}
                    </h2>

                    <p className="rfc-hc-health-carousel__description">
                      {tip.description}
                    </p>

                    <button className="rfc-hc-health-carousel__learn">
                      {tip.button}
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="rfc-hc-health-carousel__visual">
                    <img
                      className="rfc-hc-health-carousel__water-image"
                      src={tip.image}
                      alt="A refreshing glass of water"
                    />
                  </div>

                </section>

                <section className="rfc-hc-health-carousel-footer">
                  <div className="rfc-hc-health-carousel__dots">
                    <div
                      className="rfc-hc-health-carousel__orbit"
                      style={{
                        "--badge-accent": tip.theme.accent,
                        "--badge-border": tip.theme.border,
                      }}
                    >
                      {HEALTH_TIPS.map((tip, index) => {
                        const Icon = tip.icon;
                        const isActive = activeIndex === index;
                        return (
                          <button
                            key={index}
                            className={`rfc-hc-health-carousel__dot ${isActive
                              ? "rfc-hc-health-carousel__dot--active"
                              : ""
                              }`}
                            onClick={() => changeSlide(index)}
                            aria-label={`Show health tip ${index + 1}`}
                            aria-current={isActive ? "true" : undefined}
                          >
                            {isActive && (
                              <svg
                                key={progressKey}
                                className="rfc-hc-health-carousel__progress"
                                viewBox="0 0 40 40"
                              >
                                <circle
                                  className="rfc-hc-health-carousel__progress-track"
                                  cx="20"
                                  cy="20"
                                  r="17"
                                />

                                <circle
                                  className="rfc-hc-health-carousel__progress-value"
                                  cx="20"
                                  cy="20"
                                  r="17"
                                  style={{
                                    animationDuration: `${AUTO_PLAY_INTERVAL}ms`,
                                    animationPlayState: isPaused
                                      ? "paused"
                                      : "running"
                                  }}
                                />
                              </svg>
                            )}
                            <Icon size={15} strokeWidth={1.8} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </section>
              </aside>

            </section>

          </section>
        );

      case "Appointments":
        return (
          <section className="rfc-card_3">
            <section className="ac-page">
              <aside className="ac-timeline">
                <div className="ac-date-icon">
                  <CalendarDays size={20} />
                </div>

                <div className="ac-timeline-divider" />

                <span className="ac-weekday">THURSDAY</span>
                <div className="ac-day">18</div>
                <div className="ac-month">JUN</div>
                <div className="ac-year">2026</div>

                <div className="ac-timeline-divider" />

                <div className="ac-small-label">Appointed On</div>
                <div className="ac-appointment-time">10:30 AM</div>

                <span className="ac-status-pill">Confirmed</span>

                {/* <div className="ac-timeline-list">
                  {timeline.map((item) => (
                    <div
                      key={item.title}
                      className={`ac-timeline-item ac-${item.status}`}
                    >
                      <span className="ac-timeline-dot" />
                      <div className="ac-timeline-copy">
                        <div>{item.title}</div>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* <button
                  className="ac-flow-button"
                  onClick={() =>
                    document
                      .querySelector(".ac-information")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }
                >
                  View Full Flow <ArrowRight size={17} />
                </button> */}
              </aside>

              <article className="ac-appointment-card">
                <div className="ac-card-badges">
                  <span className="ac-upcoming-badge">
                    <CalendarDays size={18} />
                    Upcoming Appointment
                  </span>

                  <span className="ac-confirmed-badge">
                    <CheckCircle2 size={18} />
                    Confirmed
                  </span>
                </div>

                <div className="ac-doctor">
                  <div className="ac-doctor-photo-wrap">
                    <img
                      src={doc1}
                      alt="Dr. Rajesh Sharma"
                      className="ac-doctor-photo"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.parentElement.classList.add(
                          "ac-doctor-fallback"
                        );
                        event.currentTarget.parentElement.textContent = "RS";
                      }}
                    />
                    <span className="ac-online-indicator" />
                  </div>

                  <div className="ac-doctor-details">
                    <h2>Dr. Rajesh Sharma</h2>
                    <p>MBBS | MD | MS</p>
                    <p>Cardiology Specialist</p>

                    <div className="ac-rating">
                      <span className="ac-stars">★★★★★</span>
                      <span>4.8 (320+ reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="ac-location-grid">
                  <div className="ac-location-card">
                    <div className="ac-round-icon">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3>AMS Hospital, Cardio Section</h3>
                      <p>Main Building, 3rd Floor</p>
                      <p>Cardiology Department</p>
                    </div>
                  </div>

                  <div className="ac-location-card">
                    <div className="ac-round-icon">
                      <DoorClosed size={18} />
                    </div>
                    <div>
                      {/* <h3>Room T30</h3>
                      <p>Cardiology OPD</p>
                      <p>South Wing</p> */}
                      <h3>Ticket ID</h3>
                      <p>AMS-T1806F30</p>
                    </div>
                  </div>
                </div>

                <div className="ac-action-buttons">
                  <button className="ac-join-button">
                    <Video size={18} fill="currentColor" />
                    Join Consultation
                  </button>

                  <button className="ac-details-button">
                    <FileText size={18} />
                    View Details
                  </button>

                  <button
                    className="ac-more-button"
                    aria-label="More appointment options"
                  >
                    <MoreHorizontal size={23} />
                  </button>
                </div>

                <div className="ac-information">
                  {/* <div className="ac-information-heading">
                    <CalendarDays size={19} />
                    <span>Appointment Information</span>
                  </div> */}

                  <div className="ac-information-grid">
                    <div className="ac-info-item">
                      <div className="ac-round-icon ac-info-icon">
                        <Clock3 size={18} />
                      </div>
                      <div>
                        <span>Duration</span>
                        <strong>15 - 20 mins</strong>
                      </div>
                    </div>

                    <div className="ac-info-item">
                      <div className="ac-round-icon ac-info-icon">
                        <ClipboardList size={18} />
                      </div>
                      <div>
                        <span>Visit Type</span>
                        <strong>Follow-up</strong>
                      </div>
                    </div>

                    <div className="ac-info-item">
                      <div className="ac-round-icon ac-info-icon">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <span>Payment</span>
                        <strong>
                          Online (₹500)
                          <CheckCircle2
                            className="ac-payment-check"
                            size={12}
                            fill="currentColor"
                          />
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div className="ac-right-panel">
                <header className="ac-hero-heading">
                  <span className="ac-eyebrow">YOUR HEALTH</span>
                  <span className="ac-eyebrow">OUR PRIORITY</span>
                  <span className="ac-eyebrow-line" />
                </header>

                <div className="ac-right-content">
                  <div className="ac-intro">
                    <h1>
                      You’re All Set for Your
                      <span> Appointment</span>
                    </h1>
                    <p>
                      Here’s everything you need to know before your consultation.
                    </p>
                  </div>

                  <div className="ac-services-grid">
                    {services.map((service) => {
                      const Icon = service.icon;

                      return (
                        <article className="ac-service-card" key={service.title}>
                          <div className="ac-service-icon">
                            <Icon size={18} strokeWidth={2.2} />
                          </div>

                          <h3>{service.title}</h3>
                          <p>{service.description}</p>
                        </article>
                      );
                    })}
                  </div>

                  <div className="ac-benefits-bar">
                    {benefits.map((benefit) => {
                      const Icon = benefit.icon;

                      return (
                        <div className="ac-benefit" key={benefit.title}>
                          <Icon size={18} fill="currentColor" strokeWidth={1.8} />
                          <div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.subtitle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </section>
        );

      case "Prescriptions":
        return (
          <section className='rfc-card_4'>
            <section className="my-medications">

              <header className="my-med-header">
                <div className="my-med-header-icon">
                  <Pill size={28} strokeWidth={1.7} />
                </div>

                <div className="my-med-header-copy">
                  <h1>
                    My <span>Medications</span>
                  </h1>
                  <p>
                    Manage your prescriptions, track doses and order medicines from
                    our hospital pharmacy.
                  </p>
                </div>

                <div className="my-med-header-tools">
                  <label className="my-med-search">
                    <Search size={21} />
                    <input
                      type="search"
                      placeholder="Search medication, dosage or instruction..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      aria-label="Search medications"
                    />
                  </label>

                  <div className="my-med-filter-wrap">
                    <button
                      type="button"
                      className="my-med-filter-button"
                      aria-expanded={filterOpen}
                      onClick={() => setFilterOpen((open) => !open)}
                    >
                      <SlidersHorizontal size={19} />
                      <span>{filter}</span>
                      <ChevronDown size={16} />
                    </button>

                    {filterOpen && (
                      <div className="my-med-filter-menu">
                        {FILTERS.map((option) => (
                          <button
                            type="button"
                            key={option}
                            className={filter === option ? "selected" : ""}
                            onClick={() => {
                              setFilter(option);
                              setFilterOpen(false);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <div className="my-med-main-grid">
                <div className="my-med-table">
                  <div className="my-med-table-header">
                    <span>Medication</span>
                    <span>Doctor</span>
                    {/* <span>Refill & Actions</span> */}
                    <span>Dosage</span>
                    <span>Schedule</span>
                    <span>Instructions</span>
                    {/* <span>Refill</span> */}
                    <span>Days Left</span>
                  </div>

                  <div className="my-med-table-body">
                    {filteredMedications.length > 0 ? (
                      filteredMedications.map((medication) => (
                        <MedicationRow
                          key={medication.id}
                          medication={medication}
                          onMore={setSelectedMedication}
                        />
                      ))
                    ) : (
                      <div className="my-med-empty">
                        No medications match your search.
                      </div>
                    )}
                  </div>
                </div>

                <aside className="my-med-pharmacy">
                  <span className="my-med-eyebrow">HOSPITAL PHARMACY</span>
                  <div className="my-med-pharmacy-copy">

                    <h2>
                      Get Your <span>Medicines</span>
                    </h2>

                    <p>
                      Order your prescribed medicines from our hospital pharmacy and
                      get them delivered to your home.
                    </p>

                    <button
                      type="button"
                      className="my-med-order-button"
                      onClick={() =>
                        setMessage("Connect this action to your hospital pharmacy ordering page.")
                      }
                    >
                      <ShoppingCart size={23} />
                      <span>Order Medicines</span>
                      <ChevronRight size={21} />
                    </button>
                  </div>

                  <div className="my-med-pharmacy-benefits">
                    <div>
                      <ShieldCheck size={23} />
                      <span>Genuine<br />Medicines</span>
                    </div>
                    <div>
                      <Truck size={25} />
                      <span>Home<br />Delivery</span>
                    </div>
                    <div>
                      <span className="my-med-percent">%</span>
                      <span>Special<br />Discounts</span>
                    </div>
                    <div>
                      <Pill size={23} />
                      <span>Easy<br />Refills</span>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="my-med-bottom-grid">
                <article className="my-med-action-card my-med-next-dose">
                  <div className="my-med-action-icon cyan">
                    <Bell size={20} />
                  </div>

                  <div className="my-med-action-copy">
                    <strong>Next Dose</strong>
                    <p>Amlodipine 5 mg · 1 tablet</p>
                  </div>

                  <div className="my-med-dose-time">
                    <Clock3 size={20} />
                    <span>Today, 10:00 AM</span>
                  </div>

                  <button
                    type="button"
                    className={`my-med-taken-button ${medications.find((med) => med.id === 1)?.taken ? "taken" : ""
                      }`}
                    onClick={markAsTaken}
                    disabled={medications.find((med) => med.id === 1)?.taken}
                  >
                    {medications.find((med) => med.id === 1)?.taken ? (
                      <>
                        <Check size={16} /> Taken
                      </>
                    ) : (
                      "Mark as Taken"
                    )}
                  </button>
                </article>

                <article className="my-med-action-card my-med-upload-card">
                  <div className="my-med-action-icon purple">
                    <FileText size={20} />
                  </div>

                  <div className="my-med-action-copy">
                    <strong>Download Prescription</strong>
                    <p>
                      {prescriptionFile
                        ? prescriptionFile.name
                        : "PDF, JPG, PNG (Max 10MB)"}
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="my-med-hidden-input"
                    onChange={handleUpload}
                  />

                  <button
                    type="button"
                    className="my-med-upload-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Download size={18} />
                    Download
                  </button>
                </article>

                {/* <article className="my-med-action-card my-med-refill-card">
                  <div className="my-med-action-icon blue">
                    <RefreshCw size={26} />
                  </div>

                  <div className="my-med-action-copy">
                    <strong>Need a Refill?</strong>
                    <p>Running low on your medicines?</p>
                    <small>Request a refill in one click.</small>
                  </div>

                  <button
                    type="button"
                    className="my-med-refill-button"
                    onClick={requestRefill}
                  >
                    {refillRequests.length > 0 ? "Requested" : "Request Refill"}
                    <ChevronRight size={17} />
                  </button>
                </article> */}
              </div>

              {message && (
                <div className="my-med-message" role="status">
                  <span>{message}</span>
                  <button
                    type="button"
                    aria-label="Dismiss message"
                    onClick={() => setMessage("")}
                  >
                    <X size={17} />
                  </button>
                </div>
              )}

              {/* Medication details modal */}
              {selectedMedication && (
                <div
                  className="my-med-modal-backdrop"
                  onClick={() => setSelectedMedication(null)}
                >
                  <div
                    className="my-med-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="my-med-modal-title"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      className="my-med-modal-close"
                      type="button"
                      aria-label="Close details"
                      onClick={() => setSelectedMedication(null)}
                    >
                      <X size={20} />
                    </button>

                    <h3 id="my-med-modal-title">
                      {selectedMedication.name}
                    </h3>
                    <p>{selectedMedication.purpose}</p>

                    <div className="my-med-modal-details">
                      <span>Dosage</span>
                      <strong>{selectedMedication.dosage}</strong>

                      <span>Instructions</span>
                      <strong>{selectedMedication.instructions}</strong>

                      <span>Remaining supply</span>
                      <strong>{selectedMedication.daysLeft} days</strong>

                      <span>Refill status</span>
                      <strong>{selectedMedication.refillStatus}</strong>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gap: "10px",
                      }}
                    >

                      <button
                        type="button"
                        className="my-med-modal-done"
                        onClick={() => setSelectedMedication(null)}
                      >
                        Order
                      </button>
                      <button
                        type="button"
                        className="my-med-modal-done"
                        onClick={() => setSelectedMedication(null)}
                      >
                        Close
                      </button>

                    </div>
                  </div>
                </div>
              )}
            </section>
          </section>
        );

      case "Lab Reports":
        return (
          <section className='rfc-card_5'>
            <section className="rfc-lr-dashboard">

              {/* TOP HEADER */}
              <header className="rfc-lr-topbar">

                <div className="rfc-lr-title-group">
                  <div className="rfc-lr-title-icon">
                    <FileText size={29} />
                  </div>

                  <div className="rfc-lr-title-copy">
                    <h1>
                      My <span>Lab Reports</span>
                    </h1>

                    <p>
                      View test results, track report status and
                      access your medical reports.
                    </p>
                  </div>
                </div>

                <div className="rfc-lr-toolbar">

                  <label className="rfc-lr-search">
                    <Search size={21} />

                    <input
                      type="search"
                      value={reportSearch}
                      onChange={(e) => setReportSearch(e.target.value)}
                      placeholder="Search reports, test names..."
                    />

                    {search && (
                      <button
                        type="button"
                        className="rfc-lr-clear-search"
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </label>

                  <div className="rfc-lr-filter-wrap">
                    <button
                      type="button"
                      className="rfc-lr-filter-button"
                      onClick={() => setShowFilter((value) => !value)}
                      aria-expanded={showFilter}
                    >
                      <SlidersHorizontal size={20} />
                      <span>
                        {REPORT_FILTERS.find(
                          (item) => item.value === filter
                        )?.label || "All Reports"}
                      </span>
                      <ChevronDown size={17} />
                    </button>

                    {showFilter && (
                      <div className="rfc-lr-filter-menu">
                        {REPORT_FILTERS.map((item) => (
                          <button
                            type="button"
                            key={item.value}
                            className={
                              filter === item.value
                                ? "rfc-lr-filter-active"
                                : ""
                            }
                            onClick={() => {
                              setReportFilter(item.value);
                              setShowFilter(false);
                            }}
                          >
                            {item.label}
                            {filter === item.value && (
                              <CheckCircle2 size={16} />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* MAIN CONTENT */}
              <div className="rfc-lr-main-grid">

                {/* LEFT: REPORT TABLE */}
                {/* <div className="rfc-lr-table-heading">
                    <div>
                      <h2>Recent Test Reports</h2>
                      <p>
                        {filteredReports.length} reports available
                      </p>
                    </div>

                    <span className="rfc-lr-record-count">
                      <FileText size={16} />
                      {filteredReports.length} Records
                    </span>
                  </div> */}

                {/* <div className="rfc-lr-table-scroll">
                    <table className="rfc-lr-table">
                      <thead  className="rfc-lr-table-head">
                        <tr>
                          <th>Test / Report</th>
                          <th>Test Date</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody className="rfc-lr-table-body">
                        {visibleReports.length > 0 ? (
                          visibleReports.map((report) => {
                            const ReportIcon = report.icon || FileText;

                            return (
                              <tr key={report.id}>
                                <td>
                                  <button
                                    type="button"
                                    className="rfc-lr-test-cell"
                                    onClick={() =>
                                      setSelectedReport(report)
                                    }
                                  >
                                    <span
                                      className={`rfc-lr-test-icon rfc-lr-icon-${report.color || "default"}`}
                                    >
                                      <ReportIcon size={22} />
                                    </span>

                                    <span className="rfc-lr-test-info">
                                      <strong>{report.name}</strong>
                                      <small>{report.id}</small>
                                    </span>
                                  </button>
                                </td>

                                <td>
                                  <span className="rfc-lr-date">
                                    <CalendarDays size={20} />
                                    {report.date}
                                  </span>
                                </td>

                                <td>
                                  <span className="rfc-lr-category">
                                    {report.category}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className={`rfc-lr-status ${report.status === "Normal"
                                      ? "rfc-lr-status-normal"
                                      : "rfc-lr-status-abnormal"
                                      }`}
                                  >
                                    <i />
                                    {report.status}
                                  </span>
                                </td>

                                <td>
                                  <button
                                    type="button"
                                    className="rfc-lr-row-action"
                                    onClick={() =>
                                      setSelectedReport(report)
                                    }
                                    aria-label={`View ${report.name}`}
                                  >
                                    <MoreVertical size={20} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={5}>
                              <div className="rfc-lr-empty">
                                <Search size={25} />
                                <strong>No reports found</strong>
                                <span>
                                  Try another search or filter.
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div> */}

                <section className="rfc-lr-report-panel">
                  <div className="rfc-lr-table-header">
                    <span>Test / Report</span>
                    <span>Test Date</span>
                    <span>Category</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  <div className="rfc-lr-table-body">
                    {visibleReports.length > 0 ? (
                      visibleReports.map((report) => {
                        const ReportIcon = report.icon || FileText;

                        return (
                          <div className="rfc-lr-row" key={report.id}>
                            <div className="rfc-lr-test-cell">
                              <span
                                className={`rfc-lr-test-icon rfc-lr-icon-${report.color || "default"}`}
                              >
                                <ReportIcon size={24} strokeWidth={1.7} />
                              </span>

                              <div className="rfc-lr-test-info">
                                <strong>{report.name}</strong>
                                <small>{report.id}</small>
                              </div>
                            </div>

                            <div className="rfc-lr-date">
                              <CalendarDays size={18} />
                              <span>{report.date}</span>
                            </div>

                            <div className="rfc-lr-category-cell">
                              <span className="rfc-lr-category">
                                {report.category}
                              </span>
                            </div>

                            <div className="rfc-lr-status-cell">
                              <span
                                className={`rfc-lr-status ${report.status === "Completed"
                                  ? "rfc-lr-status-completed"
                                  : "rfc-lr-status-pending"
                                  }`}
                              >
                                <i />
                                {report.status}
                              </span>
                            </div>

                            <div className="rfc-lr-action-cell">
                              <button
                                className="rfc-lr-row-action"
                                type="button"
                                aria-label={`View ${report.name} details`}
                                onClick={() => setSelectedReport(report)}
                              >
                                <MoreVertical size={19} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rfc-lr-empty">
                        <Search size={25} />
                        <strong>No reports found</strong>
                        <span>Try another search or filter.</span>
                      </div>
                    )}
                  </div>
                  {/* <div className="rfc-lr-table-footer">
                    <span>
                      Showing {visibleReports.length} of {filteredReports.length} reports
                    </span>

                    {filteredReports.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAll((value) => !value)}
                      >
                        {showAll ? "Show Less" : "View All Reports"}
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div> */}

                  <div className="rfc-lr-table-footer">
                    <div className="rfc-lr-activity-info">
                      <Clock3 size={19} strokeWidth={1.8} />

                      <span className="rfc-lr-activity-label">
                        {/* Last updated */}
                        Latest Updated Report
                      </span>
                      <span>:</span>

                      <strong className="rfc-lr-activity-date">
                        {filteredReports.length > 0
                          ? filteredReports.reduce((latest, report) => {
                            const currentDate = new Date(report.date);
                            const latestDate = new Date(latest.date);

                            return currentDate > latestDate ? report : latest;
                          }).date
                          : "No reports yet"}
                      </strong>

                      {/* <span className="rfc-lr-footer-divider" /> */}

                      {/* <FileText size={19} strokeWidth={1.8} />

                      <span className="rfc-lr-report-count">
                        <strong>{filteredReports.length}</strong>
                        {" "}
                        {filteredReports.length === 1 ? "report" : "reports"}
                      </span> */}
                    </div>


                    <button
                      type="button"
                      className="rfc-lr-footer-action"
                      onClick={() => setShowReportsModal(true)}
                    >
                      Recent activity
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </section>


                {/* RIGHT: HOSPITAL PROMOTION */}
                <aside className="rfc-lr-promo-panel">

                  <section className="rfc-lr-diagnostic-section">
                    {/* TOP DIAGNOSTICS BANNER */}
                    <div className="rfc-lr-diagnostic-banner">
                      <div className="rfc-lr-diagnostic-banner-content">
                        {/* <div className="rfc-lr-diagnostic-eyebrow">
                          <FlaskConical size={15} />
                          <span>LAB TESTS & DIAGNOSTICS</span>
                        </div> */}

                        <h2>
                          Early Detection
                          <br />
                          Keeps You <span>Healthier</span>
                        </h2>

                        <p>
                          Get comprehensive health checkups at AMS Hospital
                          with advanced laboratory services.
                        </p>

                        {/* <ServiceButton href="/patient/lab-tests">
                          Book a Lab Test
                        </ServiceButton> */}
                      </div>

                      {/* <div
                        className="rfc-lr-diagnostic-banner-visual"
                        aria-hidden="true"
                      >
                        <div className="rfc-lr-diagnostic-trust">
                          <div>
                            <ShieldCheck size={19} />
                            <span>Accurate Results</span>
                          </div>
                          <div>
                            <Clock3 size={19} />
                            <span>Advanced Labs</span>
                          </div>
                          <div>
                            <FlaskConical size={19} />
                            <span>Trusted Diagnostics</span>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <section className="diagnostic-mini-section">
                      <div className="diagnostic-mini-grid">

                        {/* HOME LAB COLLECTION */}
                        <div className="diagnostic-mini-card collection-card">
                          <div className="diagnostic-mini-content">

                            <div className="diagnostic-mini-heading">
                              <span className="diagnostic-mini-icon">
                                <HousePlus size={20} />
                              </span>

                              <div>
                                <h3>Home Lab Collection</h3>
                                <p>
                                  Convenient sample collection
                                  at your doorstep.
                                </p>
                              </div>
                            </div>

                            <ul className="diagnostic-mini-features">
                              <li>
                                <Truck size={20} />
                                <span>Trained professionals</span>
                              </li>

                              <li>
                                <ShieldCheck size={20} />
                                <span>Safe & hygienic collection</span>
                              </li>

                              {/* <li>
                                <Clock3 size={20} />
                                <span>Quick & accurate results</span>
                              </li> */}
                            </ul>

                            <a
                              href="/patient/home-collection"
                              className="diagnostic-mini-button"
                            >
                              <span>Book a Collection</span>
                              <ArrowRight size={19} />
                            </a>

                          </div>
                        </div>

                        {/* DIAGNOSTIC TEST BOOKING */}
                        <div className="diagnostic-mini-card booking-card">
                          <div className="diagnostic-mini-content">

                            <div className="diagnostic-mini-heading">
                              <span className="diagnostic-mini-icon">
                                <CalendarPlus size={20} />
                              </span>

                              <div>
                                <h3>Diagnostic Test Booking</h3>
                                <p>
                                  Choose what you need and book with ease.
                                </p>
                              </div>
                            </div>

                            <ul className="diagnostic-mini-features">
                              <li>
                                <FlaskConical size={20} />
                                <span>Wide range of tests</span>
                              </li>

                              {/* <li>
                                <FileText size={20} />
                                <span>Transparent pricing</span>
                              </li> */}

                              <li>
                                <CalendarDays size={20} />
                                <span>Flexible slots</span>
                              </li>
                            </ul>

                            <a
                              href="/patient/lab-tests"
                              className="diagnostic-mini-button"
                            >
                              <span>Book a Lab Test</span>
                              <ArrowRight size={19} />
                            </a>

                          </div>
                        </div>

                      </div>
                    </section>
                  </section>
                </aside>
              </div>

              {/* BOTTOM INFORMATION BAR */}
              {/* <div className="rfc-lr-bottom-bar">

                <div className="rfc-lr-bottom-latest">

                  <span className="rfc-lr-bottom-icon">
                    <Bell size={23} />
                  </span>

                  <div className="rfc-lr-bottom-copy">
                    <strong>Latest Report</strong>
                    <span>
                      {latestReport
                        ? `${latestReport.name} · ${latestReport.date}`
                        : "No reports available"}
                    </span>
                  </div>

                  {latestReport && (
                    <span
                      className={`rfc-lr-status ${latestReport.status === "Normal"
                        ? "rfc-lr-status-normal"
                        : "rfc-lr-status-abnormal"
                        }`}
                    >
                      <i />
                      {latestReport.status}
                    </span>
                  )}
                </div>

                <div className="rfc-lr-bottom-download">

                  <span className="rfc-lr-bottom-icon rfc-lr-download-icon">
                    <FileText size={24} />
                  </span>

                  <div className="rfc-lr-bottom-copy">
                    <strong>Download Report</strong>
                    <span>PDF, JPG, PNG · Max 10MB</span>
                  </div>

                  <button
                    type="button"
                    className="rfc-lr-download-button"
                    disabled={!latestReport}
                    onClick={handleDownload}
                  >
                    <Download size={18} />
                    Download
                  </button>

                </div>
              </div> */}

              {/* FEEDBACK MESSAGE */}
              {/* {message && (
                <div className="rfc-lr-message" role="status">
                  <span>{message}</span>
                  <button
                    type="button"
                    onClick={() => setMessage("")}
                    aria-label="Dismiss message"
                  >
                    <X size={17} />
                  </button>
                </div>
              )} */}

              {/* REPORT DETAILS MODAL */}
              {selectedReport && (
                <div
                  className="rfc-lr-modal-backdrop"
                  onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                      setSelectedReport(null);
                    }
                  }}
                >
                  <section
                    className="rfc-lr-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="rfc-lr-modal-title"
                  >
                    <button
                      type="button"
                      className="rfc-lr-modal-close"
                      onClick={() => setSelectedReport(null)}
                      aria-label="Close report details"
                    >
                      <X size={20} />
                    </button>

                    <span className="rfc-lr-modal-eyebrow">
                      LAB REPORT DETAILS
                    </span>

                    <h3 id="rfc-lr-modal-title">
                      {selectedReport.name}
                    </h3>

                    <p className="rfc-lr-modal-summary">
                      {selectedReport.details ||
                        "View the report document for detailed findings."}
                    </p>

                    <div className="rfc-lr-modal-details">
                      <span>Report ID</span>
                      <strong>{selectedReport.id}</strong>

                      <span>Test date</span>
                      <strong>{selectedReport.date}</strong>

                      <span>Category</span>
                      <strong>{selectedReport.category}</strong>

                      <span>Report status</span>
                      <strong
                        className={
                          selectedReport.status === "Normal"
                            ? "rfc-lr-modal-normal"
                            : "rfc-lr-modal-abnormal"
                        }
                      >
                        {selectedReport.status}
                      </strong>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gap: "10px",
                      }}
                    >
                      <button
                        type="button"
                        className="rfc-lr-modal-done"
                        onClick={() => setSelectedReport(null)}
                      >
                        Download
                      </button>
                      {/* <button
                        type="button"
                        className="rfc-lr-modal-done"
                        onClick={() => setSelectedReport(null)}
                      >
                        Close Details
                      </button> */}
                    </div>
                  </section>
                </div>
              )}

              {showReportsModal && (
                <div
                  className="rfc-lr-modal-overlay"
                  onClick={() => setShowReportsModal(false)}
                >
                  <section
                    className="rfc-lr-reports-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="rfc-lr-modal-title"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <header className="rfc-lr-modal-header">
                      <div className="rfc-lr-modal-heading">
                        <span className="rfc-lr-modal-icon">
                          <FileText size={22} />
                        </span>

                        <div>
                          <h2 id="rfc-lr-modal-title">Medical Reports</h2>
                          <p>
                            {filteredReports.length} reports in your medical history
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="rfc-lr-modal-close"
                        onClick={() => setShowReportsModal(false)}
                        aria-label="Close medical reports"
                      >
                        <X size={20} />
                      </button>
                    </header>

                    <div className="rfc-lr-modal-list">
                      {filteredReports.length > 0 ? (
                        filteredReports.map((report) => {
                          const ReportIcon = report.icon || FileText;

                          return (
                            <div className="rfc-lr-modal-report" key={report.id}>
                              <span
                                className={`rfc-lr-test-icon rfc-lr-icon-${report.color || "default"}`}
                              >
                                <ReportIcon size={21} strokeWidth={1.7} />
                              </span>

                              <div className="rfc-lr-modal-report-info">
                                <strong>{report.name}</strong>
                                <span>{report.id}</span>
                              </div>

                              <div className="rfc-lr-modal-report-date">
                                <CalendarDays size={15} />
                                <span>{report.date}</span>
                              </div>

                              <span
                                className={`rfc-lr-status ${report.status === "Normal"
                                  ? "rfc-lr-status-normal"
                                  : "rfc-lr-status-abnormal"
                                  }`}
                              >
                                <i />
                                {report.status}
                              </span>

                              <button
                                type="button"
                                className="rfc-lr-row-action"
                                aria-label={`View ${report.name} details`}
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowReportsModal(false);
                                }}
                              >
                                <MoreVertical size={19} />
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="rfc-lr-empty">
                          <Search size={25} />
                          <strong>No reports available</strong>
                          <span>Your medical reports will appear here.</span>
                        </div>
                      )}
                    </div>

                    <footer className="rfc-lr-modal-footer">
                      <span>
                        <FileText size={15} />
                        {filteredReports.length} total reports
                      </span>

                      <button
                        type="button"
                        onClick={() => setShowReportsModal(false)}
                      >
                        Close
                      </button>
                    </footer>
                  </section>
                </div>
              )}


            </section>
          </section>
        );

      case "Payment":
        return (
          <section className='rfc-card_2'>
            <section className="rfc-hc-billing">

              {/* LEFT SECTION */}
              <div className="rfc-hc-billing__left">

                <section className="rfc-hc-premium">

                  {/* Main content */}
                  <div className="rfc-hc-premium__main">

                    <div className="rfc-hc-premium__heading">
                      <span>Outstanding Balance</span>
                      <Info size={15} />
                    </div>
                    <div className="rfc-hc-premium-amount_and_paynow">
                      <h2>₹ 6,280</h2>
                      {/* <button className="rfc-hc-premium__inline-pay">
                        <span>Pay</span>
                        </button> */}
                    </div>

                    <div className="rfc-hc-premium__due">
                      <CalendarDays size={19} />
                      <span>Due by Jul 5, 2026</span>
                    </div>

                  </div>

                  {/* Integrated insights */}
                  <div className="rfc-hc-premium__insights">

                    {/* Insurance */}
                    <div className="rfc-hc-premium__insight">
                      <div className="rfc-hc-premium__insight-icon">
                        {/* <ShieldCheck size={16} /> */}
                        <CreditCard size={15} />
                      </div>

                      <div className="rfc-hc-premium__insight-label">
                        {/* <span>Insurance</span> */}
                        <span>Pay Now</span>
                      </div>

                      <span className="rfc-hc-premium__active">
                        {/* <i /> */}
                        {/* Active */}
                        <ArrowRight size={15} />
                      </span>

                    </div>

                    {/* Coverage */}
                    <div className="rfc-hc-premium__insight">
                      <div className="rfc-hc-premium__insight-icon">
                        <Layers3 size={15} />
                      </div>

                      <div className="rfc-hc-premium__insight-label">
                        {/* <span>Coverage Used</span> */}
                        <span>Download Receipt</span>
                      </div>
                      <span className="rfc-hc-premium__active">
                        <Download size={18} />
                      </span>

                      {/* <strong className="rfc-hc-premium__insight-value">
                        24%
                      </strong> */}
                    </div>

                    {/* Total Bills */}
                    {/* <div className="rfc-hc-premium__insight">
                      <div className="rfc-hc-premium__insight-icon">
                        <FileText size={19} />
                      </div>

                      <div className="rfc-hc-premium__insight-label">
                        <span>Total Bills</span>
                      </div>

                      <strong className="rfc-hc-premium__insight-value">
                        4
                      </strong>
                    </div> */}

                  </div>

                  {/* Action buttons */}
                  {/* <div className="rfc-hc-premium__actions">

                    <button className="rfc-hc-premium__pay">
                      <CreditCard size={18} />
                      <span>View More</span>
                      <ArrowRight size={15} />
                    </button>

                    <button className="rfc-hc-premium__download">
                      <Download size={18} />
                      <span>Download Receipt</span>
                    </button>

                  </div> */}

                </section>


                <div className="rfc-hc-billing__recent">

                  <div className="rfc-hc-billing__recent-header">
                    <div className="rfc-hc-billing__recent-title">
                      <Clock size={15} />
                      <h3>Recent Bills</h3>
                    </div>

                    <button className="rfc-hc-billing__history">
                      View History
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  <div className="rfc-hc-billing__table-head">
                    {/* <span>Date</span> */}
                    <span>Service / Department</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>

                  <div className="rfc-hc-billing__table-body">

                    {RECENT_BILLS.length > 0 ? (
                      RECENT_BILLS.map((bill) => {
                        const Icon = bill.icon || FileText;

                        return (
                          <div
                            className="rfc-hc-billing__table-row"
                            key={bill.id}
                          >

                            {/* DATE */}
                            {/* <div className="rfc-hc-billing__date">
                              <CalendarDays size={17} />
                              <span>{bill.date}</span>
                              </div> */}

                            {/* SERVICE */}
                            <div className="rfc-hc-billing__service">
                              <span>{bill.id} .</span>
                              <span className={`rfc-hc-billing__service-icon payment-color-${bill.color}`}>
                                <Icon size={21} strokeWidth={1.7} />
                              </span>

                              <div className="rfc-hc-billing__service-info">
                                <strong>{bill.service}</strong>
                                <small>{bill.date}</small>
                                {/* <small>{bill.department}</small> */}
                              </div>
                            </div>

                            {/* AMOUNT */}
                            <div className="rfc-hc-billing__amount-cell">
                              <strong className="rfc-hc-billing__amount">
                                {bill.amount}
                              </strong>
                            </div>

                            {/* STATUS */}
                            <div className="rfc-hc-billing__status-cell">
                              <span
                                className={`rfc-hc-billing__status ${bill.status === "Paid"
                                  ? "rfc-hc-billing__status--paid"
                                  : "rfc-hc-billing__status--unpaid"
                                  }`}
                              >
                                <i />
                                {bill.status}
                              </span>
                            </div>

                            {/* ACTIONS */}
                            <div className="rfc-hc-billing__row-actions">
                              <button
                                type="button"
                                aria-label={`View ${bill.service} bill`}
                                title="View bill"
                              >
                                <FileText size={18} />
                              </button>
                            </div>

                          </div>
                        );
                      })
                    ) : (
                      <div className="rfc-hc-billing__empty">
                        <Search size={24} />
                        <strong>No bills found</strong>
                        <span>Your recent billing transactions will appear here.</span>
                      </div>
                    )}

                  </div>
                </div>


                {/* <section className="rfc-lr-report-panel">
                   <div className="rfc-lr-table-header">
                    <span>Test / Report</span>
                    <span>Test Date</span>
                    <span>Category</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  <div className="rfc-lr-table-body">
                    {visibleReports.length > 0 ? (
                      visibleReports.map((report) => {
                        const ReportIcon = report.icon || FileText;

                        return (
                          <div className="rfc-lr-row" key={report.id}>
                            <div className="rfc-lr-test-cell">
                              <span
                                className={`rfc-lr-test-icon rfc-lr-icon-${report.color || "default"}`}
                              >
                                <ReportIcon size={24} strokeWidth={1.7} />
                              </span>

                              <div className="rfc-lr-test-info">
                                <strong>{report.name}</strong>
                                <small>{report.id}</small>
                              </div>
                            </div>

                            <div className="rfc-lr-date">
                              <CalendarDays size={18} />
                              <span>{report.date}</span>
                            </div>

                            <div className="rfc-lr-category-cell">
                              <span className="rfc-lr-category">
                                {report.category}
                              </span>
                            </div>

                            <div className="rfc-lr-status-cell">
                              <span
                                className={`rfc-lr-status ${report.status === "Completed"
                                  ? "rfc-lr-status-completed"
                                  : "rfc-lr-status-pending"
                                  }`}
                              >
                                <i />
                                {report.status}
                              </span>
                            </div>

                            <div className="rfc-lr-action-cell">
                              <button
                                className="rfc-lr-row-action"
                                type="button"
                                aria-label={`View ${report.name} details`}
                                onClick={() => setSelectedReport(report)}
                              >
                                <MoreVertical size={19} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rfc-lr-empty">
                        <Search size={25} />
                        <strong>No reports found</strong>
                        <span>Try another search or filter.</span>
                      </div>
                    )}
                  </div>
                </section> */}

                {/* <table className="my-med-table">
                  <thead className="my-med-table-header">
                    <span>Medication</span>
                    <span>Dosage</span>
                    <span>Schedule</span>
                    <span>Instructions</span>
                    <span>Days Left</span>
                    <span>Refill & Actions</span>
                  </thead>

                  <tbody className="my-med-table-body">
                    {filteredMedications.length > 0 ? (
                      filteredMedications.map((medication) => (
                        <MedicationRow
                          key={medication.id}
                          medication={medication}
                          onMore={setSelectedMedication}
                        />
                      ))
                    ) : (
                      <div className="my-med-empty">
                        No medications match your search.
                      </div>
                    )}
                  </tbody>
                </table> */}

                {/* <div className="rfc-hc-billing__recent">

                  <div className="rfc-hc-billing__recent-header">
                    <div className="rfc-hc-billing__recent-title">
                      <h3>Recent Bills</h3>
                      <Clock size={19} />
                    </div>

                    <button className="rfc-hc-billing__history">
                      View History
                      <ArrowRight size={20} />
                    </button>
                  </div>


                  <div className="rfc-hc-billing__table-head">
                    <span>Date</span>
                    <span>Service / Department</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>


                  <div className="rfc-hc-billing__table-body">
                    {RECENT_BILLS.map((bill) => {
                      const Icon = bill.icon;

                      return (
                        <div
                          className="rfc-hc-billing__table-row"
                          key={bill.id}
                        >
                          <span className="rfc-hc-billing__date">
                            {bill.date}
                          </span>

                          <div className="rfc-hc-billing__service">
                            <div className="rfc-hc-billing__service-icon">
                              <Icon size={24} />
                            </div>

                            <div className="rfc-hc-billing__service-info">
                              <strong>{bill.service}</strong>
                              <small>{bill.department}</small>
                            </div>
                          </div>

                          <strong className="rfc-hc-billing__amount">
                            {bill.amount}
                          </strong>

                          <span
                            className={`rfc-hc-billing__status ${bill.status === "Paid"
                              ? "rfc-hc-billing__status--paid"
                              : "rfc-hc-billing__status--unpaid"
                              }`}
                          >
                            {bill.status === "Paid" && (
                              <CheckCircle2 size={14} />
                            )}
                            {bill.status}
                          </span>

                          <div className="rfc-hc-billing__row-actions">
                            <button aria-label="Download bill">
                              <FileText size={23} />
                            </button>

                            <button aria-label="More options">
                              <MoreVertical size={21} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div> */}

                {/* RECENT BILLS */}
              </div>
              <aside className="rfc-hc-billing__right">

                {/* INSURANCE HERO */}
                <div className="rfc-hc-billing__insurance-hero">

                  {/* <div className="rfc-hc-billing__insurance-art">
                    <div className="rfc-hc-billing__umbrella">
                      <Umbrella size={100} strokeWidth={1.3} />
                    </div>

                    <div className="rfc-hc-billing__shield">
                      <ShieldCheck size={65} />
                      <span>+</span>
                    </div>

                    <div className="rfc-hc-billing__insurance-document">
                      <strong>INSURANCE</strong>
                      <span><CheckCircle2 size={15} /></span>
                      <span><CheckCircle2 size={15} /></span>
                      <span><CheckCircle2 size={15} /></span>
                    </div>
                  </div> */}

                  <div className="rfc-hc-billing__insurance-heading">
                    <div>
                      <h3>Insurance Coverage & Billing</h3>
                      <p>Your health insurance details and benefits</p>
                    </div>

                    <span className="rfc-hc-billing__active">
                      <i />
                      Active
                    </span>
                  </div>
                </div>

                {/* POLICY DETAILS */}
                <div className="rfc-hc-billing__policy">

                  <div className="rfc-hc-billing__policy-top">
                    <div className="rfc-hc-billing__policy-icon">
                      <HeartPulse size={23} />
                    </div>

                    <div className="rfc-hc-billing__policy-name">
                      <strong>HealthCare Plus</strong>
                      <span>Family Floater Plan</span>
                    </div>

                    {/* <ChevronRight size={20} /> */}
                    <div className="rfc-hc-billing__coverage">

                      <div className="rfc-hc-billing__coverage-heading">
                        {/* <strong>Coverage Usage</strong> */}
                        <span>₹ 1,22,500 used of ₹ 5,00,000</span>
                      </div>

                      <div className="rfc-hc-billing__coverage-bottom">
                        <div className="rfc-hc-billing__progress">
                          <div />
                        </div>

                        <strong>24% used</strong>
                      </div>
                    </div>
                  </div>

                  <div className="rfc-hc-billing__policy-details">
                    <div>
                      <span>Policy No.</span>
                      <strong>HC-45789-AX</strong>
                    </div>

                    <div>
                      <span>Valid Till</span>
                      <strong>31 Dec 2027</strong>
                    </div>

                    <div>
                      <span>Member ID</span>
                      <strong>PT-45821</strong>
                    </div>

                    <div>
                      <span>Coverage Type</span>
                      <strong>Cashless</strong>
                    </div>
                  </div>
                </div>

                {/* COVERAGE USAGE */}
                {/* <div className="rfc-hc-billing__coverage">

                  <div className="rfc-hc-billing__coverage-heading">
                    <strong>Coverage Usage</strong>
                    <span>₹ 1,22,500 used of ₹ 5,00,000</span>
                  </div>

                  <div className="rfc-hc-billing__coverage-bottom">
                    <div className="rfc-hc-billing__progress">
                      <div />
                    </div>

                    <strong>24% used</strong>
                  </div>
                </div> */}

                {/* ELIGIBILITY BANNER */}
                <div className="rfc-hc-billing__eligibility">

                  <div className="rfc-hc-billing__eligibility-icon">
                    <Info size={20} />
                  </div>

                  <div className="rfc-hc-billing__eligibility-content">
                    <strong>
                      Insurance can be applied to eligible bills
                    </strong>

                    <span>
                      Your HealthCare Plus Insurance may cover a part of your expenses.
                    </span>
                  </div>

                  <button className="rfc-hc-billing__eligibility-btn">
                    <ShieldCheck size={17} />
                    Check Eligibility
                    <ArrowRight size={15} />
                  </button>

                </div>
              </aside>

              {/* RIGHT SECTION */}

            </section>
          </section>
        );
      
      default:
        return <p>Select an action to view its details.</p>;
    }
  };

  return (
    <div className="rfc-home">
      <header className="rfc-header">
        <TopBar />
        <Public_Navbar />
      </header>

      <main className="rfc-body">

        {/* Selected section appears here */}
        <section className="rfc-body_dashboard">
          <img src={homeimage} alt="Hospital" className="rfc-hero-bg-image-blur" />
          {/* <div className="rfc-hero-blur-transition" /> */}
          {renderActiveSection()}
        </section>

        {/* Navigation cards remain visible */}
        <section className="rfc-actions-grid">
          <div className="rfc-dashboard-card">
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <div
                  key={action.id ?? index}
                  className={`rfc-action-card ${activeSection === action.title ? "active" : ""
                    }`}
                  onClick={() => setActiveSection(action.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveSection(action.title);
                    }
                  }}
                >
                  <div className="rfc-action-icon">
                    <Icon size={23} />
                  </div>

                  <div className="rfc-action-content">
                    <h3>{action.title}</h3>
                    <p>{action.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}

export default PatientHomeSection