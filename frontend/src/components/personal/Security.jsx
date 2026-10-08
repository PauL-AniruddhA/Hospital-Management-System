import React, { useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  Smartphone,
  Mail,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ChevronRight,
  Info,
} from "lucide-react";

import "../../styles/Components/personal/Security.css";


/* =========================================================
   DEFAULT SECURITY SETTINGS
========================================================= */

const DEFAULT_SECURITY = {
  twoFactor: true,
  loginVerification: true,
  newDeviceAlerts: true,
  suspiciousActivityAlerts: true,
  passwordExpiryReminder: true,
  recoveryEmailAlerts: true,
};


/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function Security() {

  const [security, setSecurity] = useState(
    DEFAULT_SECURITY
  );

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const updateSecurity = (key, value) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSecurity = () => {
    setSecurity(DEFAULT_SECURITY);
  };

  const saveSecurity = () => {
    /*
     * Later:
     * Send security preferences to backend.
     */
    console.log("Security settings:", security);
  };

  return (
    <div className="security-section">

      {/* =================================================
                HEADER
            ================================================= */}

      <div className="security-header">

        <div className="security-header-content">

          <div className="security-header-icon">
            <ShieldCheck
              size={21}
              strokeWidth={1.9}
            />
          </div>

          <div>
            <h2>Account Security</h2>

            <p>
              Protect your account and manage
              authentication preferences.
            </p>
          </div>

        </div>

        <div className="security-status">
          <CheckCircle2 size={14} />
          Protected
        </div>

      </div>


      {/* =================================================
                SECURITY SCORE / SUMMARY
            ================================================= */}

      <div className="security-overview">

        <div className="security-overview-icon">
          <ShieldCheck size={23} />
        </div>

        <div className="security-overview-content">

          <div className="security-overview-title">
            <strong>Good security status</strong>

            <span>
              Your account has recommended
              protections enabled.
            </span>
          </div>

          <div className="security-progress">
            <span />
          </div>

          <div className="security-progress-label">
            <span>Security level</span>
            <strong>Strong</strong>
          </div>

        </div>

      </div>


      {/* =================================================
                PASSWORD
            ================================================= */}

      <SecurityCard
        icon={LockKeyhole}
        title="Password"
        description="Manage your account password."
      >

        {!showPasswordForm ? (

          <SecurityAction
            icon={KeyRound}
            title="Change password"
            description="Update your password to keep your account secure."
            action="Change"
            onClick={() =>
              setShowPasswordForm(true)
            }
          />

        ) : (

          <PasswordForm
            onCancel={() =>
              setShowPasswordForm(false)
            }
          />

        )}

      </SecurityCard>


      {/* =================================================
                TWO FACTOR AUTHENTICATION
            ================================================= */}

      <SecurityCard
        icon={Smartphone}
        title="Two-Factor Authentication"
        description="Add an additional verification step when signing in."
      >

        <SecurityToggle
          label="Two-factor authentication"
          description="Require an additional verification code during login."
          checked={security.twoFactor}
          onChange={(value) =>
            updateSecurity(
              "twoFactor",
              value
            )
          }
        />

        <SecurityAction
          icon={Smartphone}
          title="Authentication method"
          description="Authenticator application is currently configured."
          action="Manage"
          onClick={() => {
            console.log(
              "Manage authentication method"
            );
          }}
        />

      </SecurityCard>


      {/* =================================================
                LOGIN SECURITY
            ================================================= */}

      <SecurityCard
        icon={ShieldCheck}
        title="Login Security"
        description="Control how your account responds to login activity."
      >

        <SecurityToggle
          label="Login verification"
          description="Verify unusual login attempts before allowing access."
          checked={security.loginVerification}
          onChange={(value) =>
            updateSecurity(
              "loginVerification",
              value
            )
          }
        />

        <SecurityToggle
          label="New device alerts"
          description="Notify you when your account is accessed from a new device."
          checked={security.newDeviceAlerts}
          onChange={(value) =>
            updateSecurity(
              "newDeviceAlerts",
              value
            )
          }
        />

        <SecurityToggle
          label="Suspicious activity alerts"
          description="Notify you when unusual account activity is detected."
          checked={security.suspiciousActivityAlerts}
          onChange={(value) =>
            updateSecurity(
              "suspiciousActivityAlerts",
              value
            )
          }
        />

      </SecurityCard>


      {/* =================================================
                RECOVERY
            ================================================= */}

      <SecurityCard
        icon={Mail}
        title="Account Recovery"
        description="Manage the methods used to recover your account."
      >

        <SecurityAction
          icon={Mail}
          title="Recovery email"
          description="doctor@example.com"
          action="Manage"
          onClick={() => {
            console.log(
              "Manage recovery email"
            );
          }}
        />

        <SecurityToggle
          label="Recovery notifications"
          description="Receive an alert when recovery information is changed."
          checked={security.recoveryEmailAlerts}
          onChange={(value) =>
            updateSecurity(
              "recoveryEmailAlerts",
              value
            )
          }
        />

      </SecurityCard>


      {/* =================================================
                SECURITY REMINDERS
            ================================================= */}

      <SecurityCard
        icon={Clock3}
        title="Security Reminders"
        description="Stay informed about important security actions."
      >

        <SecurityToggle
          label="Password expiry reminders"
          description="Remind you when your password should be updated."
          checked={security.passwordExpiryReminder}
          onChange={(value) =>
            updateSecurity(
              "passwordExpiryReminder",
              value
            )
          }
        />

      </SecurityCard>


      {/* =================================================
                SECURITY ACTIVITY
            ================================================= */}

      <SecurityCard
        icon={AlertTriangle}
        title="Security Activity"
        description="Review recent security-related events."
      >

        <SecurityEvent
          title="Password changed"
          description="Password was updated successfully."
          time="Today, 10:42 AM"
          type="success"
        />

        <SecurityEvent
          title="Two-factor authentication enabled"
          description="Additional login protection is active."
          time="Yesterday, 6:18 PM"
          type="success"
        />

        <SecurityEvent
          title="New login detected"
          description="A new browser session was detected."
          time="2 days ago"
          type="warning"
        />

        <button
          type="button"
          className="security-view-more"
          onClick={() => {
            console.log(
              "Open security activity"
            );
          }}
        >
          View security activity
          <ChevronRight size={15} />
        </button>

      </SecurityCard>


      {/* =================================================
                INFORMATION
            ================================================= */}

      <div className="security-info">

        <Info size={17} />

        <div>
          <strong>
            Keep your account protected
          </strong>

          <p>
            Never share your password or
            authentication codes with anyone.
            Hospital administrators will never
            ask for your login credentials.
          </p>
        </div>

      </div>


      {/* =================================================
                FOOTER
            ================================================= */}

      <div className="security-footer">

        <button
          type="button"
          className="security-reset-btn"
          onClick={resetSecurity}
        >
          Reset
        </button>

        <button
          type="button"
          className="security-save-btn"
          onClick={saveSecurity}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   SECURITY CARD
========================================================= */

function SecurityCard({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="security-card">

      <div className="security-card-header">

        <div className="security-card-icon">
          <Icon size={18} strokeWidth={1.8} />
        </div>

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

      </div>

      <div className="security-card-body">
        {children}
      </div>

    </section>
  );
}


/* =========================================================
   SECURITY TOGGLE
========================================================= */

function SecurityToggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="security-row">

      <div className="security-row-content">

        <strong>{label}</strong>

        <span>
          {description}
        </span>

      </div>

      <button
        type="button"
        className={`security-toggle ${checked ? "active" : ""
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
   SECURITY ACTION
========================================================= */

function SecurityAction({
  icon: Icon,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <button
      type="button"
      className="security-action"
      onClick={onClick}
    >

      <span className="security-action-icon">
        <Icon size={17} />
      </span>

      <span className="security-action-content">

        <strong>{title}</strong>

        <span>
          {description}
        </span>

      </span>

      <span className="security-action-button">
        {action}
      </span>

      <ChevronRight
        size={15}
        className="security-action-arrow"
      />

    </button>
  );
}


/* =========================================================
   PASSWORD FORM
========================================================= */

function PasswordForm({ onCancel }) {

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  return (
    <div className="security-password-form">

      <div className="security-field">

        <label>
          Current password
        </label>

        <div className="security-input-wrapper">

          <input
            type={
              showCurrent
                ? "text"
                : "password"
            }
            placeholder="Enter current password"
          />

          <button
            type="button"
            onClick={() =>
              setShowCurrent(
                !showCurrent
              )
            }
          >
            {showCurrent ? (
              <EyeOff size={15} />
            ) : (
              <Eye size={15} />
            )}
          </button>

        </div>

      </div>


      <div className="security-field">

        <label>
          New password
        </label>

        <div className="security-input-wrapper">

          <input
            type={
              showNew
                ? "text"
                : "password"
            }
            placeholder="Enter new password"
          />

          <button
            type="button"
            onClick={() =>
              setShowNew(
                !showNew
              )
            }
          >
            {showNew ? (
              <EyeOff size={15} />
            ) : (
              <Eye size={15} />
            )}
          </button>

        </div>

      </div>


      <div className="security-password-actions">

        <button
          type="button"
          onClick={onCancel}
          className="security-cancel-btn"
        >
          Cancel
        </button>

        <button
          type="button"
          className="security-update-btn"
        >
          Update Password
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   SECURITY EVENT
========================================================= */

function SecurityEvent({
  title,
  description,
  time,
  type,
}) {
  return (
    <div className="security-event">

      <div
        className={`security-event-icon ${type}`}
      >
        {type === "success" ? (
          <CheckCircle2 size={15} />
        ) : (
          <AlertTriangle size={15} />
        )}
      </div>

      <div className="security-event-content">

        <strong>{title}</strong>

        <span>{description}</span>

      </div>

      <time>
        {time}
      </time>

    </div>
  );
}

