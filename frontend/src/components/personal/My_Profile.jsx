import React, { useState } from "react";
import {
    UserRound,
    BadgeCheck,
    Building2,
    BriefcaseMedical,
    Stethoscope,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
    CalendarDays,
    Clock3,
    Award,
    Camera,
    Users,
} from "lucide-react";

import "../../styles/Components/personal/My_Profile.css";


/* =========================================
   MOCK DATA
========================================= */

const DOCTOR = {
    name: "Dr. Aniruddha Paul",
    designation: "General Physician",
    qualification: "MD (Internal Medicine)",

    employeeId: "EMP-2026-014",
    department: "Department of Medicine",
    specialization: "General Physician",

    email: "aniruddha.paul@amshospital.org",
    phone: "+91 98765 43210",
    location: "Guwahati, Assam",

    experience: "12 Years",
    joiningDate: "January 2026",
    licenseNumber: "MCI-458921",

    appointmentsThisMonth: "128",
    totalPatients: "1.2K",

    medicalCollege: "Gauhati Medical College",
    languages: "English, Hindi, Assamese",

    workingDays: "Monday – Saturday",
    consultationHours: "09:00 AM – 01:00 PM",

    bio:
        "Dedicated and compassionate physician with a strong interest in internal medicine and patient-centered care. Committed to continuous learning and delivering high-quality healthcare services.",

    verified: true,
};


/* =========================================
   HELPERS
========================================= */

function getInitials(name) {
    return name
        .replace(/^Dr\.?\s+/i, "")
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}


/* =========================================
   COMPONENT
========================================= */

export default function Profile() {

    const [activeTab, setActiveTab] = useState("overview");

    const doctor = DOCTOR;

    return (
        <div className="staff-profile">

            {/* =========================================
                COVER
            ========================================= */}

            <div className="staff-profile-cover">

                <div className="staff-cover-pattern" />

                <button
                    type="button"
                    className="staff-profile-edit"
                    onClick={() =>
                        console.log("Edit profile")
                    }
                >
                    <Camera size={14} />
                    Edit Profile
                </button>

            </div>


            {/* =========================================
                IDENTITY
            ========================================= */}

            <section className="staff-profile-identity">

                <div className="staff-avatar-wrapper">

                    <div className="staff-avatar">
                        {getInitials(doctor.name)}
                    </div>

                    <span
                        className="staff-online"
                        title="Online"
                    />

                </div>


                <div className="staff-identity-main">

                    <div className="staff-name-row">

                        <h1>
                            {doctor.name}
                        </h1>

                        {doctor.verified && (
                            <span
                                className="staff-verified"
                                title="Verified Doctor"
                            >
                                <BadgeCheck size={15} />
                            </span>
                        )}

                    </div>


                    <p className="staff-designation">
                        {doctor.designation}

                        <span className="staff-identity-dot">
                            •
                        </span>

                        {doctor.qualification}
                    </p>


                    <div className="staff-tags">

                        <span className="staff-tag primary">
                            <BriefcaseMedical size={13} />
                            Doctor
                        </span>

                        <span className="staff-tag">
                            {doctor.employeeId}
                        </span>

                        <span className="staff-tag">
                            <Building2 size={13} />
                            {doctor.department}
                        </span>

                    </div>

                </div>


                <div className="staff-stats">

                    <StatCard
                        icon={CalendarDays}
                        value={doctor.appointmentsThisMonth}
                        label="Appointments"
                        sub="This Month"
                    />

                    <StatCard
                        icon={Users}
                        tone="success"
                        value={doctor.totalPatients}
                        label="Patients"
                        sub="Total"
                    />

                </div>

            </section>


            {/* =========================================
                CONTACT STRIP
            ========================================= */}

            <div className="staff-profile-contact-strip">

                <ContactItem
                    icon={Mail}
                    label="Email"
                    value={doctor.email}
                />

                <ContactItem
                    icon={Phone}
                    label="Phone"
                    value={doctor.phone}
                />

                <ContactItem
                    icon={MapPin}
                    label="Location"
                    value={doctor.location}
                />

                <ContactItem
                    icon={CalendarDays}
                    label="Joined"
                    value={`Joined ${doctor.joiningDate}`}
                />

            </div>


            {/* =========================================
                TABS
            ========================================= */}

            <nav className="staff-profile-tabs">

                <button
                    type="button"
                    className={
                        activeTab === "overview"
                            ? "staff-profile-tab active"
                            : "staff-profile-tab"
                    }
                    onClick={() =>
                        setActiveTab("overview")
                    }
                >
                    <UserRound size={15} />
                    Overview
                </button>


                <button
                    type="button"
                    className={
                        activeTab === "professional"
                            ? "staff-profile-tab active"
                            : "staff-profile-tab"
                    }
                    onClick={() =>
                        setActiveTab("professional")
                    }
                >
                    <Stethoscope size={15} />
                    Professional
                </button>


                <button
                    type="button"
                    className={
                        activeTab === "contact"
                            ? "staff-profile-tab active"
                            : "staff-profile-tab"
                    }
                    onClick={() =>
                        setActiveTab("contact")
                    }
                >
                    <Phone size={15} />
                    Contact
                </button>

            </nav>


            {/* =========================================
                TAB CONTENT
            ========================================= */}

            <div className="staff-profile-content">

                {activeTab === "overview" && (
                    <Overview doctor={doctor} />
                )}

                {activeTab === "professional" && (
                    <Professional doctor={doctor} />
                )}

                {activeTab === "contact" && (
                    <Contact doctor={doctor} />
                )}

            </div>

        </div>
    );
}


