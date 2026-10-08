import React, { useState } from "react";
import {
    ShieldCheck,
    UserRound,
    Eye,
    EyeOff,
    Users,
    Activity,
    Stethoscope,
    MessageSquare,
    Database,
    LockKeyhole,
    Info,
} from "lucide-react";

import "../../styles/Components/personal/Privacy.css";;


/* =========================================================
   DEFAULT PRIVACY SETTINGS
========================================================= */

const DEFAULT_PRIVACY = {
    /* Profile visibility */
    profileVisible: true,
    showSpecialization: true,
    showDepartment: true,
    showContactInfo: false,

    /* Doctor Hub */
    showOnlineStatus: true,
    showAvailability: true,
    showProfessionalInfo: true,

    /* Activity */
    showActivityStatus: false,
    showLastActive: false,

    /* Patient data */
    showPatientPhotos: true,
    showSensitivePatientInfo: false,
    showPatientContact: false,

    /* Communication */
    allowDoctorMessages: true,
    allowPatientMessages: true,
    showReadStatus: true,

    /* Data sharing */
    allowAnalytics: true,
    allowUsageData: false,
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Privacy () {

    const [privacy, setPrivacy] = useState(DEFAULT_PRIVACY);

    const updatePrivacy = (key, value) => {
        setPrivacy((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetPrivacy = () => {
        setPrivacy(DEFAULT_PRIVACY);
    };

    const savePrivacy = () => {
        /*
         * Later:
         * Send privacy preferences to backend.
         */
        console.log("Privacy settings:", privacy);
    };

    return (
        <div className="privacy-section">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="privacy-header">

                <div className="privacy-header-content">

                    <div className="privacy-header-icon">
                        <ShieldCheck
                            size={21}
                            strokeWidth={1.9}
                        />
                    </div>

                    <div>
                        <h2>Privacy & Visibility</h2>

                        <p>
                            Control what information is visible to
                            other users and how your data is shared.
                        </p>
                    </div>

                </div>

                <div className="privacy-status">
                    <span className="privacy-status-dot" />
                    Privacy controls active
                </div>

            </div>


            {/* =================================================
                INFORMATION NOTICE
            ================================================= */}

            <div className="privacy-notice">

                <Info size={17} />

                <div>
                    <strong>Your privacy matters</strong>

                    <p>
                        These preferences control visibility within
                        the hospital system. Hospital policies and
                        role-based permissions may override some
                        options.
                    </p>
                </div>

            </div>


            {/* =================================================
                PROFILE VISIBILITY
            ================================================= */}

            <PrivacyCard
                icon={UserRound}
                title="Profile Visibility"
                description="Control which professional information other hospital users can see."
            >

                <PrivacyToggle
                    label="Profile visibility"
                    description="Allow other authorized hospital users to view your professional profile."
                    checked={privacy.profileVisible}
                    onChange={(value) =>
                        updatePrivacy("profileVisible", value)
                    }
                />

                <PrivacyToggle
                    label="Show specialization"
                    description="Display your medical specialization on your doctor profile."
                    checked={privacy.showSpecialization}
                    onChange={(value) =>
                        updatePrivacy("showSpecialization", value)
                    }
                />

                <PrivacyToggle
                    label="Show department"
                    description="Display your department to other authorized users."
                    checked={privacy.showDepartment}
                    onChange={(value) =>
                        updatePrivacy("showDepartment", value)
                    }
                />

                <PrivacyToggle
                    label="Show contact information"
                    description="Allow authorized users to see your professional contact details."
                    checked={privacy.showContactInfo}
                    onChange={(value) =>
                        updatePrivacy("showContactInfo", value)
                    }
                />

            </PrivacyCard>


            {/* =================================================
                DOCTOR HUB
            ================================================= */}

            <PrivacyCard
                icon={Users}
                title="Doctor Hub Visibility"
                description="Control what other doctors can see about you in the Doctor Hub."
            >

                <PrivacyToggle
                    label="Show online status"
                    description="Allow other doctors to see whether you are currently online."
                    checked={privacy.showOnlineStatus}
                    onChange={(value) =>
                        updatePrivacy("showOnlineStatus", value)
                    }
                />

                <PrivacyToggle
                    label="Show availability"
                    description="Allow other doctors to see your current availability."
                    checked={privacy.showAvailability}
                    onChange={(value) =>
                        updatePrivacy("showAvailability", value)
                    }
                />

                <PrivacyToggle
                    label="Show professional information"
                    description="Display your department and specialization in Doctor Hub."
                    checked={privacy.showProfessionalInfo}
                    onChange={(value) =>
                        updatePrivacy("showProfessionalInfo", value)
                    }
                />

            </PrivacyCard>


            {/* =================================================
                ACTIVITY
            ================================================= */}

            <PrivacyCard
                icon={Activity}
                title="Activity Visibility"
                description="Control whether your activity status is visible to others."
            >

                <PrivacyToggle
                    label="Show activity status"
                    description="Allow colleagues to see your recent activity status."
                    checked={privacy.showActivityStatus}
                    onChange={(value) =>
                        updatePrivacy("showActivityStatus", value)
                    }
                />

                <PrivacyToggle
                    label="Show last active"
                    description="Display when you were last active in the system."
                    checked={privacy.showLastActive}
                    onChange={(value) =>
                        updatePrivacy("showLastActive", value)
                    }
                />

            </PrivacyCard>


            {/* =================================================
                PATIENT DATA
            ================================================= */}

            <PrivacyCard
                icon={Stethoscope}
                title="Patient Data Display"
                description="Control optional patient information displayed inside your workspace."
            >

                <PrivacyToggle
                    label="Show patient photos"
                    description="Display patient profile photographs where available."
                    checked={privacy.showPatientPhotos}
                    onChange={(value) =>
                        updatePrivacy("showPatientPhotos", value)
                    }
                />

                <PrivacyToggle
                    label="Show sensitive information"
                    description="Display sensitive patient information when permitted by your role."
                    checked={privacy.showSensitivePatientInfo}
                    onChange={(value) =>
                        updatePrivacy(
                            "showSensitivePatientInfo",
                            value
                        )
                    }
                />

                <PrivacyToggle
                    label="Show patient contact information"
                    description="Display patient contact details in relevant clinical views."
                    checked={privacy.showPatientContact}
                    onChange={(value) =>
                        updatePrivacy(
                            "showPatientContact",
                            value
                        )
                    }
                />

            </PrivacyCard>


            {/* =================================================
                COMMUNICATION
            ================================================= */}

            <PrivacyCard
                icon={MessageSquare}
                title="Communication Privacy"
                description="Control who can contact you through the hospital system."
            >

                <PrivacyToggle
                    label="Allow doctor messages"
                    description="Allow other authorized doctors to send you direct messages."
                    checked={privacy.allowDoctorMessages}
                    onChange={(value) =>
                        updatePrivacy(
                            "allowDoctorMessages",
                            value
                        )
                    }
                />

                <PrivacyToggle
                    label="Allow patient messages"
                    description="Allow patients to contact you through supported communication channels."
                    checked={privacy.allowPatientMessages}
                    onChange={(value) =>
                        updatePrivacy(
                            "allowPatientMessages",
                            value
                        )
                    }
                />

                <PrivacyToggle
                    label="Show read status"
                    description="Allow contacts to know when you have viewed their messages."
                    checked={privacy.showReadStatus}
                    onChange={(value) =>
                        updatePrivacy("showReadStatus", value)
                    }
                />

            </PrivacyCard>


            {/* =================================================
                DATA SHARING
            ================================================= */}

            <PrivacyCard
                icon={Database}
                title="Data Sharing"
                description="Control optional use of your activity and usage information."
            >

                <PrivacyToggle
                    label="Usage analytics"
                    description="Allow anonymous usage analytics to improve the dashboard experience."
                    checked={privacy.allowAnalytics}
                    onChange={(value) =>
                        updatePrivacy("allowAnalytics", value)
                    }
                />

                <PrivacyToggle
                    label="Usage data sharing"
                    description="Allow optional sharing of non-clinical usage information for system improvement."
                    checked={privacy.allowUsageData}
                    onChange={(value) =>
                        updatePrivacy("allowUsageData", value)
                    }
                />

            </PrivacyCard>


            {/* =================================================
                PRIVACY SUMMARY
            ================================================= */}

            <div className="privacy-summary">

                <div className="privacy-summary-icon">
                    <LockKeyhole size={18} />
                </div>

                <div>
                    <strong>Role-based privacy</strong>

                    <p>
                        Privacy preferences work together with
                        hospital permissions. Clinical records,
                        patient information, and restricted data
                        remain governed by your assigned role.
                    </p>
                </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="privacy-footer">

                <button
                    type="button"
                    className="privacy-reset-btn"
                    onClick={resetPrivacy}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className="privacy-save-btn"
                    onClick={savePrivacy}
                >
                    Save Changes
                </button>

            </div>

        </div>
    );
}


/* =========================================================
   PRIVACY CARD
========================================================= */

function PrivacyCard({
    icon: Icon,
    title,
    description,
    children,
}) {
    return (
        <section className="privacy-card">

            <div className="privacy-card-header">

                <div className="privacy-card-icon">
                    <Icon size={18} strokeWidth={1.8} />
                </div>

                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

            </div>

            <div className="privacy-card-body">
                {children}
            </div>

        </section>
    );
}


/* =========================================================
   PRIVACY TOGGLE
========================================================= */

function PrivacyToggle({
    label,
    description,
    checked,
    onChange,
}) {
    return (
        <div className="privacy-row">

            <div className="privacy-row-content">

                <strong>{label}</strong>

                <span>
                    {description}
                </span>

            </div>

            <button
                type="button"
                className={`privacy-toggle ${
                    checked ? "active" : ""
                }`}
                onClick={() => onChange(!checked)}
                aria-pressed={checked}
            >
                <span />
            </button>

        </div>
    );
}
