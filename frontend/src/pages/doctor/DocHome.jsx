import React, { useEffect, useMemo, useRef, useState, Suspense, lazy } from "react";
import "../../styles/Doctor/Doctor-Home.css";
import doc from "../../assets/home/doc3.png";
import Hospital_Brand from "../../components/common/Hospital_Brand";
import Search_Bar from "../../components/ui/Search";
import ProfileMenu from "../../components/ui/ProfileMenu";
import ClockCalendarCard from "../../components/ui/ClockCalendarCard";
import Modal from "../../components/ui/Modal";

// import Sidebar from "../../components/ui/Sidebar";

import { createPortal } from "react-dom";
import {
  Cross, LayoutDashboard, Users, FileText, Stethoscope, Pill, FlaskConical,
  CalendarDays, Bell, BarChart3, UserRound, Headset, Settings as SettingsIcon,
  Menu, Search, MessageCircle, ChevronDown, CheckCircle2, Clock, ChevronLeft,
  ChevronRight, MoreVertical, AlertTriangle, UserPlus, BedDouble, ClipboardCheck, Star, Timer, ClipboardList, PlayCircle, FileCheck2, NotebookPen, CheckSquare, Settings, CircleHelp, LogOut, Activity, X, Phone, Mail, HeartPulse, Moon, Languages, LogIn, ShieldCheck, LockKeyhole, FileSignature, BriefcaseMedical, LibraryBig, Building2, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, SearchIcon, UsersRound, ListChecks, UserRoundPlus, MessageSquare, Video, Send, ContactRound, BookOpenCheck, Megaphone, CalendarClock,
  Wallet, ChartNoAxesCombined, BadgeCheck
} from "lucide-react";

/* 
  Lazy-load each section — only the active one gets fetched/rendered.
  This recovers the code-splitting benefit you'd normally get from routing.
*/

const Dashboard = lazy(() => import("../doctor/DocDashboard"));
const Schedule = lazy(() => import("../doctor/DocSchedule"));
const Patient = lazy(() => import("../../components/common/PatientRecords"));
const Queue = lazy(() => import("../doctor/DocQueue"));

const Doctor_Workspace = lazy(() => import("../doctor/DocWorkspace"));
const Prescriptions = lazy(() => import("../doctor/Prescriptions"));

const Doctor_Referral = lazy(() => import("../doctor/DocReferral"));
const DocHub = lazy(() => import("../../components/common/DoctorsHub"));
const MDT_Meetings = lazy(() => import("../../components/common/MDT_Meetings"));

const Hospital_Faculty = lazy(() => import("../../components/common/Hospital_Faculty"));
const Hospital_Notice = lazy(() => import("../../components/common/Hospital_Notice"));
const MedicalLibrary = lazy(() => import("../../components/common/Medical_Library"));

const Performance = lazy(() => import("../doctor/DocPerformance"));
const Salary = lazy(() => import("../../components/common/Salary"));
const Credentials = lazy(() => import("../../components/common/Credentials"));
const Appraisals = lazy(() => import("../../components/common/Appraisals"));

import Profile from "../../components/personal/My_Profile";
import SettingsSection from "../../components/personal/SettingsSection";
import Privacy from "../../components/personal/Privacy";
import Sessions from "../../components/personal/Sessions";
import Security from "../../components/personal/Security";
import Language from "../../components/personal/Language";

// const Profile = lazy(() => import("../../components/personal/My_Profile"));
// const SettingsSection = lazy(() => import("../../components/personal/SettingsSection"));
// const Privacy = lazy(() => import("../../components/personal/Privacy"));
// const Sessions = lazy(() => import("../../components/personal/Sessions"));
// const Security = lazy(() => import("../../components/personal/Security"));
// const Language = lazy(() => import("../../components/personal/Language"));

/* key = tab id, value = component to render. Single source of truth — adding a new sidebar item later means adding ONE line here. */
const SECTION_MAP = {
  dashboard: Dashboard,
  schedule: Schedule,
  "patient-records": Patient,
  "patient-queue": Queue,

  workspace: Doctor_Workspace,
  prescriptions: Prescriptions,

  "doctor-hub": DocHub,
  MDT: MDT_Meetings,
  referrals: Doctor_Referral,

  faculty: Hospital_Faculty,
  "med-library": MedicalLibrary,
  notices: Hospital_Notice,

  performance: Performance,
  salary: Salary,
  credentials: Credentials,
  appraisals: Appraisals,

  // profile: Profile,
  // settings: SettingsSection,
  // sessions : Sessions,
  // privacy : Privacy,
  // security : Security,
  // language : Language
};

