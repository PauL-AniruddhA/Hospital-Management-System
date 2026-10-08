import React, { useState } from "react";
import {
    Monitor,
    Smartphone,
    Tablet,
    MapPin,
    Clock3,
    ShieldCheck,
    LogOut,
    LogOutIcon,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
} from "lucide-react";

import "../../styles/Components/personal/Sessions.css";

const INITIAL_SESSIONS = [
    {
        id: 1,
        device: "Windows PC",
        browser: "Chrome",
        location: "Guwahati, India",
        ip: "192.168.1.24",
        lastActive: "Active now",
        loginTime: "Today, 09:42 AM",
        type: "desktop",
        current: true,
        status: "active",
    },
    {
        id: 2,
        device: "Samsung Galaxy",
        browser: "Chrome Mobile",
        location: "Guwahati, India",
        ip: "192.168.1.31",
        lastActive: "18 minutes ago",
        loginTime: "Today, 08:56 AM",
        type: "mobile",
        current: false,
        status: "active",
    },
    {
        id: 3,
        device: "iPad",
        browser: "Safari",
        location: "Guwahati, India",
        ip: "192.168.1.42",
        lastActive: "Yesterday, 07:24 PM",
        loginTime: "Yesterday, 06:58 PM",
        type: "tablet",
        current: false,
        status: "active",
    },
];

const RECENT_ACTIVITY = [
    {
        id: 1,
        title: "New login",
        device: "Windows PC · Chrome",
        location: "Guwahati, India",
        time: "Today, 09:42 AM",
        type: "success",
    },
    {
        id: 2,
        title: "Session resumed",
        device: "Samsung Galaxy · Chrome Mobile",
        location: "Guwahati, India",
        time: "Today, 08:56 AM",
        type: "success",
    },
    {
        id: 3,
        title: "Session ended",
        device: "iPad · Safari",
        location: "Guwahati, India",
        time: "Yesterday, 10:12 PM",
        type: "info",
    },
];