/* =========================================
   OVERVIEW
========================================= */

function Overview({ doctor }) {

    return (
        <div className="staff-profile-overview">

            {/* BASIC INFORMATION */}

            <section className="staff-profile-card">

                <CardHeader
                    icon={UserRound}
                    title="Basic Information"
                    subtitle="Personal and hospital identification details."
                />


                <div className="staff-profile-info-grid">

                    <InfoItem
                        label="Full Name"
                        value={doctor.name}
                    />

                    <InfoItem
                        label="Role"
                        value="Doctor"
                    />

                    <InfoItem
                        label="Employee ID"
                        value={doctor.employeeId}
                    />

                    <InfoItem
                        label="Department"
                        value={doctor.department}
                    />

                    <InfoItem
                        label="Specialization"
                        value={doctor.specialization}
                    />

                    <InfoItem
                        label="Qualification"
                        value={doctor.qualification}
                    />

                </div>

            </section>


            {/* PROFESSIONAL SUMMARY */}

            <section className="staff-profile-card">

                <CardHeader
                    icon={Stethoscope}
                    title="Professional Summary"
                    subtitle="Current clinical role and experience."
                />


                <div className="staff-professional-summary">

                    <SummaryItem
                        icon={Award}
                        label="Experience"
                        value={doctor.experience}
                    />

                    <SummaryItem
                        icon={GraduationCap}
                        label="Medical College"
                        value={doctor.medicalCollege}
                    />

                    <SummaryItem
                        icon={BriefcaseMedical}
                        label="License Number"
                        value={doctor.licenseNumber}
                    />

                </div>

            </section>


            {/* ABOUT */}

            <section className="staff-profile-card">

                <CardHeader
                    icon={UserRound}
                    title="About"
                    subtitle="Professional introduction."
                />

                <p className="staff-profile-bio">
                    {doctor.bio}
                </p>

            </section>

        </div>
    );
}


/* =========================================
   PROFESSIONAL
========================================= */

