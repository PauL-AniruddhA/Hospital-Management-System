import React, { useEffect , useMemo , useRef , useState , Suspense, lazy} from "react";
import "../../styles/Doctor/doctor-home.css";
import doc from "../../assets/home/doc3.png";
import Hospital_Brand from "../../components/common/Hospital_Brand";
import Search_Bar from "../../components/ui/Search";
import ProfileMenu from "../../components/ui/ProfileMenu";
import ClockCalendarCard from "../../components/ui/ClockCalendarCard";
// import Sidebar from "../../components/ui/Sidebar";



import { createPortal } from "react-dom";
import {
  Cross, LayoutDashboard, Users, FileText, Stethoscope, Pill, FlaskConical,
  CalendarDays, Bell, BarChart3, UserRound, Headset, Settings as SettingsIcon,
  Menu, Search, MessageCircle, ChevronDown, CheckCircle2, Clock, ChevronLeft,
  ChevronRight, MoreVertical, AlertTriangle, UserPlus, BedDouble, ClipboardCheck, Star, Timer, ClipboardList, PlayCircle, FileCheck2, NotebookPen, CheckSquare,Settings,CircleHelp, LogOut, Activity, X, Phone, Mail, HeartPulse, Moon, Languages, LogIn, ShieldCheck, LockKeyhole, FileSignature,
  BriefcaseMedical,
  LibraryBig,
  Building2,
PanelLeftClose,
PanelLeftOpen,
PanelRightClose,
PanelRightOpen,
SearchIcon,
} from "lucide-react";

/* Lazy-load each section — only the active one gets fetched/rendered.
   This recovers the code-splitting benefit you'd normally get from routing. */
const Dashboard        = lazy(() => import("../doctor/DocDashboard"));
const Schedule         = lazy(() => import("../doctor/DocSchedule"));
const Patient          = lazy(() => import("../../components/common/PatientRecords"));
const Doctor_Workspace = lazy(() => import("../doctor/DocWorkspace"));
const DocHub           = lazy(() => import("../../components/common/DoctorsHub"));
const MDT_Meetings     = lazy(() => import("../../components/common/MDT_Meetings"));
const Hospital_Faculty = lazy(() => import("../../components/common/Hospital_Faculty"));
const MedicalLibrary   = lazy(() => import("../../components/common/Medical_Library"));

const Performance      = lazy(() => import("../doctor/DocPerformance"));
const Profile          = lazy(() => import("../../components/personal/My_Profile"));
const SettingsSection  = lazy(() => import("../../components/common/SettingsSection"));

/* key = tab id, value = component to render. Single source of truth — adding a new sidebar item later means adding ONE line here. */
const SECTION_MAP = {
  dashboard: Dashboard,
  schedule: Schedule,
  "patient-records": Patient,
  Workspace:Doctor_Workspace,
  DocHub:DocHub,
  MDT:MDT_Meetings,
  Faculty:Hospital_Faculty,
  "Med-Library":MedicalLibrary,
  
  performance: Performance,
  profile: Profile,
  settings: SettingsSection,
};

/* ---------------- static nav / reference data ---------------- */
const NAV_SECTIONS = [
  {
    title: "MAIN",
    theme: "blue",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "schedule", label: "Schedule", icon: CalendarDays },
      // { id: "patient-queue", label: "Patient Queue", icon: Users, count: 10 },
      // { id: "my-patients", label: "My Patients", icon: UserRound },
      { id: "patient-records", label: "	Patients", icon: Stethoscope },
    ],
  },
  
  {
    title: "CLINICAL",
    theme: "green",
    items: [
      { id: "Workspace", label: "My Workspace", icon: BriefcaseMedical },
      // { id: "clinical-notes",label: "Clinical Notes",icon: ClipboardList },
      // { id: "consultations",label: "Consultations",icon: Stethoscope },
      // { id: "diagnosis",label: "Diagnosis",icon: HeartPulse },
      // { id: "prescriptions",label: "Prescriptions",icon: Pill },
      // { id: "follow-ups",label: "Follow-ups",icon: Timer,count: 6 },
      // { id: "certificates",label: "Certificates",icon: FileCheck2 },
      // { id: "referrals",label: "Referrals",icon: ChevronRight },
    ],
  },
  
  {
    title: "COLLABORATION",
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
    title: "HOSPITAL",
    theme: "orange",
    items: [
      { id: "Faculty", label: "Hospital Faculty", icon: Building2 },
      { id: "Med-Library", label: "Medical Library", icon: LibraryBig },
      // { id: "cme", label: "More", icon: Star },
      // { id: "performance", label: "Performance", icon: BarChart3 },
      // { id: "ward-rounds", label: "Ward Rounds", icon: BedDouble },
    ],
  }
];
const ASIDE_QUICK_ACTIONS = [
  { icon: FileText, label: "New Patient", cls: "aside-qa-item--blue" },
  { icon: NotebookPen, label: "Write Note", cls: "aside-qa-item--orange" },
  // { icon: FileCheck2, label: "Add Prescription", cls: "aside-qa-item--green" },
  // { icon: Bell, label: "Reminders", cls: "aside-qa-item--green" },
  // { icon: FlaskConical, label: "Order Lab Test", cls: "aside-qa-item--purple" },
  // { icon: Users, label: "Referral ", cls: "aside-qa-item--teal" },
  // { icon: CheckSquare, label: "Create Task", cls: "aside-qa-item--red" },
];
const NOTIFICATIONS = [
  { icon: CalendarDays, title: "Appointment cancelled", subtitle: "John Smith cancelled his 2:00 PM slot", time: "25 mins ago" },
  { icon: FileText, title: "New record shared", subtitle: "Referral note added for Priya Mehta", time: "40 mins ago" },
  { icon: CheckCircle2, title: "Lab sync complete", subtitle: "3 reports imported from the lab system", time: "1 hr ago" },
];