const MODAL_REGISTRY = {
  profile: {
    component: Profile,
    title: "My Profile",
    className: "profile-modal",
  },

  settings: {
    component: SettingsSection,
    title: "Settings",
    className: "settings-modal",
  },

  privacy: {
    component: Privacy,
    title: "Privacy",
    className: "privacy-modal",
  },

  security: {
    component: Security,
    title: "Security",
    className: "security-modal",
  },

  sessions: {
    component: Sessions,
    title: "Sessions",
    className: "sessions-modal",
  },

  language: {
    component: Language,
    title: "Language",
    className: "language-modal",
  },
};

// const TOP_NAVIGATION = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     defaultTab: "schedule",
//   },
//   {
//     id: "community",
//     label: "Community",
//     defaultTab: "DocHub",
//   },
//   {
//     id: "clinical",
//     label: "Clinic",
//     defaultTab: "DocHub",
//   },
//   {
//     id: "faculty",
//     label: "Hospital Faculty",
//     defaultTab: "Faculty",
//   },
//   {
//     id: "personal",
//     label: "Personal",
//     defaultTab: "Workspace",
//   },
// ];

const NAVIGATIONn = [
  {
    id: "dashboard",
    label: "Home",
    defaultTab: "dashboard",

    title: "HOME",
    theme: "blue",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "schedule", label: "Schedule", icon: CalendarDays },
      // { id: "patient-queue", label: "Patient Queue", icon: Users, count: 10 },
      // { id: "my-patients", label: "My Patients", icon: UserRound },
      { id: "patient-records", label: "	Patients", icon: Stethoscope },
      // { id: "patients", label: "Patients", icon: UsersRound },
      // { id: "patient-queue", label: "Patient Queue", icon: Users, count: 10 },
      // { id: "my-patients", label: "My Patients", icon: UserRound },
    ],
  },

  {
    id: "clinical",
    label: "Workspace",
    defaultTab: "Workspace",

    title: "WORKSPACE",
    theme: "green",
    items: [
      { id: "workspace", label: "My Workspace", icon: BriefcaseMedical },
      { id: "prescriptions", label: "Prescriptions", icon: Pill },
      { id: "certificates", label: "Certificates", icon: FileCheck2 },
      { id: "clinical-notes", label: "Clinical Notes", icon: ClipboardList },
      { id: "Order Lab Test", label: "Lab Reports ", icon: FlaskConical },
    ],
  },

  {
    id: "community",
    label: "Community",
    defaultTab: "DocHub",

    title: "COMMUNITY",
    theme: "purple",
    items: [
      { id: "DocHub", label: "Doctor Hub", icon: Users, tag: "NEW" },
      { id: "MDT", label: "MDT Meetings", icon: UserPlus },
      // { id: "case-reviews", label: "Case Reviews", icon: Search },
      // { id: "medical-library", label: "Medical Library", icon: FileText },
      // { id: "research", label: "Research", icon: FlaskConical },
    ],
  },

  {
    id: "faculty",
    label: "Faculty",
    defaultTab: "Faculty",

    title: "HOSPITAL FACULTY",
    theme: "orange",
    items: [
      { id: "Faculty", label: "Hospital Faculty", icon: Building2 },
      { id: "Med-Library", label: "Medical Library", icon: LibraryBig },
      // { id: "cme", label: "More", icon: Star },
      // { id: "performance", label: "Performance", icon: BarChart3 },
      // { id: "ward-rounds", label: "Ward Rounds", icon: BedDouble },
    ],
  },

  {
    id: "personal",
    label: "Personal",
    defaultTab: "Workspace",

    title: "PERSONAL",
    theme: "green",
    items: [
      { id: "Workspace", label: "My Workspace", icon: BriefcaseMedical, },
      { id: "performance", label: "Performance", icon: BarChart3, },
      { id: "profile", label: "My Profile", icon: UserRound, },
      { id: "settings", label: "Settings", icon: SettingsIcon, },
    ],
  },
];