export default function Sessions (){
    const [sessions, setSessions] = useState(INITIAL_SESSIONS);

    const activeSessions = sessions.filter(
        (session) => session.status === "active"
    );

    const getDeviceIcon = (type) => {
        if (type === "mobile") return Smartphone;
        if (type === "tablet") return Tablet;
        return Monitor;
    };

    const handleSignOut = (id) => {
        setSessions((current) =>
            current.map((session) =>
                session.id === id
                    ? { ...session, status: "signed-out" }
                    : session
            )
        );
    };

    const handleSignOutOthers = () => {
        setSessions((current) =>
            current.map((session) =>
                session.current
                    ? session
                    : { ...session, status: "signed-out" }
            )
        );
    };

    const handleRefresh = () => {
        // Replace with API call later
        console.log("Refreshing sessions...");
    };

    return (
        <div className="sessions-section">

            {/* HEADER */}
            <div className="sessions-header">
                <div>
                    <div className="sessions-heading">
                        <ShieldCheck size={20} />
                        <h2>Active Sessions</h2>
                    </div>

                    <p>
                        Review devices currently signed in to your HMS account.
                    </p>
                </div>

                <button
                    type="button"
                    className="sessions-refresh"
                    onClick={handleRefresh}
                >
                    <RefreshCw size={15} />
                    Refresh
                </button>
            </div>

            {/* SESSION SUMMARY */}
            <div className="session-summary">

                <div className="session-summary-card">
                    <div className="summary-icon active">
                        <CheckCircle2 size={18} />
                    </div>

                    <div>
                        <span>Active Sessions</span>
                        <strong>{activeSessions.length}</strong>
                    </div>
                </div>

                <div className="session-summary-card">
                    <div className="summary-icon">
                        <Monitor size={18} />
                    </div>

                    <div>
                        <span>Current Device</span>
                        <strong>
                            {sessions.find((session) => session.current)
                                ?.device || "Unknown"}
                        </strong>
                    </div>
                </div>

                <div className="session-summary-card">
                    <div className="summary-icon">
                        <Clock3 size={18} />
                    </div>

                    <div>
                        <span>Last Activity</span>
                        <strong>Active now</strong>
                    </div>
                </div>

            </div>

            {/* CURRENT SESSIONS */}
            <section className="sessions-block">

                <div className="sessions-block-header">
                    <div>
                        <h3>Signed-in Devices</h3>
                        <p>
                            Devices that currently have access to your account.
                        </p>
                    </div>

                    {activeSessions.length > 1 && (
                        <button
                            type="button"
                            className="signout-all-btn"
                            onClick={handleSignOutOthers}
                        >
                            <LogOut size={15} />
                            Sign out others
                        </button>
                    )}
                </div>

                <div className="session-list">

                    {sessions.map((session) => {
                        const DeviceIcon = getDeviceIcon(session.type);

                        const signedOut =
                            session.status === "signed-out";

                        return (
                            <div
                                key={session.id}
                                className={`session-card ${
                                    session.current ? "current-session" : ""
                                } ${signedOut ? "session-ended" : ""}`}
                            >

                                {/* DEVICE */}
                                <div className="session-device">

                                    <div className="device-icon">
                                        <DeviceIcon size={21} />
                                    </div>

                                    <div className="device-details">

                                        <div className="device-name-row">
                                            <h4>{session.device}</h4>

                                            {session.current && (
                                                <span className="current-badge">
                                                    Current
                                                </span>
                                            )}

                                            {signedOut && (
                                                <span className="ended-badge">
                                                    Signed out
                                                </span>
                                            )}
                                        </div>

                                        <span className="browser-name">
                                            {session.browser}
                                        </span>

                                    </div>

                                </div>

                                {/* SESSION INFO */}
                                <div className="session-info">

                                    <div>
                                        <MapPin size={14} />
                                        <span>{session.location}</span>
                                    </div>

                                    <div>
                                        <Clock3 size={14} />
                                        <span>{session.lastActive}</span>
                                    </div>

                                </div>

                                {/* ACTION */}
                                {!session.current && !signedOut && (
                                    <button
                                        type="button"
                                        className="session-signout"
                                        onClick={() =>
                                            handleSignOut(session.id)
                                        }
                                    >
                                        <LogOut size={15} />
                                        Sign out
                                    </button>
                                )}

                                {session.current && (
                                    <span className="current-status">
                                        <span className="status-dot" />
                                        Active
                                    </span>
                                )}

                            </div>
                        );
                    })}

                </div>

            </section>

            {/* RECENT ACTIVITY */}
            <section className="sessions-block activity-block">

                <div className="sessions-block-header">
                    <div>
                        <h3>Recent Session Activity</h3>
                        <p>
                            Recent sign-in and session events for your account.
                        </p>
                    </div>
                </div>

                <div className="activity-list">

                    {RECENT_ACTIVITY.map((activity) => (
                        <div
                            className="activity-item"
                            key={activity.id}
                        >

                            <div
                                className={`activity-icon ${activity.type}`}
                            >
                                {activity.type === "success" ? (
                                    <CheckCircle2 size={16} />
                                ) : (
                                    <AlertCircle size={16} />
                                )}
                            </div>

                            <div className="activity-content">
                                <strong>{activity.title}</strong>

                                <span>
                                    {activity.device}
                                </span>

                                <small>
                                    <MapPin size={12} />
                                    {activity.location}
                                </small>
                            </div>

                            <time>{activity.time}</time>

                        </div>
                    ))}

                </div>

            </section>

            {/* INFORMATION */}
            <div className="sessions-notice">
                <ShieldCheck size={16} />

                <p>
                    If you don't recognize a device or location, sign it out
                    immediately and review your account security settings.
                </p>
            </div>

        </div>
    );
}