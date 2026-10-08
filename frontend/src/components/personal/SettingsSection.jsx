import React, { useState } from "react";
import {
  Settings,
  LayoutDashboard,
  Monitor,
  PanelLeft,
  CalendarDays,
  Clock3,
  Stethoscope,
  Bell,
  Palette,
  Accessibility,
  RefreshCw,
  Save,
  RotateCcw,
  ChevronRight,
  Check,
} from "lucide-react";

import "../../styles/Components/personal/SettingsSection.css";


/* =========================================================
   SETTINGS CATEGORIES
========================================================= */

const SETTINGS_CATEGORIES = [
  {
    id: "general",
    label: "General",
    description: "Application behavior",
    icon: Settings,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Cards and widgets",
    icon: LayoutDashboard,
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Workspace behavior",
    icon: Monitor,
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Sidebar and navigation",
    icon: PanelLeft,
  },
  {
    id: "schedule",
    label: "Schedule",
    description: "Calendar preferences",
    icon: CalendarDays,
  },
  {
    id: "appointments",
    label: "Appointments",
    description: "Appointment behavior",
    icon: Clock3,
  },
  {
    id: "clinical",
    label: "Clinical Workflow",
    description: "Consultation preferences",
    icon: Stethoscope,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and reminders",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Visual preferences",
    icon: Palette,
  },
  {
    id: "accessibility",
    label: "Accessibility",
    description: "Accessibility options",
    icon: Accessibility,
  },
];


/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
  /* General */
  defaultPage: "dashboard",
  rememberLastPage: true,
  autoSave: true,
  confirmActions: true,
  autoRefresh: true,
  refreshInterval: "60",

  /* Dashboard */
  dashboardDensity: "standard",
  showAppointments: true,
  showQueue: true,
  showQuickActions: true,
  showNotifications: true,
  showActivity: true,
  showRecentPatients: true,
  showHospitalNotices: false,

  /* Workspace */
  workspaceMode: "standard",
  stickyHeader: true,
  preserveScroll: true,
  resizablePanels: true,
  rememberPanelSize: true,

  /* Navigation */
  sidebarMode: "expanded",
  expandOnHover: false,
  showLabels: true,
  showBadges: true,
  showSectionHeaders: true,
  rememberSidebar: true,

  /* Schedule */
  calendarView: "week",
  slotDuration: "30",
  snapToSlot: true,
  highlightToday: true,
  showVacantSlots: true,
  showPastAppointments: false,
  showUnavailable: true,

  /* Appointments */
  defaultAppointmentDuration: "30",
  defaultAppointmentType: "consultation",
  confirmCancellation: true,
  enableDragReschedule: true,
  showPatientName: true,
  showAppointmentStatus: true,

  /* Clinical */
  autoSaveNotes: true,
  showVitals: true,
  showAllergies: true,
  showMedicalHistory: true,
  showPreviousNotes: true,
  showRecentReports: true,
  autoCreateVisit: true,

  /* Notifications */
  inAppNotifications: true,
  appointmentAlerts: true,
  patientUpdates: true,
  labAlerts: true,
  messageAlerts: true,
  hospitalAlerts: true,
  soundAlerts: false,
  notificationBadges: true,

  /* Appearance */
  theme: "light",
  interfaceDensity: "standard",
  showCardShadows: true,
  roundedCards: true,
  animations: true,

  /* Accessibility */
  highContrast: false,
  reduceMotion: false,
  largerText: false,
  enhancedFocus: true,
};



/* =========================================================
   SETTINGS PAGE WRAPPER
========================================================= */

function SettingsPage({ children }) {
  return (
    <div className="settings-page">
      {children}
    </div>
  );
}


/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
  title,
  description,
  children,
}) {
  return (
    <section className="settings-card">

      <div className="settings-card-header">

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

      </div>

      <div className="settings-card-body">
        {children}
      </div>

    </section>
  );
}


/* =========================================================
   TOGGLE ROW
========================================================= */

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="settings-row">

      <div className="settings-row-content">
        <strong>{label}</strong>
        <span>{description}</span>
      </div>

      <button
        type="button"
        className={`settings-toggle ${checked ? "active" : ""
          }`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span />
      </button>

    </div>
  );
}


/* =========================================================
   SELECT ROW
========================================================= */