const NAVIGATION = [

  {
    id: "overview",
    label: "Overview",
    defaultTab: "dashboard",

    title: "OVERVIEW",
    theme: "blue",

    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "schedule", label: "Schedule", icon: CalendarDays },
      { id: "patient-records", label: "My Patients", icon: Stethoscope },
      { id: "patient-queue", label: "Queue", icon: ListChecks, count: 10 },
      { id: "visits", label: "Visits", icon: ClipboardCheck },

      // { id: "patients", label: "Patients", icon: UsersRound },
      // { id: "patient-queue", label: "Patient Queue", icon: Users, count: 10 },
      // { id: "my-patients", label: "My Patients", icon: UserRound },
    ],
  },

  {
    id: "care",
    label: "Clinical",
    defaultTab: "workspace",

    title: "CARE",
    theme: "green",

    items: [
      { id: "workspace", label: "Workspace", icon: BriefcaseMedical },
      { id: "notes", label: "Notes", icon: ClipboardList },
      { id: "prescriptions", label: "Prescriptions", icon: Pill },
      { id: "lab-orders", label: "Lab Orders", icon: FlaskConical },
      { id: "certificates", label: "Certificates", icon: FileCheck2 },
    ],
  },

  {
    id: "connect",
    label: "Connect",
    defaultTab: "doctor-hub",

    title: "CONNECT",
    theme: "purple",

    items: [
      { id: "doctor-hub", label: "Doctor Hub", icon: Users, tag: "NEW" },
      { id: "referrals", label: "Referrals", icon: Send },
      { id: "case-reviews", label: "Case Reviews", icon: MessageSquare },
      { id: "MDT", label: "Meetings", icon: Video },
      { id: "research", label: "Research", icon: FlaskConical },
    ],
  },

  {
    id: "hospital",
    label: "Hospital",
    defaultTab: "faculty",

    title: "HOSPITAL",
    theme: "orange",

    items: [
      { id: "faculty", label: "Departments", icon: Building2 },
      { id: "directory", label: "Directory", icon: ContactRound },
      { id: "med-library", label: "Library", icon: LibraryBig },
      { id: "guidelines", label: "Guidelines", icon: BookOpenCheck },
      { id: "notices", label: "Notices", icon: Megaphone },
    ],
  },

  {
    // id: "account",
    // label: "Account",
    id: "personal",
    label: "Personal",
    defaultTab: "privileges",

    title: "PERSONAL",
    theme: "gray",

    items: [
      { id: "development", label: "Development", icon: Activity },
      // { id: "Leave & Attendance", label: "leave", icon: Activity },
      { id: "salary", label: "Payroll", icon: Wallet },
      { id: "appraisals", label: "Appraisals", icon: ChartNoAxesCombined },
      { id: "credentials", label: "Credentials", icon: BadgeCheck },
    ],
  },
];

const ASIDE_QUICK_ACTIONS = [
  { icon: FileText, label: "New Patient", cls: "aside-qa-item--blue" },
  { icon: NotebookPen, label: "Write Note", cls: "aside-qa-item--orange" },
  { icon: FileCheck2, label: "Add Prescription", cls: "aside-qa-item--green" },
  { icon: Bell, label: "Reminders", cls: "aside-qa-item--green" },
  { icon: FlaskConical, label: "Order Lab Test", cls: "aside-qa-item--purple" },
  // { icon: Bell, label: "Reminders", cls: "aside-qa-item--green" },
  // { icon: FlaskConical, label: "Order Lab Test", cls: "aside-qa-item--purple" },
  { icon: CheckSquare, label: "Create Task", cls: "aside-qa-item--red" },
  // { icon: Users, label: "Referral ", cls: "aside-qa-item--teal" },
];

const ACTIVITY_SEARCH = [
  {
    id: 1,
    name: "Rahul Sharma",
    meta: "Patient · ID #PT1024",
    detail: "Last visit 28 Aug",
  },
  {
    id: 2,
    name: "Dr. Priya Mehta",
    meta: "Cardiology",
    detail: "Available today",
  },
  {
    id: 3,
    name: "Ananya Patel",
    meta: "Patient · ID #PT1187",
    detail: "Appointment at 3:30 PM",
  },
  {
    id: 4,
    name: "Dr. Arjun Rao",
    meta: "Neurology",
    detail: "Hospital Faculty",
  },
];

