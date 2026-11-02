import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Settings, LayoutDashboard, Monitor, PanelLeft, CalendarDays, Clock3, Stethoscope, Bell, Palette, Accessibility, Save, RotateCcw, ChevronRight, Check } from "lucide-react";

import "../../styles/Components/personal/SettingsSection.css";


/* =========================================================
   CONSTANTS
========================================================= */

const STORAGE_KEY = "doctorDashboardSettings";
const AUTOSAVE_DELAY = 600;   // ms
const SAVED_FLASH = 2200;     // ms


/* =========================================================
   SETTINGS CATEGORIES
========================================================= */

const SETTINGS_CATEGORIES = [
  { id: "general", label: "General", description: "Application behavior", icon: Settings },
  { id: "dashboard", label: "Dashboard", description: "Cards and widgets", icon: LayoutDashboard },
  { id: "workspace", label: "Workspace", description: "Workspace behavior", icon: Monitor },
  { id: "navigation", label: "Navigation", description: "Sidebar and navigation", icon: PanelLeft },
  { id: "schedule", label: "Schedule", description: "Calendar preferences", icon: CalendarDays },
  { id: "appointments", label: "Appointments", description: "Appointment behavior", icon: Clock3 },
  { id: "clinical", label: "Clinical Workflow", description: "Consultation preferences", icon: Stethoscope },
  { id: "notifications", label: "Notifications", description: "Alerts and reminders", icon: Bell },
  { id: "appearance", label: "Appearance", description: "Visual preferences", icon: Palette },
  { id: "accessibility", label: "Accessibility", description: "Accessibility options", icon: Accessibility },
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

const SETTING_KEYS = Object.keys(DEFAULT_SETTINGS);


/* =========================================================
   SCHEMA HELPERS
   Every row is described once as data and rendered by one
   component, instead of ~800 lines of copy-pasted JSX.
   `disabled(settings)` greys out a row that depends on another.
========================================================= */

const toggle = (key, label, description, disabled) => ({
  type: "toggle", key, label, description, disabled,
});

const select = (key, label, description, options, disabled) => ({
  type: "select", key, label, description, options, disabled,
});

const DENSITY_OPTIONS = [
  ["compact", "Compact"],
  ["standard", "Standard"],
  ["comfortable", "Comfortable"],
];


/* =========================================================
   SETTINGS SCHEMA
========================================================= */

const SETTINGS_SCHEMA = {
  general: [
    {
      title: "Startup",
      description: "Control what happens when you open the doctor dashboard.",
      rows: [
        select(
          "defaultPage",
          "Default landing page",
          "Page opened after login. Ignored while “Remember last opened page” is on.",
          [
            ["dashboard", "Dashboard"],
            ["schedule", "Schedule"],
            ["patients", "Patient Records"],
            ["queue", "Queue"],
          ],
          (s) => s.rememberLastPage
        ),
        toggle(
          "rememberLastPage",
          "Remember last opened page",
          "Return to the section you were using previously."
        ),
      ],
    },
    {
      title: "Application Behavior",
      description: "Configure common dashboard interactions.",
      rows: [
        toggle(
          "autoSave",
          "Auto-save settings",
          "Save changes to these settings automatically as you make them."
        ),
        toggle(
          "confirmActions",
          "Confirm important actions",
          "Ask for confirmation before destructive or important actions."
        ),
        toggle(
          "autoRefresh",
          "Auto-refresh data",
          "Automatically refresh dashboard information."
        ),
        select(
          "refreshInterval",
          "Refresh interval",
          "How frequently dashboard data should refresh.",
          [
            ["15", "15 seconds"],
            ["30", "30 seconds"],
            ["60", "1 minute"],
            ["300", "5 minutes"],
          ],
          (s) => !s.autoRefresh
        ),
      ],
    },
  ],

  dashboard: [
    {
      title: "Dashboard Widgets",
      description: "Choose which widgets appear on your dashboard.",
      rows: [
        toggle("showAppointments", "Today's appointments", "Display your current appointment summary."),
        toggle("showQueue", "Patient queue", "Display the current waiting queue."),
        toggle("showQuickActions", "Quick actions", "Display frequently used dashboard actions."),
        toggle("showNotifications", "Notifications", "Display recent dashboard notifications."),
        toggle("showActivity", "Activity summary", "Display your recent activity."),
        toggle("showRecentPatients", "Recent patients", "Display recently accessed patients."),
        toggle("showHospitalNotices", "Hospital notices", "Display important hospital announcements."),
      ],
    },
  ],

  workspace: [
    {
      title: "Workspace Mode",
      description: "Control the overall workspace layout.",
      rows: [
        select(
          "workspaceMode",
          "Workspace mode",
          "Choose the amount of space used by dashboard content.",
          [
            ["standard", "Standard"],
            ["focus", "Focus mode"],
            ["fullscreen", "Fullscreen"],
          ]
        ),
        toggle("stickyHeader", "Sticky header", "Keep the workspace header visible while scrolling."),
        toggle("preserveScroll", "Preserve scroll position", "Restore your previous scroll position when returning to a section."),
        toggle("resizablePanels", "Resizable panels", "Allow workspace panels to be resized."),
        toggle(
          "rememberPanelSize",
          "Remember panel sizes",
          "Remember your preferred panel dimensions.",
          (s) => !s.resizablePanels
        ),
      ],
    },
  ],

  navigation: [
    {
      title: "Sidebar",
      description: "Configure how the Doctor Dashboard navigation behaves.",
      rows: [
        select(
          "sidebarMode",
          "Sidebar mode",
          "Choose the default sidebar state.",
          [
            ["expanded", "Expanded"],
            ["collapsed", "Collapsed"],
          ]
        ),
        toggle(
          "expandOnHover",
          "Expand on hover",
          "Temporarily expand a collapsed sidebar when hovering over it.",
          (s) => s.sidebarMode !== "collapsed"
        ),
        toggle("showLabels", "Show navigation labels", "Display text labels alongside navigation icons."),
        toggle("showBadges", "Show notification badges", "Display unread counts and notification indicators."),
        toggle("showSectionHeaders", "Show section headers", "Display Workspace, Care, Doctor Hub and other navigation groups."),
        toggle("rememberSidebar", "Remember sidebar state", "Keep your expanded or collapsed preference."),
      ],
    },
  ],

  schedule: [
    {
      title: "Calendar",
      description: "Configure your default schedule and calendar behavior.",
      rows: [
        select(
          "calendarView",
          "Default calendar view",
          "Choose the view shown when opening Schedule.",
          [
            ["day", "Day"],
            ["week", "Week"],
            ["month", "Month"],
            ["agenda", "Agenda"],
          ]
        ),
        select(
          "slotDuration",
          "Time slot duration",
          "Choose the size of appointment blocks.",
          [
            ["15", "15 minutes"],
            ["30", "30 minutes"],
            ["60", "60 minutes"],
          ]
        ),
        toggle("snapToSlot", "Snap to time slots", "Align dragged appointments to calendar intervals."),
        toggle("highlightToday", "Highlight today", "Visually emphasize today's column."),
        toggle("showVacantSlots", "Show vacant slots", "Display available appointment slots."),
        toggle("showPastAppointments", "Show past appointments", "Display completed appointments in the calendar."),
        toggle("showUnavailable", "Show unavailable periods", "Display blocked or unavailable time."),
      ],
    },
  ],

  appointments: [
    {
      title: "Appointment Defaults",
      description: "Choose your preferred appointment behavior.",
      rows: [
        select(
          "defaultAppointmentDuration",
          "Default duration",
          "Default duration when creating a new appointment.",
          [
            ["15", "15 minutes"],
            ["30", "30 minutes"],
            ["45", "45 minutes"],
            ["60", "60 minutes"],
          ]
        ),
        select(
          "defaultAppointmentType",
          "Default appointment type",
          "Appointment type selected by default.",
          [
            ["consultation", "Consultation"],
            ["followup", "Follow-up"],
            ["online", "Online"],
            ["emergency", "Emergency"],
          ]
        ),
      ],
    },
    {
      title: "Appointment Interaction",
      description: "Control how appointments behave in Schedule.",
      rows: [
        toggle("confirmCancellation", "Confirm before cancellation", "Ask for confirmation before cancelling an appointment."),
        toggle("enableDragReschedule", "Drag to reschedule", "Allow appointments to be moved by dragging them."),
        toggle("showPatientName", "Show patient name", "Display patient names directly inside appointment cards."),
        toggle("showAppointmentStatus", "Show appointment status", "Display status indicators inside appointment cards."),
      ],
    },
  ],

  clinical: [
    {
      title: "Clinical Workspace",
      description: "Configure your consultation workspace.",
      rows: [
        toggle("autoSaveNotes", "Auto-save clinical notes", "Automatically save notes while you are working."),
        toggle("showVitals", "Show patient vitals", "Display the latest patient vitals during consultation."),
        toggle("showAllergies", "Show allergies", "Keep known allergies visible during consultation."),
        toggle("showMedicalHistory", "Show medical history", "Display relevant medical history in the clinical workspace."),
        toggle("showPreviousNotes", "Show previous notes", "Display previous consultation notes."),
        toggle("showRecentReports", "Show recent reports", "Display recent laboratory and diagnostic reports."),
        toggle("autoCreateVisit", "Auto-create visit", "Automatically create a visit record when consultation begins."),
      ],
    },
  ],

  notifications: [
    {
      title: "Notification Types",
      description: "Choose which dashboard events should notify you.",
      rows: [
        toggle("appointmentAlerts", "Appointment alerts", "Upcoming appointments, cancellations and changes."),
        toggle("patientUpdates", "Patient updates", "Important updates related to your patients."),
        toggle("labAlerts", "Lab alerts", "Notify when new or critical lab results are available."),
        toggle("messageAlerts", "Message alerts", "Notify when new messages or communication arrive."),
        toggle("hospitalAlerts", "Hospital alerts", "Important hospital-wide notices and announcements."),
      ],
    },
    {
      title: "Notification Display",
      description: "Control how notifications appear.",
      rows: [
        toggle("inAppNotifications", "In-app notifications", "Show notifications inside the dashboard."),
        toggle(
          "soundAlerts",
          "Sound alerts",
          "Play a sound when an important notification arrives.",
          (s) => !s.inAppNotifications
        ),
      ],
    },
  ],

  appearance: [
    {
      title: "Theme",
      description: "Choose how your dashboard looks.",
      rows: [
        select(
          "theme",
          "Theme",
          "Select your preferred interface theme.",
          [
            ["light", "Light"],
            ["dark", "Dark"],
            ["system", "System default"],
          ]
        ),
        select(
          "interfaceDensity",
          "Interface density",
          "Control the amount of information shown on screen.",
          DENSITY_OPTIONS
        ),
      ],
    },
    {
      title: "Visual Effects",
      description: "Control visual elements and animations.",
      rows: [
        toggle("showCardShadows", "Card shadows", "Display subtle shadows around dashboard cards."),
        toggle("roundedCards", "Rounded cards", "Use rounded corners throughout the dashboard."),
        toggle(
          "animations",
          "Animations",
          "Enable interface transitions and animations.",
          (s) => s.reduceMotion
        ),
      ],
    },
  ],

  accessibility: [
    {
      title: "Accessibility",
      description: "Adjust the interface to make the dashboard easier to use.",
      rows: [
        toggle("highContrast", "High contrast", "Increase visual contrast between interface elements."),
        toggle("reduceMotion", "Reduce motion", "Reduce interface animations and transitions."),
        toggle("largerText", "Larger text", "Increase the default interface text size."),
        toggle("enhancedFocus", "Enhanced focus indicators", "Make keyboard focus states easier to identify."),
      ],
    },
  ],
};


/* =========================================================
   STORAGE HELPERS
========================================================= */

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const stored = JSON.parse(raw);
    const merged = { ...DEFAULT_SETTINGS };

    // Only accept known keys so stale/removed settings never leak in.
    SETTING_KEYS.forEach((key) => {
      if (key in stored) merged[key] = stored[key];
    });

    return merged;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function persistSettings(settings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

const isSameSettings = (a, b) =>
  SETTING_KEYS.every((key) => a[key] === b[key]);


/* =========================================================
   SETTINGS PAGE WRAPPER
========================================================= */

function SettingsPage({ children }) {
  return <div className="settings-page">{children}</div>;
}


/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({ title, description, children }) {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="settings-card-body">{children}</div>
    </section>
  );
}


/* =========================================================
   SETTING ROW (toggle or select)
========================================================= */

function SettingRow({ item, value, disabled, onChange }) {
  const id = `setting-${item.key}`;
  const labelId = `${id}-label`;
  const descId = `${id}-desc`;

  const rowClass = [
    "settings-row",
    item.type === "select" ? "settings-row--select" : "",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rowClass}>
      <div className="settings-row-content">
        <strong id={labelId}>{item.label}</strong>
        <span id={descId}>{item.description}</span>
      </div>

      {item.type === "toggle" ? (
        <button
          type="button"
          id={id}
          role="switch"
          aria-checked={value}
          aria-labelledby={labelId}
          aria-describedby={descId}
          className={`settings-toggle ${value ? "active" : ""}`}
          disabled={disabled}
          onClick={() => onChange(item.key, !value)}
        >
          <span aria-hidden="true" />
        </button>
      ) : (
        <select
          id={id}
          className="settings-select"
          aria-labelledby={labelId}
          aria-describedby={descId}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(item.key, event.target.value)}
        >
          {item.options.map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SettingsSection({ onSave }) {
  const [activeCategory, setActiveCategory] = useState("general");

  const [savedSettings, setSavedSettings] = useState(loadSettings);
  const [settings, setSettings] = useState(savedSettings);
  const [justSaved, setJustSaved] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  const mainRef = useRef(null);
  const flashTimer = useRef(null);

  const isDirty = useMemo(
    () => !isSameSettings(settings, savedSettings),
    [settings, savedSettings]
  );

  const activeItem =
    SETTINGS_CATEGORIES.find((item) => item.id === activeCategory) ||
    SETTINGS_CATEGORIES[0];

  const ActiveIcon = activeItem.icon;

  /* ---------- system theme ---------- */

  useEffect(() => {
    if (!window.matchMedia) return undefined;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const resolvedTheme =
    settings.theme === "system"
      ? systemDark ? "dark" : "light"
      : settings.theme;

  /* ---------- actions ---------- */

  const updateSetting = useCallback((key, value) => {
    setJustSaved(false);
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveSettings = useCallback(() => {
    if (!persistSettings(settings)) return;

    setSavedSettings(settings);
    onSave?.(settings);

    setJustSaved(true);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setJustSaved(false), SAVED_FLASH);
  }, [settings, onSave]);

  const resetSettings = () => {
    if (
      settings.confirmActions &&
      !window.confirm("Reset all settings to their defaults?")
    ) {
      return;
    }
    setJustSaved(false);
    setSettings(DEFAULT_SETTINGS);
  };

  /* ---------- auto-save ---------- */

  useEffect(() => {
    if (!settings.autoSave || !isDirty) return undefined;

    const timer = setTimeout(saveSettings, AUTOSAVE_DELAY);
    return () => clearTimeout(timer);
  }, [settings.autoSave, isDirty, saveSettings]);

  /* ---------- cleanup + scroll reset ---------- */

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeCategory]);

  /* ---------- footer status ---------- */

  let status = null;
  if (isDirty) {
    status = settings.autoSave ? "Saving…" : "Unsaved changes";
  } else if (justSaved) {
    status = (
      <>
        <Check size={14} aria-hidden="true" />
        Changes saved
      </>
    );
  }

  return (
    <div
      className="settings-section"
      data-theme={resolvedTheme}
      data-density={settings.interfaceDensity}
      data-shadows={settings.showCardShadows ? "on" : "off"}
      data-rounded={settings.roundedCards ? "on" : "off"}
      data-animations={
        settings.animations && !settings.reduceMotion ? "on" : "off"
      }
      data-contrast={settings.highContrast ? "high" : "normal"}
      data-large-text={settings.largerText ? "on" : "off"}
      data-focus={settings.enhancedFocus ? "enhanced" : "normal"}
    >

      {/* =================================================
          LEFT SETTINGS NAVIGATION
      ================================================= */}

      <aside className="settings-sidebar">

        {/* <div className="settings-sidebar-heading">
          <div className="settings-sidebar-icon">
            <Settings size={17} aria-hidden="true" />
          </div>

          <div>
            <strong>Dashboard Settings</strong>
            <span>Customize your workspace</span>
          </div>
        </div> */}

        <nav
          className="settings-category-list"
          aria-label="Settings categories"
        >
          {SETTINGS_CATEGORIES.map((item) => {
            const Icon = item.icon;
            const active = activeCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`settings-category ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setActiveCategory(item.id)}
              >
                <span className="settings-category-icon">
                  <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>

                <span className="settings-category-text">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>

                {active && (
                  <ChevronRight size={15} className="settings-category-arrow" aria-hidden="true"/>
                )}
              </button>
            );
          })}
        </nav>

      </aside>


      {/* =================================================
          RIGHT SETTINGS WORKSPACE
      ================================================= */}

      <div className="settings-content">

        <main className="settings-main" ref={mainRef}>

          <div className="settings-main-header">
            <div className="settings-heading">
              <div className="settings-heading-icon">
                <ActiveIcon size={20} aria-hidden="true" />
              </div>

              <div>
                <h2>{activeItem.label}</h2>
                <p>{activeItem.description}</p>
              </div>
            </div>
          </div>

          <SettingsPage>
            {SETTINGS_SCHEMA[activeCategory].map((card) => (
              <SettingsCard
                key={card.title}
                title={card.title}
                description={card.description}
              >
                {card.rows.map((row) => (
                  <SettingRow
                    key={row.key}
                    item={row}
                    value={settings[row.key]}
                    disabled={row.disabled ? row.disabled(settings) : false}
                    onChange={updateSetting}
                  />
                ))}
              </SettingsCard>
            ))}
          </SettingsPage>

        </main>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="settings-footer">

          <span
            className="settings-status"
            role="status"
            aria-live="polite"
          >
            {status}
          </span>

          <button
            type="button"
            className="settings-reset-btn"
            onClick={resetSettings}
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset to defaults
          </button>

          <button
            type="button"
            className="settings-save-btn"
            onClick={saveSettings}
            disabled={!isDirty}
          >
            <Save size={14} aria-hidden="true" />
            Save changes
          </button>

        </footer>

      </div>

    </div>
  );
}