function SelectRow({
  label,
  description,
  value,
  onChange,
  options,
}) {
  return (
    <div className="settings-row">

      <div className="settings-row-content">
        <strong>{label}</strong>
        <span>{description}</span>
      </div>

      <select
        className="settings-select"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map(([optionValue, optionLabel]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>

    </div>
  );
}



/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SettingsSection() {

  const [activeCategory, setActiveCategory] = useState("general");

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const saveSettings = () => {
    /*
     * Later:
     * API call / localStorage / backend persistence
     */
    console.log("Dashboard settings:", settings);
  };

  const ActiveIcon =
    SETTINGS_CATEGORIES.find(
      (item) => item.id === activeCategory
    )?.icon || Settings;

  return (
    <div className="settings-section">

      {/* =================================================
                LEFT SETTINGS NAVIGATION
            ================================================= */}

      <aside className="settings-sidebar">

        <div className="settings-sidebar-heading">
          <div className="settings-sidebar-icon">
            <Settings size={17} />
          </div>

          <div>
            <strong>Dashboard Settings</strong>
            <span>Customize your workspace</span>
          </div>
        </div>


        <nav className="settings-category-list">

          {SETTINGS_CATEGORIES.map((item) => {

            const Icon = item.icon;

            const active =
              activeCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`settings-category ${active ? "active" : ""
                  }`}
                onClick={() =>
                  setActiveCategory(item.id)
                }
              >

                <span className="settings-category-icon">
                  <Icon
                    size={16}
                    strokeWidth={1.9}
                  />
                </span>

                <span className="settings-category-text">
                  <strong>{item.label}</strong>
                  <small>
                    {item.description}
                  </small>
                </span>

                {active && (
                  <ChevronRight
                    size={15}
                    className="settings-category-arrow"
                  />
                )}

              </button>
            );
          })}

        </nav>

      </aside>


      {/* =================================================
                RIGHT SETTINGS WORKSPACE
            ================================================= */}

      <main className="settings-main">

        <div className="settings-main-header">

          <div className="settings-heading">

            <div className="settings-heading-icon">
              <ActiveIcon size={20} />
            </div>

            <div>
              <h2>
                {
                  SETTINGS_CATEGORIES.find(
                    (item) =>
                      item.id === activeCategory
                  )?.label
                }
              </h2>

              <p>
                Configure how this part of your
                dashboard behaves.
              </p>
            </div>

          </div>

        </div>


        {/* =================================================
                    GENERAL
                ================================================= */}

        {activeCategory === "general" && (

          <SettingsPage>

            <SettingsCard
              title="Startup"
              description="Control what happens when you open the doctor dashboard."
            >

              <SelectRow
                label="Default landing page"
                description="Choose the page opened after login."
                value={settings.defaultPage}
                onChange={(value) =>
                  updateSetting(
                    "defaultPage",
                    value
                  )
                }
                options={[
                  ["dashboard", "Dashboard"],
                  ["schedule", "Schedule"],
                  ["patients", "Patient Records"],
                  ["queue", "Queue"],
                  ["last", "Last opened page"],
                ]}
              />

              <ToggleRow
                label="Remember last opened page"
                description="Return to the section you were using previously."
                checked={settings.rememberLastPage}
                onChange={(value) =>
                  updateSetting(
                    "rememberLastPage",
                    value
                  )
                }
              />

            </SettingsCard>


            <SettingsCard
              title="Application Behavior"
              description="Configure common dashboard interactions."
            >

              <ToggleRow
                label="Auto-save"
                description="Automatically save supported changes."
                checked={settings.autoSave}
                onChange={(value) =>
                  updateSetting(
                    "autoSave",
                    value
                  )
                }
              />

              <ToggleRow
                label="Confirm important actions"
                description="Ask for confirmation before destructive or important actions."
                checked={settings.confirmActions}
                onChange={(value) =>
                  updateSetting(
                    "confirmActions",
                    value
                  )
                }
              />

              <ToggleRow
                label="Auto-refresh data"
                description="Automatically refresh dashboard information."
                checked={settings.autoRefresh}
                onChange={(value) =>
                  updateSetting(
                    "autoRefresh",
                    value
                  )
                }
              />

              <SelectRow
                label="Refresh interval"
                description="How frequently dashboard data should refresh."
                value={settings.refreshInterval}
                onChange={(value) =>
                  updateSetting(
                    "refreshInterval",
                    value
                  )
                }
                options={[
                  ["15", "15 seconds"],
                  ["30", "30 seconds"],
                  ["60", "1 minute"],
                  ["300", "5 minutes"],
                  ["manual", "Manual"],
                ]}
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    DASHBOARD
                ================================================= */}

        {activeCategory === "dashboard" && (

          <SettingsPage>

            <SettingsCard
              title="Dashboard Layout"
              description="Control the density and information shown on your dashboard."
            >

              <SelectRow
                label="Dashboard density"
                description="Choose how much information is displayed in each area."
                value={settings.dashboardDensity}
                onChange={(value) =>
                  updateSetting(
                    "dashboardDensity",
                    value
                  )
                }
                options={[
                  ["compact", "Compact"],
                  ["standard", "Standard"],
                  ["comfortable", "Comfortable"],
                ]}
              />

            </SettingsCard>


            <SettingsCard
              title="Dashboard Widgets"
              description="Choose which widgets appear on your dashboard."
            >

              <ToggleRow
                label="Today's appointments"
                description="Display your current appointment summary."
                checked={settings.showAppointments}
                onChange={(value) =>
                  updateSetting(
                    "showAppointments",
                    value
                  )
                }
              />

              <ToggleRow
                label="Patient queue"
                description="Display the current waiting queue."
                checked={settings.showQueue}
                onChange={(value) =>
                  updateSetting(
                    "showQueue",
                    value
                  )
                }
              />

              <ToggleRow
                label="Quick actions"
                description="Display frequently used dashboard actions."
                checked={settings.showQuickActions}
                onChange={(value) =>
                  updateSetting(
                    "showQuickActions",
                    value
                  )
                }
              />

              <ToggleRow
                label="Notifications"
                description="Display recent dashboard notifications."
                checked={settings.showNotifications}
                onChange={(value) =>
                  updateSetting(
                    "showNotifications",
                    value
                  )
                }
              />

              <ToggleRow
                label="Activity summary"
                description="Display your recent activity."
                checked={settings.showActivity}
                onChange={(value) =>
                  updateSetting(
                    "showActivity",
                    value
                  )
                }
              />

              <ToggleRow
                label="Recent patients"
                description="Display recently accessed patients."
                checked={settings.showRecentPatients}
                onChange={(value) =>
                  updateSetting(
                    "showRecentPatients",
                    value
                  )
                }
              />

              <ToggleRow
                label="Hospital notices"
                description="Display important hospital announcements."
                checked={settings.showHospitalNotices}
                onChange={(value) =>
                  updateSetting(
                    "showHospitalNotices",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    WORKSPACE
                ================================================= */}

        {activeCategory === "workspace" && (

          <SettingsPage>

            <SettingsCard
              title="Workspace Mode"
              description="Control the overall workspace layout."
            >

              <SelectRow
                label="Workspace mode"
                description="Choose the amount of space used by dashboard content."
                value={settings.workspaceMode}
                onChange={(value) =>
                  updateSetting(
                    "workspaceMode",
                    value
                  )
                }
                options={[
                  ["compact", "Compact"],
                  ["standard", "Standard"],
                  ["focus", "Focus mode"],
                  ["fullscreen", "Fullscreen"],
                ]}
              />

              <ToggleRow
                label="Sticky header"
                description="Keep the workspace header visible while scrolling."
                checked={settings.stickyHeader}
                onChange={(value) =>
                  updateSetting(
                    "stickyHeader",
                    value
                  )
                }
              />

              <ToggleRow
                label="Preserve scroll position"
                description="Restore your previous scroll position when returning to a section."
                checked={settings.preserveScroll}
                onChange={(value) =>
                  updateSetting(
                    "preserveScroll",
                    value
                  )
                }
              />

              <ToggleRow
                label="Resizable panels"
                description="Allow workspace panels to be resized."
                checked={settings.resizablePanels}
                onChange={(value) =>
                  updateSetting(
                    "resizablePanels",
                    value
                  )
                }
              />

              <ToggleRow
                label="Remember panel sizes"
                description="Remember your preferred panel dimensions."
                checked={settings.rememberPanelSize}
                onChange={(value) =>
                  updateSetting(
                    "rememberPanelSize",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    NAVIGATION
                ================================================= */}

        {activeCategory === "navigation" && (

          <SettingsPage>

            <SettingsCard
              title="Sidebar"
              description="Configure how the Doctor Dashboard navigation behaves."
            >

              <SelectRow
                label="Sidebar mode"
                description="Choose the default sidebar state."
                value={settings.sidebarMode}
                onChange={(value) =>
                  updateSetting(
                    "sidebarMode",
                    value
                  )
                }
                options={[
                  ["expanded", "Expanded"],
                  ["collapsed", "Collapsed"],
                  ["hover", "Expand on hover"],
                ]}
              />

              <ToggleRow
                label="Expand on hover"
                description="Temporarily expand a collapsed sidebar when hovering over it."
                checked={settings.expandOnHover}
                onChange={(value) =>
                  updateSetting(
                    "expandOnHover",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show navigation labels"
                description="Display text labels alongside navigation icons."
                checked={settings.showLabels}
                onChange={(value) =>
                  updateSetting(
                    "showLabels",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show notification badges"
                description="Display unread counts and notification indicators."
                checked={settings.showBadges}
                onChange={(value) =>
                  updateSetting(
                    "showBadges",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show section headers"
                description="Display Workspace, Care, Doctor Hub and other navigation groups."
                checked={settings.showSectionHeaders}
                onChange={(value) =>
                  updateSetting(
                    "showSectionHeaders",
                    value
                  )
                }
              />

              <ToggleRow
                label="Remember sidebar state"
                description="Keep your expanded or collapsed preference."
                checked={settings.rememberSidebar}
                onChange={(value) =>
                  updateSetting(
                    "rememberSidebar",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    SCHEDULE
                ================================================= */}

        {activeCategory === "schedule" && (

          <SettingsPage>

            <SettingsCard
              title="Calendar"
              description="Configure your default schedule and calendar behavior."
            >

              <SelectRow
                label="Default calendar view"
                description="Choose the view shown when opening Schedule."
                value={settings.calendarView}
                onChange={(value) =>
                  updateSetting(
                    "calendarView",
                    value
                  )
                }
                options={[
                  ["day", "Day"],
                  ["week", "Week"],
                  ["month", "Month"],
                  ["agenda", "Agenda"],
                ]}
              />

              <SelectRow
                label="Time slot duration"
                description="Choose the size of appointment blocks."
                value={settings.slotDuration}
                onChange={(value) =>
                  updateSetting(
                    "slotDuration",
                    value
                  )
                }
                options={[
                  ["15", "15 minutes"],
                  ["30", "30 minutes"],
                  ["60", "60 minutes"],
                ]}
              />

              <ToggleRow
                label="Snap to time slots"
                description="Align dragged appointments to calendar intervals."
                checked={settings.snapToSlot}
                onChange={(value) =>
                  updateSetting(
                    "snapToSlot",
                    value
                  )
                }
              />

              <ToggleRow
                label="Highlight today"
                description="Visually emphasize today's column."
                checked={settings.highlightToday}
                onChange={(value) =>
                  updateSetting(
                    "highlightToday",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show vacant slots"
                description="Display available appointment slots."
                checked={settings.showVacantSlots}
                onChange={(value) =>
                  updateSetting(
                    "showVacantSlots",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show past appointments"
                description="Display completed appointments in the calendar."
                checked={settings.showPastAppointments}
                onChange={(value) =>
                  updateSetting(
                    "showPastAppointments",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show unavailable periods"
                description="Display blocked or unavailable time."
                checked={settings.showUnavailable}
                onChange={(value) =>
                  updateSetting(
                    "showUnavailable",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    APPOINTMENTS
                ================================================= */}

        {activeCategory === "appointments" && (

          <SettingsPage>

            <SettingsCard
              title="Appointment Defaults"
              description="Choose your preferred appointment behavior."
            >

              <SelectRow
                label="Default duration"
                description="Default duration when creating a new appointment."
                value={settings.defaultAppointmentDuration}
                onChange={(value) =>
                  updateSetting(
                    "defaultAppointmentDuration",
                    value
                  )
                }
                options={[
                  ["15", "15 minutes"],
                  ["30", "30 minutes"],
                  ["45", "45 minutes"],
                  ["60", "60 minutes"],
                ]}
              />

              <SelectRow
                label="Default appointment type"
                description="Appointment type selected by default."
                value={settings.defaultAppointmentType}
                onChange={(value) =>
                  updateSetting(
                    "defaultAppointmentType",
                    value
                  )
                }
                options={[
                  ["consultation", "Consultation"],
                  ["followup", "Follow-up"],
                  ["online", "Online"],
                  ["emergency", "Emergency"],
                ]}
              />

            </SettingsCard>


            <SettingsCard
              title="Appointment Interaction"
              description="Control how appointments behave in Schedule."
            >

              <ToggleRow
                label="Confirm before cancellation"
                description="Ask for confirmation before cancelling an appointment."
                checked={settings.confirmCancellation}
                onChange={(value) =>
                  updateSetting(
                    "confirmCancellation",
                    value
                  )
                }
              />

              <ToggleRow
                label="Drag to reschedule"
                description="Allow appointments to be moved by dragging them."
                checked={settings.enableDragReschedule}
                onChange={(value) =>
                  updateSetting(
                    "enableDragReschedule",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show patient name"
                description="Display patient names directly inside appointment cards."
                checked={settings.showPatientName}
                onChange={(value) =>
                  updateSetting(
                    "showPatientName",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show appointment status"
                description="Display status indicators inside appointment cards."
                checked={settings.showAppointmentStatus}
                onChange={(value) =>
                  updateSetting(
                    "showAppointmentStatus",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    CLINICAL WORKFLOW
                ================================================= */}

        {activeCategory === "clinical" && (

          <SettingsPage>

            <SettingsCard
              title="Clinical Workspace"
              description="Configure your consultation workspace."
            >

              <ToggleRow
                label="Auto-save clinical notes"
                description="Automatically save notes while you are working."
                checked={settings.autoSaveNotes}
                onChange={(value) =>
                  updateSetting(
                    "autoSaveNotes",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show patient vitals"
                description="Display the latest patient vitals during consultation."
                checked={settings.showVitals}
                onChange={(value) =>
                  updateSetting(
                    "showVitals",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show allergies"
                description="Keep known allergies visible during consultation."
                checked={settings.showAllergies}
                onChange={(value) =>
                  updateSetting(
                    "showAllergies",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show medical history"
                description="Display relevant medical history in the clinical workspace."
                checked={settings.showMedicalHistory}
                onChange={(value) =>
                  updateSetting(
                    "showMedicalHistory",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show previous notes"
                description="Display previous consultation notes."
                checked={settings.showPreviousNotes}
                onChange={(value) =>
                  updateSetting(
                    "showPreviousNotes",
                    value
                  )
                }
              />

              <ToggleRow
                label="Show recent reports"
                description="Display recent laboratory and diagnostic reports."
                checked={settings.showRecentReports}
                onChange={(value) =>
                  updateSetting(
                    "showRecentReports",
                    value
                  )
                }
              />

              <ToggleRow
                label="Auto-create visit"
                description="Automatically create a visit record when consultation begins."
                checked={settings.autoCreateVisit}
                onChange={(value) =>
                  updateSetting(
                    "autoCreateVisit",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    NOTIFICATIONS
                ================================================= */}

        {activeCategory === "notifications" && (

          <SettingsPage>

            <SettingsCard
              title="Notification Types"
              description="Choose which dashboard events should notify you."
            >

              <ToggleRow
                label="Appointment alerts"
                description="Upcoming appointments, cancellations and changes."
                checked={settings.appointmentAlerts}
                onChange={(value) =>
                  updateSetting(
                    "appointmentAlerts",
                    value
                  )
                }
              />

              <ToggleRow
                label="Patient updates"
                description="Important updates related to your patients."
                checked={settings.patientUpdates}
                onChange={(value) =>
                  updateSetting(
                    "patientUpdates",
                    value
                  )
                }
              />

              <ToggleRow
                label="Lab alerts"
                description="Notify when new or critical lab results are available."
                checked={settings.labAlerts}
                onChange={(value) =>
                  updateSetting(
                    "labAlerts",
                    value
                  )
                }
              />

              <ToggleRow
                label="Message alerts"
                description="Notify when new messages or communication arrive."
                checked={settings.messageAlerts}
                onChange={(value) =>
                  updateSetting(
                    "messageAlerts",
                    value
                  )
                }
              />

              <ToggleRow
                label="Hospital alerts"
                description="Important hospital-wide notices and announcements."
                checked={settings.hospitalAlerts}
                onChange={(value) =>
                  updateSetting(
                    "hospitalAlerts",
                    value
                  )
                }
              />

            </SettingsCard>


            <SettingsCard
              title="Notification Display"
              description="Control how notifications appear."
            >

              <ToggleRow
                label="In-app notifications"
                description="Show notifications inside the dashboard."
                checked={settings.inAppNotifications}
                onChange={(value) =>
                  updateSetting(
                    "inAppNotifications",
                    value
                  )
                }
              />

              <ToggleRow
                label="Sound alerts"
                description="Play a sound when an important notification arrives."
                checked={settings.soundAlerts}
                onChange={(value) =>
                  updateSetting(
                    "soundAlerts",
                    value
                  )
                }
              />

              <ToggleRow
                label="Notification badges"
                description="Display unread counts on navigation items."
                checked={settings.notificationBadges}
                onChange={(value) =>
                  updateSetting(
                    "notificationBadges",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    APPEARANCE
                ================================================= */}

        {activeCategory === "appearance" && (

          <SettingsPage>

            <SettingsCard
              title="Theme"
              description="Choose how your dashboard looks."
            >

              <SelectRow
                label="Theme"
                description="Select your preferred interface theme."
                value={settings.theme}
                onChange={(value) =>
                  updateSetting(
                    "theme",
                    value
                  )
                }
                options={[
                  ["light", "Light"],
                  ["dark", "Dark"],
                  ["system", "System default"],
                ]}
              />

              <SelectRow
                label="Interface density"
                description="Control the amount of information shown on screen."
                value={settings.interfaceDensity}
                onChange={(value) =>
                  updateSetting(
                    "interfaceDensity",
                    value
                  )
                }
                options={[
                  ["compact", "Compact"],
                  ["standard", "Standard"],
                  ["comfortable", "Comfortable"],
                ]}
              />

            </SettingsCard>


            <SettingsCard
              title="Visual Effects"
              description="Control visual elements and animations."
            >

              <ToggleRow
                label="Card shadows"
                description="Display subtle shadows around dashboard cards."
                checked={settings.showCardShadows}
                onChange={(value) =>
                  updateSetting(
                    "showCardShadows",
                    value
                  )
                }
              />

              <ToggleRow
                label="Rounded cards"
                description="Use rounded corners throughout the dashboard."
                checked={settings.roundedCards}
                onChange={(value) =>
                  updateSetting(
                    "roundedCards",
                    value
                  )
                }
              />

              <ToggleRow
                label="Animations"
                description="Enable interface transitions and animations."
                checked={settings.animations}
                onChange={(value) =>
                  updateSetting(
                    "animations",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}


        {/* =================================================
                    ACCESSIBILITY
                ================================================= */}

        {activeCategory === "accessibility" && (

          <SettingsPage>

            <SettingsCard
              title="Accessibility"
              description="Adjust the interface to make the dashboard easier to use."
            >

              <ToggleRow
                label="High contrast"
                description="Increase visual contrast between interface elements."
                checked={settings.highContrast}
                onChange={(value) =>
                  updateSetting(
                    "highContrast",
                    value
                  )
                }
              />

              <ToggleRow
                label="Reduce motion"
                description="Reduce interface animations and transitions."
                checked={settings.reduceMotion}
                onChange={(value) =>
                  updateSetting(
                    "reduceMotion",
                    value
                  )
                }
              />

              <ToggleRow
                label="Larger text"
                description="Increase the default interface text size."
                checked={settings.largerText}
                onChange={(value) =>
                  updateSetting(
                    "largerText",
                    value
                  )
                }
              />

              <ToggleRow
                label="Enhanced focus indicators"
                description="Make keyboard focus states easier to identify."
                checked={settings.enhancedFocus}
                onChange={(value) =>
                  updateSetting(
                    "enhancedFocus",
                    value
                  )
                }
              />

            </SettingsCard>

          </SettingsPage>
        )}

      </main>


      {/* =================================================
                FOOTER
            ================================================= */}

      <div className="settings-footer">

        <button
          type="button"
          className="settings-reset-btn"
          onClick={resetSettings}
        >
          <RotateCcw size={14} />
          Reset
        </button>

        <button
          type="button"
          className="settings-save-btn"
          onClick={saveSettings}
        >
          <Save size={14} />
          Save Changes
        </button>

      </div>

    </div>
  );
}