const MESSAGES = [
  {
    id: 1,
    name: "Dr. Priya Mehta",
    message: "Can you review the patient report?",
    time: "10 min",
    unread: true,
  },
  {
    id: 2,
    name: "Dr. Arjun Rao",
    message: "The case discussion is scheduled for 4 PM.",
    time: "32 min",
    unread: true,
  },
  {
    id: 3,
    name: "Nursing Desk",
    message: "Patient PT1024 has arrived.",
    time: "1 hr",
    unread: false,
  },
  {
    id: 4,
    name: "Dr. Neha Shah",
    message: "Thanks for the update.",
    time: "2 hr",
    unread: false,
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "appointment",
    icon: CalendarClock,
    title: "Appointment starting soon",
    message: "Rahul Sharma · 10:30 AM",
    time: "5 min",
    unread: true,
  },
  {
    id: 2,
    type: "report",
    icon: FileText,
    title: "Lab report available",
    message: "Patient PT1187",
    time: "18 min",
    unread: true,
  },
  {
    id: 3,
    type: "message",
    icon: MessageCircle,
    title: "New message received",
    message: "Dr. Priya Mehta",
    time: "42 min",
    unread: false,
  },
  {
    id: 4,
    type: "task",
    icon: ClipboardCheck,
    title: "Task due today",
    message: "Complete patient review",
    time: "1 hr",
    unread: false,
  },
];

const ACTIVITY_ROW_MIN_HEIGHT = 52;
const ACTIVITY_ROW_GAP = 8;

// const attendanceDatas = {
//   month: "September",
//   percentage: 73,
//   presentDays: 22,
//   totalDays: 30,
//   stats: [
//     { count: 3, label: "half day" },
//     { count: 3, label: "leave" },
//     { count: 2, label: "off" },
//   ],
// };

