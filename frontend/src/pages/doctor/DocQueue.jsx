import React, { useState, useMemo } from 'react'
import "../../styles/Doctor/Doctor-Queue.css"

/**
 * OPD Patient Queue — table layout, no page header.
 * Filter menu is a single segmented control; table has sortable columns,
 * zebra striping, an accented active row, and pagination.
 */

const STATUS_STYLES = {
  "In Consultation": { key: "success" },
  Waiting: { key: "warning" },
  Completed: { key: "accent" },
  Scheduled: { key: "accent" },
};

// ---- DUMMY DATA — replace this array with the backend response later ----
const samplePatients = [
  {
    pid: "AMS-2025-1043",
    name: "Sayan Pal",
    doctor: "Dr. Aniruddha",
    age: 34,
    gender: "M",
    appointmentTime: "09:00 AM",
    waitLabel: "On time",
    visitType: "General Consultation",
    status: "In Consultation",
  },
  {
    pid: "AMS-2025-1044",
    name: "Ritika Tamang",
    doctor: "Dr. Sen",
    age: 28,
    gender: "F",
    appointmentTime: "09:30 AM",
    waitLabel: "10 min wait",
    visitType: "Follow-up",
    status: "Waiting",
  },
  {
    pid: "AMS-2025-1045",
    name: "Arindam Das",
    doctor: "Dr. Sen",
    age: 46,
    gender: "M",
    appointmentTime: "10:00 AM",
    waitLabel: "25 min wait",
    visitType: "New Patient",
    status: "Waiting",
  },
  {
    pid: "AMS-2025-1046",
    name: "Mousumi Patra",
    doctor: "Dr. Aniruddha",
    age: 52,
    gender: "F",
    appointmentTime: "10:30 AM",
    waitLabel: "40 min wait",
    visitType: "Routine Checkup",
    status: "Waiting",
  },
  {
    pid: "AMS-2025-1047",
    name: "Sameer Khan",
    doctor: "Dr. Sen",
    age: 29,
    gender: "M",
    appointmentTime: "11:00 AM",
    waitLabel: "55 min wait",
    visitType: "Follow-up",
    status: "Completed",
  },
  {
    pid: "AMS-2025-1048",
    name: "Priti Barman",
    doctor: "Dr. Sen",
    age: 61,
    gender: "F",
    appointmentTime: "11:30 AM",
    waitLabel: "On time",
    visitType: "Lab Report Review",
    status: "Scheduled",
  },
];
// ---------------------------------------------------------------------

export default function DocQueue() {
  // ---- Replace this block with backend data (API response / props / context) ----
  const patients = samplePatients; // <- swap with data from API, e.g. patients = response.data
  const pageSize = 6;
  const lastSyncedLabel = "Synced 2 min ago";
  const onRowClick = (p) => console.log("open patient", p);
  const onAddClick = () => console.log("add patient");
  // ---------------------------------------------------------------------------

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const c = { All: patients.length, Waiting: 0, "In Consultation": 0, Completed: 0 };
    patients.forEach((p) => { if (c[p.status] !== undefined) c[p.status] += 1; });
    return c;
  }, [patients]);

  const tabs = [
    { key: "All", label: "All", icon: "ti-list", count: counts.All },
    { key: "Waiting", label: "Waiting", icon: "ti-clock", count: counts.Waiting },
    { key: "In Consultation", label: "Active", icon: "ti-stethoscope", count: counts["In Consultation"] },
    { key: "Completed", label: "Done", icon: "ti-check", count: counts.Completed },
  ];

  const filtered = useMemo(() => {
    let list = patients
      .filter((p) => (filter === "All" ? true : p.status === filter))
      .filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return p.name.toLowerCase().includes(q) || p.pid.toLowerCase().includes(q);
      });

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
        return sortAsc ? cmp : -cmp;
      });
    }
    return list;
  }, [patients, filter, search, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="opd-card">
      {/* ---------- Filter menu ---------- */}
      <div className="opd-segment">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`opd-segment-btn opd-status-${STATUS_STYLES[t.key]?.key || ""} ${filter === t.key ? "active" : ""}`}
            onClick={() => {
              setFilter(t.key);
              setPage(1);
            }}
          >
            <i className={`ti ${t.icon}`} aria-hidden="true" />
            {t.label} <span className="opd-segment-count">{t.count}</span>
          </button>
        ))}
      </div>

      {/* ---------- Search + actions ---------- */}
      <div className="opd-toolbar">
        <div className="opd-search">
          <i className="ti ti-search" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search patient, ID or phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button className="opd-btn-ghost">
          <i className="ti ti-filter" aria-hidden="true" /> Filters
        </button>
        <button className="opd-btn-primary" onClick={onAddClick}>
          <i className="ti ti-plus" aria-hidden="true" /> Add
        </button>
      </div>

      {/* ---------- Table ---------- */}
      <div className="opd-table-wrap">
        <table className="opd-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => toggleSort("name")}>
                <i className="ti ti-arrows-sort" aria-hidden="true" /> Patient
              </th>
              <th>Age/gender</th>
              <th className="sortable" onClick={() => toggleSort("appointmentTime")}>
                <i className="ti ti-arrows-sort" aria-hidden="true" /> Time
              </th>
              <th>Visit</th>
              <th>Doctor</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="opd-empty">No patients match this filter.</td>
              </tr>
            ) : (
              pageItems.map((p, i) => {
                const statusKey = STATUS_STYLES[p.status]?.key || "warning";
                const initials = p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                const onTime = (p.waitLabel || "").toLowerCase() === "on time";

                return (
                  <tr
                    key={p.pid}
                    className={`${i % 2 === 1 ? "opd-row-alt" : ""} ${i === 0 ? `opd-row-active opd-status-${statusKey}` : ""}`}
                    onClick={() => onRowClick(p)}
                  >
                    <td>
                      <div className="opd-patient-cell">
                        <div className={`opd-avatar opd-status-${statusKey}`}>{initials}</div>
                        <div>
                          <p className="opd-patient-name">{p.name}</p>
                          <p className="opd-patient-pid">{p.pid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="opd-muted-cell">{p.age}Y · {p.gender}</td>
                    <td>
                      {p.appointmentTime}
                      {p.waitLabel && (
                        <div className={`opd-wait-label opd-status-${onTime ? "success" : statusKey}`}>
                          {p.waitLabel}
                        </div>
                      )}
                    </td>
                    <td className="opd-muted-cell">{p.visitType}</td>
                    <td className="opd-muted-cell">{p.doctor}</td>
                    <td>
                      <span className={`opd-status-pill opd-status-${statusKey}`}>{p.status}</span>
                    </td>
                    <td className="opd-row-arrow">
                      <i className="ti ti-chevron-right" aria-hidden="true" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- Footer ---------- */}
      <div className="opd-footer">
        <p className="opd-footer-note">
          <i className="ti ti-refresh" aria-hidden="true" /> {lastSyncedLabel}
        </p>
        <div className="opd-pagination">
          <button disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            <i className="ti ti-chevron-left" aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === currentPage ? "active" : ""} onClick={() => setPage(n)}>
              {n}
            </button>
          ))}
          <button disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}