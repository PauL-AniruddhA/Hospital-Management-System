import React, { useState } from "react";
import {
    Languages,
    Globe2,
    CalendarDays,
    Clock3,
    Hash,
    CheckCircle2,
    RotateCcw,
} from "lucide-react";

import "../../styles/Components/personal/Language.css";

const DEFAULT_LANGUAGE_SETTINGS = {
    language: "English",
    region: "India",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
    firstDay: "Monday",
    numberFormat: "1,23,456.78",
};

const LANGUAGE_OPTIONS = [
    "English",
    "Hindi",
    "Assamese",
    "Bengali",
];

const REGION_OPTIONS = [
    "India",
    "United States",
    "United Kingdom",
    "Australia",
];

const TIMEZONE_OPTIONS = [
    "Asia/Kolkata",
    "Asia/Dhaka",
    "Asia/Singapore",
    "Europe/London",
    "America/New_York",
];

const DATE_FORMATS = [
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
];

export default function Language () {
    const [settings, setSettings] = useState(
        DEFAULT_LANGUAGE_SETTINGS
    );

    const updateSetting = (key, value) => {
        setSettings((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_LANGUAGE_SETTINGS);
    };

    const saveSettings = () => {
        // Replace with API call later
        console.log("Language settings:", settings);
    };

    return (
        <div className="language-section">

            {/* HEADER */}
            <div className="language-header">

                <div>
                    <div className="language-heading">
                        <Languages size={20} />
                        <h2>Language & Regional Settings</h2>
                    </div>

                    <p>
                        Customize the language and regional format used
                        across your HMS workspace.
                    </p>
                </div>

                <div className="language-status">
                    <CheckCircle2 size={14} />
                    Preferences active
                </div>

            </div>


            {/* INTERFACE LANGUAGE */}
            <section className="language-card">

                <div className="language-card-header">

                    <div className="language-card-icon">
                        <Languages size={18} />
                    </div>

                    <div>
                        <h3>Interface Language</h3>
                        <p>
                            Choose the language used throughout the
                            doctor dashboard.
                        </p>
                    </div>

                </div>

                <div className="language-form-grid">

                    <div className="language-field">
                        <label>Display Language</label>

                        <select
                            value={settings.language}
                            onChange={(e) =>
                                updateSetting(
                                    "language",
                                    e.target.value
                                )
                            }
                        >
                            {LANGUAGE_OPTIONS.map((language) => (
                                <option
                                    key={language}
                                    value={language}
                                >
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="language-field">
                        <label>Region</label>

                        <select
                            value={settings.region}
                            onChange={(e) =>
                                updateSetting(
                                    "region",
                                    e.target.value
                                )
                            }
                        >
                            {REGION_OPTIONS.map((region) => (
                                <option
                                    key={region}
                                    value={region}
                                >
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

            </section>


            {/* TIME & DATE */}
            <section className="language-card">

                <div className="language-card-header">

                    <div className="language-card-icon">
                        <CalendarDays size={18} />
                    </div>

                    <div>
                        <h3>Date & Time</h3>
                        <p>
                            Control how dates and times are displayed
                            across schedules and clinical records.
                        </p>
                    </div>

                </div>

                <div className="language-form-grid">

                    <div className="language-field">

                        <label>Date Format</label>

                        <select
                            value={settings.dateFormat}
                            onChange={(e) =>
                                updateSetting(
                                    "dateFormat",
                                    e.target.value
                                )
                            }
                        >
                            {DATE_FORMATS.map((format) => (
                                <option
                                    key={format}
                                    value={format}
                                >
                                    {format}
                                </option>
                            ))}
                        </select>

                        <span className="field-preview">
                            Example: 06/10/2026
                        </span>

                    </div>


                    <div className="language-field">

                        <label>Time Format</label>

                        <div className="segmented-control">

                            <button
                                type="button"
                                className={
                                    settings.timeFormat === "12-hour"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    updateSetting(
                                        "timeFormat",
                                        "12-hour"
                                    )
                                }
                            >
                                12-hour
                            </button>

                            <button
                                type="button"
                                className={
                                    settings.timeFormat === "24-hour"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    updateSetting(
                                        "timeFormat",
                                        "24-hour"
                                    )
                                }
                            >
                                24-hour
                            </button>

                        </div>

                    </div>


                    <div className="language-field">

                        <label>Timezone</label>

                        <div className="select-with-icon">

                            <Globe2 size={15} />

                            <select
                                value={settings.timezone}
                                onChange={(e) =>
                                    updateSetting(
                                        "timezone",
                                        e.target.value
                                    )
                                }
                            >
                                {TIMEZONE_OPTIONS.map((timezone) => (
                                    <option
                                        key={timezone}
                                        value={timezone}
                                    >
                                        {timezone}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>


                    <div className="language-field">

                        <label>First Day of Week</label>

                        <select
                            value={settings.firstDay}
                            onChange={(e) =>
                                updateSetting(
                                    "firstDay",
                                    e.target.value
                                )
                            }
                        >
                            <option value="Monday">
                                Monday
                            </option>

                            <option value="Sunday">
                                Sunday
                            </option>

                            <option value="Saturday">
                                Saturday
                            </option>
                        </select>

                    </div>

                </div>

            </section>


            {/* NUMBER FORMAT */}
            <section className="language-card">

                <div className="language-card-header">

                    <div className="language-card-icon">
                        <Hash size={18} />
                    </div>

                    <div>
                        <h3>Number Format</h3>
                        <p>
                            Select how numbers and financial values are
                            displayed in the dashboard.
                        </p>
                    </div>

                </div>

                <div className="number-format-options">

                    <button
                        type="button"
                        className={
                            settings.numberFormat === "1,23,456.78"
                                ? "number-option active"
                                : "number-option"
                        }
                        onClick={() =>
                            updateSetting(
                                "numberFormat",
                                "1,23,456.78"
                            )
                        }
                    >
                        <strong>1,23,456.78</strong>
                        <span>Indian</span>
                    </button>

                    <button
                        type="button"
                        className={
                            settings.numberFormat === "123,456.78"
                                ? "number-option active"
                                : "number-option"
                        }
                        onClick={() =>
                            updateSetting(
                                "numberFormat",
                                "123,456.78"
                            )
                        }
                    >
                        <strong>123,456.78</strong>
                        <span>International</span>
                    </button>

                    <button
                        type="button"
                        className={
                            settings.numberFormat === "123 456,78"
                                ? "number-option active"
                                : "number-option"
                        }
                        onClick={() =>
                            updateSetting(
                                "numberFormat",
                                "123 456,78"
                            )
                        }
                    >
                        <strong>123 456,78</strong>
                        <span>European</span>
                    </button>

                </div>

            </section>


            {/* PREVIEW */}
            <section className="language-preview">

                <div className="preview-header">
                    <Clock3 size={16} />

                    <div>
                        <h3>Regional Preview</h3>
                        <p>
                            Example of how your preferences will appear.
                        </p>
                    </div>
                </div>

                <div className="preview-grid">

                    <div>
                        <span>Date</span>
                        <strong>06/10/2026</strong>
                    </div>

                    <div>
                        <span>Time</span>
                        <strong>
                            {settings.timeFormat === "12-hour"
                                ? "09:30 AM"
                                : "09:30"}
                        </strong>
                    </div>

                    <div>
                        <span>Number</span>
                        <strong>
                            {settings.numberFormat}
                        </strong>
                    </div>

                    <div>
                        <span>Timezone</span>
                        <strong>
                            {settings.timezone}
                        </strong>
                    </div>

                </div>

            </section>


            {/* FOOTER */}
            <div className="language-footer">

                <button
                    type="button"
                    className="language-reset"
                    onClick={resetSettings}
                >
                    <RotateCcw size={14} />
                    Reset
                </button>

                <button
                    type="button"
                    className="language-save"
                    onClick={saveSettings}
                >
                    Save Preferences
                </button>

            </div>

        </div>
    );
}