function DocHome() {
  const profileRef = useRef(null);
  const infoRef = useRef(null);

  const [activeNavigation, setActiveNavigation] = useState("overview");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeModal, setActiveModal] = useState("profile");

  const [activePopup, setActivePopup] = useState(null);
  const topbarPopupRef = useRef(null);


  const [helpOpen, setHelpOpen] = useState(false);
  const [helpSubject, setHelpSubject] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [helpPriority, setHelpPriority] = useState("Medium");
  const [ticketId, setTicketId] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [infoHeight, setInfoHeight] = useState(0);

  const ActiveSection = SECTION_MAP[activeTab] ?? Dashboard;
  const ActiveModal = activeModal ? MODAL_REGISTRY[activeModal] : null;

  const currentNavigation = NAVIGATION.find((navigation) => navigation.id === activeNavigation);
  const currentItems = currentNavigation?.items ?? [];

  const visibleActivityRows = infoHeight > 0 ? Math.floor((infoHeight + ACTIVITY_ROW_GAP) / (ACTIVITY_ROW_MIN_HEIGHT + ACTIVITY_ROW_GAP)) : 0;

  const unreadMessages = MESSAGES.filter((message) => message.unread).length;
  const unreadNotifications = NOTIFICATIONS.filter((notification) => notification.unread).length;

  const togglePopup = (popup) => {
    setActivePopup((current) =>
      current === popup ? null : popup
    );
  };

  useEffect(() => {
    if (!infoRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setInfoHeight(entry.contentRect.height);
    });

    observer.observe(infoRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        topbarPopupRef.current &&
        !topbarPopupRef.current.contains(event.target)
      ) {
        setActivePopup(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  return (
    <div className="doctors-home" data-entity="doctor">

      {/* top: logo + navigation-activity + profile */}
      <div className="doc-topbar">

        <div className="doc_logo">
          <Hospital_Brand />
        </div>

        <div className="topbar__navigation">
          {/* BACKDROP FILTER */}
          {activePopup && (
            <div
              className="topbar-popup-backdrop"
              onClick={() => setActivePopup(null)}
              aria-hidden="true"
            />
          )}
          <nav className="nav-header__menu">
            {NAVIGATION.map((navigation) => (
              <button
                key={navigation.id}
                type="button"
                className={
                  "nav-header__item" +
                  (
                    activeNavigation === navigation.id
                      ? " nav-header__item--active"
                      : ""
                  )
                }
                onClick={() => {
                  setActiveNavigation(navigation.id);
                  setActiveTab(navigation.defaultTab);
                }}
              >
                {navigation.label}
              </button>
            ))}
          </nav>


          <div className="topbar__activity" ref={topbarPopupRef} >
            {/* <div className=" serch">
              <Search_Bar  placeholder="Search patients by name, ID or phone..."/>
            </div> */}

            {/* <button className="topbar__activity__icon-btn" aria-label="Messages">
              <SearchIcon size={15} strokeWidth={3} />
            </button> */}


            {/* MESSAGE POPUP */}
            <button
              className={`topbar__activity__icon-btn ${activePopup === "messages"
                ? "topbar__activity__icon-btn--active"
                : ""
                }`}
              aria-label="Messages"
              type="button"
              onClick={() => togglePopup("messages")}
            >
              <MessageCircle
                size={15}
                strokeWidth={3}
              />

              {unreadMessages > 0 && (
                <span className="doc_notif__icon-badge">
                  {unreadMessages}
                </span>
              )}
            </button>
            {activePopup === "messages" && (
              <div className="topbar-popup messages-popup">
                <div className="topbar-popup__header">
                  <div>
                    <h3>Messages</h3>
                    <span>
                      {unreadMessages > 0
                        ? `${unreadMessages} unread`
                        : "All caught up"}
                    </span>
                  </div>
                  {unreadMessages > 0 && (
                    <button type="button" className="topbar-popup__action">
                      Mark all read
                    </button>
                  )}
                </div>


                <div className="topbar-popup__body">
                  {MESSAGES.length === 0 ? (
                    <div className="topbar-popup__empty">
                      <MessageCircle size={22} />
                      <span>No messages</span>
                    </div>
                  ) : (
                    MESSAGES.map((message) => (
                      <div
                        className={`message-row ${message.unread ? "message-row--unread" : ""}`}
                        key={message.id}
                      >
                        {/* Avatar */}
                        <div className="message-row__avatar">
                          {message.name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                          }
                        </div>
                        {/* Message content */}
                        <div className="message-row__content">
                          <div className="message-row__top">
                            <span className="message-row__name"> {message.name} </span>
                            <span className="message-row__time"> {message.time} </span>
                          </div>
                          <p> {message.message} </p>
                        </div>
                        {/* Unread indicator */}
                        {message.unread && (
                          <span className="message-row__unread-dot" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="topbar-popup__footer">
                  <button type="button">
                    View all messages
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATION POPUP */}
            <button
              className={`topbar__activity__icon-btn ${activePopup === "notifications" ? "topbar__activity__icon-btn--active" : ""}`}
              aria-label="Notifications"
              type="button"
              onClick={() => togglePopup("notifications")}
            >
              <Bell size={15} strokeWidth={3} />
              {unreadNotifications > 0 && (
                <span className="doc_notif__icon-badge">
                  {unreadNotifications}
                </span>
              )}
            </button>
            {activePopup === "notifications" && (
              <div className="topbar-popup notifications-popup">
                <div className="topbar-popup__header">
                  <div>
                    <h3>Notifications</h3>
                    <span>
                      {unreadNotifications > 0
                        ? `${unreadNotifications} unread`
                        : "You're all caught up"}
                    </span>
                  </div>
                  {unreadNotifications > 0 && (
                    <button
                      type="button"
                      className="topbar-popup__action"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="topbar-popup__body">

                  {NOTIFICATIONS.length === 0 ? (
                    <div className="topbar-popup__empty">
                      <Bell size={22} />
                      <span>No notifications</span>
                    </div>
                  ) : (
                    NOTIFICATIONS.map((notification) => {
                      const Icon = notification.icon || Bell;
                      return (
                        <div
                          key={notification.id}
                          className={`notification-row ${notification.unread ? "notification-row--unread" : ""}`}
                        >
                          <div className="notification-row__icon">
                            <Icon size={16} strokeWidth={2} />
                          </div>
                          <div className="notification-row__content">
                            <div className="notification-row__top">
                              <span className="notification-row__title">{notification.title} </span>
                              <span className="notification-row__time"> {notification.time} </span>
                            </div>
                            <p> {notification.message} </p>
                          </div>
                          {notification.unread && (
                            <span className="notification-row__unread-dot" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                {/* FOOTER */}
                <div className="topbar-popup__footer">
                  <button type="button">
                    View all notifications
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="topbar__actions">
          <ProfileMenu variant="doctor" avatar={doc} name="Dr. Rajesh Sharma" role="Cardiologist" onNavigate={setActiveModal} />

          {/* PROFILE / SETTINGS MODAL */}
          {activeModal && MODAL_REGISTRY[activeModal] && (() => {

            const {
              component: ActiveModalComponent,
              title,
              className,
            } = MODAL_REGISTRY[activeModal];

            return (
              <Modal
                isOpen={true}
                onClose={() => setActiveModal(null)}
                title={title}
                className={className}
              >
                <ActiveModalComponent
                  onClose={() => setActiveModal(null)}
                />
              </Modal>
            );

          })()}
        </div>
      </div>

      {/* left: doctor-specific nav + quick actions */}

      <aside className="doc_sidebar">
        <section className="sidebar">
          <div className="sidebar__nav-items">
            <nav className="doctor-sidebar">

              <div className={`sidebar-section sidebar-section--${currentNavigation?.theme || "blue"}`} >
                {/* SECTION TITLE */}
                <div className="sidebar-section__header">
                  <div className="sidebar-section__line" />
                  <div className="sidebar-section__dot" />
                  <span> {currentNavigation?.title} </span>
                  <div className="sidebar-section__line" />
                </div>

                {/* ITEMS */}

                <div className="sidebar-section__body">

                  {currentNavigation.items.map(
                    ({ id, label, icon: Icon, count, tag }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveTab(id)}
                        className={"sidebar-item" + (activeTab === id ? " sidebar-item--active" : "")}
                      >
                        <div className="sidebar-item__icon">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <span className="sidebar-item__label">
                          {label}
                        </span>
                        {count && (
                          <span className="sidebar-item__badge">
                            {count}
                          </span>
                        )}
                        {tag && (
                          <span className="sidebar-item__tag">
                            {tag}
                          </span>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            </nav>
          </div>

          <div className="sidebar__bottom">
            <button type="button" className="sidebar__help" onClick={() => setHelpOpen(true)}>
              <span className="sidebar__help-icon">
                <Headset size={18} strokeWidth={2} />
              </span>
              <div className="sidebar__help-text" >
                <span className="sidebar__help-title">Need Help?</span>
                <span className="sidebar__help-subtitle">Contact IT Support</span>
              </div>
            </button>

            {helpOpen && createPortal(
              <div className="help-modal-overlay" onClick={() => setHelpOpen(false)}>
                <div className="help-modal" onClick={(e) => e.stopPropagation()}>

                  <div className="help-modal__header">
                    <div className="help-modal__title-group">
                      <span className="help-modal__icon">
                        <Headset size={18} strokeWidth={2} />
                      </span>
                      <span className="help-modal__title">IT Support</span>
                    </div>
                    <button type="button" className="help-modal__close"
                      aria-label="Close" onClick={() => { setHelpOpen(false); setTicketId(null); }} >
                      <X size={16} />
                    </button>
                  </div>

                  {ticketId ? (
                    /* ---------- confirmation state ---------- */
                    <div className="help-modal__confirm">
                      <span className="help-modal__confirm-icon">
                        <CheckCircle2 size={32} strokeWidth={2} />
                      </span>
                      <p className="help-modal__confirm-title">Ticket Raised</p>
                      <p className="help-modal__confirm-id">#{ticketId}</p>
                      <p className="help-modal__confirm-text">
                        Your request has been added to the support queue.
                        The team will get back to you shortly.
                      </p>
                      <button type="button" className="help-modal__submit-btn" onClick={() => { setHelpOpen(false); setTicketId(null); }} >
                        Done
                      </button>
                    </div>
                  ) : (
                    /* ---------- form state ---------- */
                    <>
                      <a href="tel:18000000000" className="help-modal__quick-item help-modal__quick-item--solo">
                        <Phone size={15} strokeWidth={2} />
                        <span>Urgent? Call 1800-000-0000</span>
                      </a>

                      <p className="help-modal__subtitle">Or raise a ticket with the support team.</p>

                      <div className="help-modal__form">
                        <div className="help-modal__field">
                          <label htmlFor="help-subject">Subject</label>
                          <input id="help-subject" type="text" placeholder="Login issue on patient records" value={helpSubject} onChange={(e) => setHelpSubject(e.target.value)} />
                        </div>

                        <div className="help-modal__field">
                          <label htmlFor="help-priority">Priority</label>
                          <div className="help-modal__priority-group" id="help-priority">
                            {["Low", "Medium", "Urgent"].map((p) => (
                              <button
                                key={p}
                                type="button"
                                className={
                                  "help-modal__priority-btn" +
                                  (helpPriority === p ? ` help-modal__priority-btn--active-${p.toLowerCase()}` : "")
                                }
                                onClick={() => setHelpPriority(p)}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="help-modal__field">
                          <label htmlFor="help-message">Message</label>
                          <textarea id="help-message" placeholder="Describe the issue" rows={3} value={helpMessage} onChange={(e) => setHelpMessage(e.target.value)} />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="help-modal__submit-btn"
                        disabled={!helpSubject.trim() || !helpMessage.trim()}
                        onClick={() => {
                          const id = `IT-${Math.floor(1000 + Math.random() * 9000)}`;
                          setTicketId(id);
                          setHelpSubject("");
                          setHelpMessage("");
                          setHelpPriority("Medium");
                        }}
                      >
                        Raise Ticket
                      </button>
                    </>
                  )}
                </div>
              </div>,
              document.body
            )}

            <div className="sidebar__footer">
              <p>© 2025 AMS Hospital</p>
              <p>All rights reserved.</p>
            </div>
          </div>

        </section>
      </aside>

      {/* middle: doctor-specific working content */}
      <section className="doc_main">
        <div className="doc_workspace">
          <Suspense fallback={<div className="section-loading">Loading…</div>}>
            <ActiveSection />
          </Suspense>

        </div>
      </section>

      {/* right: permanent clock + calendar  */}
      <section className="doc_aside">
        <aside className="aside-rail">

          {/* <div className="aside__search_msg_notif-activity">
            <div className="aside__activity-controls">
              <button className="aside__icon-btn" aria-label="Messages" onClick={() => setActivityMode("messages")}>
                <MessageCircle size={15} strokeWidth={3} />
                {ACTIVITY_MESSAGES.length > 0 && (
                  <span className="doc_notif__icon-badge">
                    {ACTIVITY_MESSAGES.length}
                  </span>
                )}
              </button>

              <button className="aside__icon-btn" aria-label="Notifications" onClick={() => setActivityMode("notifications")} >
                <Bell size={15} strokeWidth={3} />

                {ACTIVITY_NOTIFICATIONS.length > 0 && (
                  <span className="doc_notif__icon-badge">
                    {ACTIVITY_NOTIFICATIONS.length}
                  </span>
                )}
              </button>

            </div>

            <div className="aside__activity-info" ref={infoRef}>
              {activityMode === "messages" && (
                <div className="aside__activity-list"
                // style={{ gridTemplateRows: `repeat(${visibleActivityRows}, 52px)`}}
                >
                  {ACTIVITY_MESSAGES.slice(0, visibleActivityRows).map((item) => (
                    <ActivityInfoRow
                      key={item.id}
                      icon={<MessageCircle size={14} />}
                      title={item.name}
                      subtitle={item.message}
                      meta={item.time}
                      unread={item.unread}
                    />
                  ))}
                </div>
              )}
              {activityMode === "notifications" && (
                // <div>NOTIFICATION</div>
                <div className="aside__activity-list"
                // style={{ gridTemplateRows: `repeat(${visibleActivityRows}, 52px)`}}
                >
                  {ACTIVITY_NOTIFICATIONS.slice(0, visibleActivityRows).map((item) => (
                    <ActivityInfoRow
                      key={item.id}
                      icon={<Bell size={14} />}
                      title={item.title}
                      subtitle={item.message}
                      meta={item.time}
                      unread={item.unread}
                    />
                  ))}
                </div>
              )}
            </div>
          </div> */}

          <div className="aside-top-area">
            <div className="panel--quick-actions">
              <div className="aside-qa-grid">
                {ASIDE_QUICK_ACTIONS.map((a) => (
                  <button className={`aside-qa-item ${a.cls}`} key={a.label}>
                    <span className="aside-qa-icon">
                      <a.icon size={16} strokeWidth={2} />
                    </span>
                    <span className="aside-qa-label">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="doc-calender">
            <ClockCalendarCard />
          </div>
        </aside>
      </section>

    </div>
  );
}

export default DocHome;