function Professional({ doctor }) {

    return (
        <div className="staff-profile-overview">

            <section className="staff-profile-card">

                <CardHeader
                    icon={Stethoscope}
                    title="Professional Information"
                    subtitle="Clinical and employment information."
                />

                <div className="staff-profile-info-grid">

                    <InfoItem
                        label="Designation"
                        value={doctor.designation}
                    />

                    <InfoItem
                        label="Specialization"
                        value={doctor.specialization}
                    />

                    <InfoItem
                        label="Department"
                        value={doctor.department}
                    />

                    <InfoItem
                        label="Qualification"
                        value={doctor.qualification}
                    />

                    <InfoItem
                        label="Experience"
                        value={doctor.experience}
                    />

                    <InfoItem
                        label="License Number"
                        value={doctor.licenseNumber}
                    />

                    <InfoItem
                        label="Medical College"
                        value={doctor.medicalCollege}
                    />

                    <InfoItem
                        label="Languages"
                        value={doctor.languages}
                    />

                </div>

            </section>


            <section className="staff-profile-card">

                <CardHeader
                    icon={Clock3}
                    title="Clinical Availability"
                    subtitle="Regular consultation schedule."
                />

                <div className="staff-availability-grid">

                    <div className="staff-availability-item">

                        <span>
                            Working Days
                        </span>

                        <strong>
                            {doctor.workingDays}
                        </strong>

                    </div>


                    <div className="staff-availability-item">

                        <span>
                            Consultation Hours
                        </span>

                        <strong>
                            {doctor.consultationHours}
                        </strong>

                    </div>

                </div>

            </section>

        </div>
    );
}


/* =========================================
   CONTACT
========================================= */

function Contact({ doctor }) {

    return (
        <div className="staff-profile-overview">

            <section className="staff-profile-card">

                <CardHeader
                    icon={Mail}
                    title="Contact Information"
                    subtitle="Contact details associated with your hospital profile."
                />

                <div className="staff-contact-detail-grid">

                    <ContactDetail
                        icon={Mail}
                        label="Email Address"
                        value={doctor.email}
                    />

                    <ContactDetail
                        icon={Phone}
                        label="Phone Number"
                        value={doctor.phone}
                    />

                    <ContactDetail
                        icon={MapPin}
                        label="Location"
                        value={doctor.location}
                    />

                </div>

            </section>


            <section className="staff-profile-card">

                <CardHeader
                    icon={CalendarDays}
                    title="Hospital Information"
                    subtitle="Employment details."
                />

                <div className="staff-profile-info-grid">

                    <InfoItem
                        label="Employee ID"
                        value={doctor.employeeId}
                    />

                    <InfoItem
                        label="Department"
                        value={doctor.department}
                    />

                    <InfoItem
                        label="Joining Date"
                        value={doctor.joiningDate}
                    />

                    <InfoItem
                        label="Role"
                        value="Doctor"
                    />

                </div>

            </section>

        </div>
    );
}


/* =========================================
   REUSABLE COMPONENTS
========================================= */

function CardHeader({
    icon: Icon,
    title,
    subtitle,
}) {
    return (
        <div className="staff-profile-card-header">

            <div className="staff-profile-card-icon">
                <Icon size={17} />
            </div>

            <div>
                <h2>{title}</h2>

                <p>
                    {subtitle}
                </p>
            </div>

        </div>
    );
}


function InfoItem({
    label,
    value,
}) {
    return (
        <div className="staff-profile-info-item">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}


function SummaryItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="staff-summary-item">

            <div className="staff-summary-icon">
                <Icon size={16} />
            </div>

            <div>
                <span>{label}</span>
                <strong>{value}</strong>
            </div>

        </div>
    );
}


function ContactItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div
            className="staff-contact-strip-item"
            title={label}
        >

            <Icon size={15} />

            <span>{value}</span>

        </div>
    );
}


function StatCard({
    icon: Icon,
    tone,
    value,
    label,
    sub,
}) {
    return (
        <div className="staff-stat-card">

            <div
                className={
                    tone
                        ? `staff-stat-icon ${tone}`
                        : "staff-stat-icon"
                }
            >
                <Icon size={14} />
            </div>

            <strong>{value}</strong>

            <span>{label}</span>

            <small>{sub}</small>

        </div>
    );
}


function ContactDetail({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="staff-contact-detail">

            <div className="staff-contact-detail-icon">
                <Icon size={17} />
            </div>

            <div>
                <span>{label}</span>
                <strong>{value}</strong>
            </div>

        </div>
    );
}