const activityLabels = {
  messages: "Messages",
  notifications: "Notifications",
};
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

const ACTIVITY_MESSAGES = [
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

const ACTIVITY_NOTIFICATIONS = [
  {
    id: 1,
    type: "appointment",
    title: "Appointment starting soon",
    message: "Rahul Sharma · 10:30 AM",
    time: "5 min",
    unread: true,
  },
  {
    id: 2,
    type: "report",
    title: "Lab report available",
    message: "Patient PT1187",
    time: "18 min",
    unread: true,
  },
  {
    id: 3,
    type: "message",
    title: "New message received",
    message: "Dr. Priya Mehta",
    time: "42 min",
    unread: false,
  },
  {
    id: 4,
    type: "task",
    title: "Task due today",
    message: "Complete patient review",
    time: "1 hr",
    unread: false,
  },
];

const ACTIVITY_ROW_MIN_HEIGHT = 52;
const ACTIVITY_ROW_GAP = 8;


/* ---------------- component ---------------- */
function ActivityInfoRow({ icon, title, subtitle, meta, unread = false}) {
  return (
    <div
      className={ "aside__activity-row" +
        (unread ? " aside__activity-row--unread" : "")
      }
    >
      <div className="aside__activity-row-icon"> {icon} </div>

      <div className="aside__activity-row-content">
        <span className="aside__activity-row-title"> {title} </span>
        <span className="aside__activity-row-subtitle"> {subtitle} </span>
      </div>

      {meta && ( <span className="aside__activity-row-meta"> {meta} </span> )}
    </div>
  );
}



function DocHome() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const [helpOpen, setHelpOpen] = useState(false);
  const [helpSubject, setHelpSubject] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [helpPriority, setHelpPriority] = useState("Medium");
  const [ticketId, setTicketId] = useState(null);
  const ActiveSection = SECTION_MAP[activeTab] ?? Dashboard;
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [asideOpen, setAsideOpen] = useState(true);
  const [activityMode, setActivityMode] = useState("messages");

  const infoRef = useRef(null);
  const [infoHeight, setInfoHeight] = useState(0);
  const visibleActivityRows = infoHeight > 0 ? Math.floor( (infoHeight + ACTIVITY_ROW_GAP) / (ACTIVITY_ROW_MIN_HEIGHT + ACTIVITY_ROW_GAP) ): 0;

  const visibleSearchItems = ACTIVITY_SEARCH.slice(0, visibleActivityRows);
  const visibleMessageItems = ACTIVITY_MESSAGES.slice(0, visibleActivityRows);
  const visibleNotificationItems = ACTIVITY_NOTIFICATIONS.slice(0, visibleActivityRows);
  useEffect(() => {
    if (!infoRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setInfoHeight(entry.contentRect.height);
    });

    observer.observe(infoRef.current);

    return () => observer.disconnect();
  }, []);



  return (
    // <div className="doctors-home" data-entity="doctor">
    <div className={[ "doctors-home", !sidebarOpen && "sidebar-collapsed", !asideOpen && "aside-collapsed" ] .filter(Boolean) .join(" ")} data-entity="doctor" >

      {/* topbar */}

      <div className="doc_logo">
         <Hospital_Brand/>
      </div>

      <div className="topbar__navigation">
        <nav className ="nav-header__menu">
          <a href="#" class="nav-header__item"> Dashboard </a>
          <a href="#" class="nav-header__item"> Community </a>
          <a href="#" class="nav-header__item nav-header__item--active"> Hospital Faculty </a>
          <a href="#" class="nav-header__item"> Personal </a>
        </nav>
        {/* <div className=" serch">
          <Search_Bar  placeholder="Search patients by name, ID or phone..."/>
        </div> */}

        <div className="topbar__search-activity" >
          <button className="topbar__icon-btn" aria-label="Dark Mode">
            <SearchIcon size={18} />
          </button>
          <button className="topbar__icon-btn" aria-label="Messages">
            <MessageCircle size={18} />
          </button>

          <div className="topbar__notif-wrap" ref={notifRef}>
            <button
              className="topbar__icon-btn"
              aria-label="Notifications"
              onClick={() => setNotifOpen((o) => !o)}
            >
              <Bell size={18} />
              {NOTIFICATIONS.length > 0 && (
                <span className="topbar__icon-badge">{NOTIFICATIONS.length}</span>
              )}
            </button>
            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-dropdown__header">Notifications</div>
                {NOTIFICATIONS.map((n) => (
                  <div className="notif-dropdown__row" key={n.title}>
                    <span className="notif-dropdown__icon"><n.icon size={15} /></span>
                    <div className="notif-dropdown__info">
                      <span className="notif-dropdown__title">{n.title}</span>
                      <span className="notif-dropdown__subtitle">{n.subtitle}</span>
                    </div>
                    <span className="notif-dropdown__time">{n.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
      
      <div className="topbar__actions">
        <ProfileMenu  variant="doctor" avatar={doc} name="Dr. Rajesh Sharma" role="Cardiologist" onNavigate={setActiveTab} />
      </div>

      {/* left: doctor-specific nav + quick actions */}
      <aside className="doc_sidebar">
        <section className="sidebar">
          <div className="sidebar__nav-items">
            <nav className="doctor-sidebar">
              {NAV_SECTIONS.map((section, index) => (
                <div key={section.title} className={`sidebar-section sidebar-section--${section.theme}`} >
                  {/* SECTION TITLE */}
                      

                  {/* <div className="sidebar-section__header">
                    <div className="sidebar-section__line"/>
                    <div className="sidebar-section__dot" />
                    <span>{section.title}</span>
                    <div className="sidebar-section__line" />
                  </div> */}

                  {/* ITEMS */}

                  <div className="sidebar-section__body">
                    
                    {section.items.map(
                      ({ id, label, icon: Icon, count, tag }) => (
                        <button key={id} type="button" onClick={() => setActiveTab(id)}  className={ "sidebar-item" + (activeTab === id ? " sidebar-item--active" : "")}>
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
              ))}
            </nav>
          </div>

          <div className="sidebar__bottom">    
            <button type="button" className="sidebar__help"  onClick={() => setHelpOpen(true)}>
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
            <button className="aside__icon-btn" aria-label="Search">
              <SearchIcon size={15} strokeWidth={3} />
            </button>

            <button className="aside__icon-btn" aria-label="Messages">
              <MessageCircle size={15} strokeWidth={3} />
            </button>

            <div className="aside__doc_notif-wrap" ref={notifRef}>
              <button
                className="aside__icon-btn"
                aria-label="Notifications"
                onClick={() => setNotifOpen((o) => !o)}
              >
                <Bell size={15} strokeWidth={3} />
                {NOTIFICATIONS.length > 0 && (
                  <span className="doc_notif__icon-badge">{NOTIFICATIONS.length}</span>
                )}
              </button>
              {notifOpen && (
                <div className="doc_notif-dropdown">
                  <div className="doc_notif-dropdown__header">Notifications</div>
                  {NOTIFICATIONS.map((n) => (
                    <div className="doc_notif-dropdown__row" key={n.title}>
                      <span className="doc_notif-dropdown__icon"><n.icon size={15} /></span>
                      <div className="doc_notif-dropdown__info">
                        <span className="doc_notif-dropdown__title">{n.title}</span>
                        <span className="doc_notif-dropdown__subtitle">{n.subtitle}</span>
                      </div>
                      <span className="doc_notif-dropdown__time">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>  */}
          
          <div className="aside__search_msg_notif-activity">
           {/* =====================================================
              ASIDE ACTIVITY PANEL
              ===================================================== */}
            <div className="aside__activity-controls">
              <button className="aside__icon-btn" aria-label="Messages" onClick={() => setActivityMode("messages")}>
                <MessageCircle size={15} strokeWidth={3} />
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

            {/* <div className="activity_divider_workspace"/> */}
            {/* =========================================
                INFORMATION WORKSPACE
            ========================================= */}

              <div className="aside__activity-info" ref={infoRef}>
                {activityMode === "messages" && (
                  <div className="aside__activity-list" 
                  // style={{ gridTemplateRows: `repeat(${visibleActivityRows}, 52px)`}}
                  >
                    {ACTIVITY_MESSAGES .slice(0, visibleActivityRows).map((item) => (
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
                    {ACTIVITY_NOTIFICATIONS .slice(0, visibleActivityRows).map((item) => (
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
            </div>

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
          <ClockCalendarCard/> 
        </aside>
      </section>
    </div>
  );
}
 
export default DocHome;