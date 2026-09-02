import React from 'react'
import "../../styles/Receptionist/ReceptionHome.css";
import Hospital_Brand from '../../components/common/Hospital_Brand';
import { Bell } from 'lucide-react';
import ProfileMenu from '../../components/ui/ProfileMenu';

function ReceptionDashboard() {
  return (
    <>
      <header className="app-header">

        {/* Brand */}
        <div className="app-header__brand">
          <Hospital_Brand />
        </div>


        {/* Main navigation */}
        <nav className="app-header__navigation">

          <button
            type="button"
            className={`app-header__nav-item ${
              activeTab === "dashboard"
                ? "app-header__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>


          <button
            type="button"
            className={`app-header__nav-item ${
              activeTab === "patient-records"
                ? "app-header__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveTab("patient-records")}
          >
            Patients
          </button>


          <button
            type="button"
            className={`app-header__nav-item ${
              activeTab === "schedule"
                ? "app-header__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            Appointment
          </button>


          <button
            type="button"
            className={`app-header__nav-item ${
              activeTab === "Workspace"
                ? "app-header__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveTab("Workspace")}
          >
            Doctors
          </button>


          <button
            type="button"
            className="app-header__nav-item"
          >
            Dialysis
          </button>

        </nav>


        {/* Right side */}
        <div className="app-header__actions">

          {/* Notifications */}
          <div className="app-header__notification-wrap">

            <button
              type="button"
              className="app-header__icon-button"
              aria-label="Notifications"
              onClick={() => setNotifOpen(prev => !prev)}
            >
              <Bell size={18} strokeWidth={2} />

              {NOTIFICATIONS.length > 0 && (
                <span className="app-header__notification-badge">
                  {NOTIFICATIONS.length}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-dropdown__header">
                  Notifications
                </div>

                {NOTIFICATIONS.map((n) => (
                  <div
                    className="notif-dropdown__row"
                    key={n.title}
                  >
                    <span className="notif-dropdown__icon">
                      <n.icon size={15} />
                    </span>

                    <div className="notif-dropdown__info">
                      <span className="notif-dropdown__title">
                        {n.title}
                      </span>

                      <span className="notif-dropdown__subtitle">
                        {n.subtitle}
                      </span>
                    </div>

                    <span className="notif-dropdown__time">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>


          {/* Doctor profile */}
          <ProfileMenu
            variant="doctor"
            avatar={doc}
            name="Dr. Rajesh Sharma"
            role="Cardiologist"
            onNavigate={setActiveTab}
          />

        </div>

      </header>
    </>
  );
}

export default ReceptionDashboard;