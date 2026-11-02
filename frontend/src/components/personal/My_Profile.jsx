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
   HELPER (real function - has logic)
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

            {/* COVER */}
            <div className="staff-profile-cover">
                <div className="staff-cover-pattern" />
                <button
                    type="button"
                    className="staff-profile-edit"
                    onClick={() => console.log("Edit profile")}
                >
                    <Camera size={14} /> Edit Profile
                </button>
            </div>


            {/* IDENTITY */}
            <section className="staff-profile-identity">
                <div className="staff-avatar-wrapper">
                    <div className="staff-avatar">
                        {getInitials(doctor.name)}
                    </div>
                    <span className="staff-online" title="Online" />
                </div>

                <div className="staff-identity-main">
                    <div className="staff-name-row">
                        <h1>{doctor.name}</h1>
                        {doctor.verified && (
                            <span className="staff-verified" title="Verified Doctor">
                                <BadgeCheck size={15} />
                            </span>
                        )}
                    </div>

                    <p className="staff-designation">
                        {doctor.designation}
                        <span className="staff-identity-dot"> •</span>
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

                {/* STATS */}
                {/* <div className="staff-stats">
                    <div className="staff-stat-card">
                        <div className="staff-stat-icon">
                            <CalendarDays size={14} />
                        </div>
                        <strong>{doctor.appointmentsThisMonth}</strong>
                        <span>Appointments</span>
                        <small>This Month</small>
                    </div>

                    <div className="staff-stat-card">
                        <div className="staff-stat-icon success">
                            <Users size={14} />
                        </div>
                        <strong>{doctor.totalPatients}</strong>
                        <span>Patients</span>
                        <small>Total</small>
                    </div>
                </div> */}
            </section>


            {/* CONTACT STRIP */}
            {/* <div className="staff-profile-contact-strip">
                <div className="staff-contact-strip-item" title="Email">
                    <Mail size={15} />
                    <span>{doctor.email}</span>
                </div>

                <div className="staff-contact-strip-item" title="Phone">
                    <Phone size={15} />
                    <span>{doctor.phone}</span>
                </div>

                <div className="staff-contact-strip-item" title="Location">
                    <MapPin size={15} />
                    <span>{doctor.location}</span>
                </div>

                <div className="staff-contact-strip-item" title="Joined">
                    <CalendarDays size={15} />
                    <span>Joined {doctor.joiningDate}</span>
                </div>
            </div> */}


            {/* TABS */}
            <nav className="staff-profile-tabs">
                <button
                    type="button"
                    className={
                        activeTab === "overview"
                            ? "staff-profile-tab active"
                            : "staff-profile-tab"
                    }
                    onClick={() => setActiveTab("overview")}
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
                    onClick={() => setActiveTab("professional")}
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
                    onClick={() => setActiveTab("contact")}
                >
                    <Phone size={15} />
                    Contact
                </button>
            </nav>


            {/* TAB CONTENT */}
            <div className="staff-profile-content">

                {/* ================= OVERVIEW ================= */}
                {activeTab === "overview" && (
                    <div className="staff-profile-overview">

                        {/* Basic Information */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <UserRound size={17} />
                                </div>
                                <div>
                                    <h2>Basic Information</h2>
                                    <p>Personal and hospital identification details.</p>
                                </div>
                            </div>

                            <div className="staff-profile-info-grid">
                                <div className="staff-profile-info-item">
                                    <span>Full Name</span>
                                    <strong>{doctor.name}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Role</span>
                                    <strong>Doctor</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Employee ID</span>
                                    <strong>{doctor.employeeId}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Department</span>
                                    <strong>{doctor.department}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Specialization</span>
                                    <strong>{doctor.specialization}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Qualification</span>
                                    <strong>{doctor.qualification}</strong>
                                </div>
                            </div>
                        </section>

                        {/* Professional Summary */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <Stethoscope size={17} />
                                </div>
                                <div>
                                    <h2>Professional Summary</h2>
                                    <p>Current clinical role and experience.</p>
                                </div>
                            </div>

                            <div className="staff-professional-summary">
                                <div className="staff-summary-item">
                                    <div className="staff-summary-icon">
                                        <Award size={16} />
                                    </div>
                                    <div>
                                        <span>Experience</span>
                                        <strong>{doctor.experience}</strong>
                                    </div>
                                </div>

                                <div className="staff-summary-item">
                                    <div className="staff-summary-icon">
                                        <GraduationCap size={16} />
                                    </div>
                                    <div>
                                        <span>Medical College</span>
                                        <strong>{doctor.medicalCollege}</strong>
                                    </div>
                                </div>

                                <div className="staff-summary-item">
                                    <div className="staff-summary-icon">
                                        <BriefcaseMedical size={16} />
                                    </div>
                                    <div>
                                        <span>License Number</span>
                                        <strong>{doctor.licenseNumber}</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* About */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <UserRound size={17} />
                                </div>
                                <div>
                                    <h2>About</h2>
                                    <p>Professional introduction.</p>
                                </div>
                            </div>

                            <p className="staff-profile-bio">{doctor.bio}</p>
                        </section>
                    </div>
                )}


                {/* ================= PROFESSIONAL ================= */}
                {activeTab === "professional" && (
                    <div className="staff-profile-overview">

                        {/* Professional Information */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <Stethoscope size={17} />
                                </div>
                                <div>
                                    <h2>Professional Information</h2>
                                    <p>Clinical and employment information.</p>
                                </div>
                            </div>

                            <div className="staff-profile-info-grid">
                                <div className="staff-profile-info-item">
                                    <span>Designation</span>
                                    <strong>{doctor.designation}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Specialization</span>
                                    <strong>{doctor.specialization}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Department</span>
                                    <strong>{doctor.department}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Qualification</span>
                                    <strong>{doctor.qualification}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Experience</span>
                                    <strong>{doctor.experience}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>License Number</span>
                                    <strong>{doctor.licenseNumber}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Medical College</span>
                                    <strong>{doctor.medicalCollege}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Languages</span>
                                    <strong>{doctor.languages}</strong>
                                </div>
                            </div>
                        </section>

                        {/* Clinical Availability */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <Clock3 size={17} />
                                </div>
                                <div>
                                    <h2>Clinical Availability</h2>
                                    <p>Regular consultation schedule.</p>
                                </div>
                            </div>

                            <div className="staff-availability-grid">
                                <div className="staff-availability-item">
                                    <span>Working Days</span>
                                    <strong>{doctor.workingDays}</strong>
                                </div>
                                <div className="staff-availability-item">
                                    <span>Consultation Hours</span>
                                    <strong>{doctor.consultationHours}</strong>
                                </div>
                            </div>
                        </section>
                    </div>
                )}


                {/* ================= CONTACT ================= */}
                {activeTab === "contact" && (
                    <div className="staff-profile-overview">

                        {/* Contact Information */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <Mail size={17} />
                                </div>
                                <div>
                                    <h2>Contact Information</h2>
                                    <p>Contact details associated with your hospital profile.</p>
                                </div>
                            </div>

                            <div className="staff-contact-detail-grid">
                                <div className="staff-contact-detail">
                                    <div className="staff-contact-detail-icon">
                                        <Mail size={17} />
                                    </div>
                                    <div>
                                        <span>Email Address</span>
                                        <strong>{doctor.email}</strong>
                                    </div>
                                </div>

                                <div className="staff-contact-detail">
                                    <div className="staff-contact-detail-icon">
                                        <Phone size={17} />
                                    </div>
                                    <div>
                                        <span>Phone Number</span>
                                        <strong>{doctor.phone}</strong>
                                    </div>
                                </div>

                                <div className="staff-contact-detail">
                                    <div className="staff-contact-detail-icon">
                                        <MapPin size={17} />
                                    </div>
                                    <div>
                                        <span>Location</span>
                                        <strong>{doctor.location}</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Hospital Information */}
                        <section className="staff-profile-card">
                            <div className="staff-profile-card-header">
                                <div className="staff-profile-card-icon">
                                    <CalendarDays size={17} />
                                </div>
                                <div>
                                    <h2>Hospital Information</h2>
                                    <p>Employment details.</p>
                                </div>
                            </div>

                            <div className="staff-profile-info-grid">
                                <div className="staff-profile-info-item">
                                    <span>Employee ID</span>
                                    <strong>{doctor.employeeId}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Department</span>
                                    <strong>{doctor.department}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Joining Date</span>
                                    <strong>{doctor.joiningDate}</strong>
                                </div>
                                <div className="staff-profile-info-item">
                                    <span>Role</span>
                                    <strong>Doctor</strong>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

            </div>
        </div>
    );
}