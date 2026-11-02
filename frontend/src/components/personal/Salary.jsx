import React, { useState } from 'react'
import { FileText } from "lucide-react";
import "../../styles/Components/Common/Salary.css";



// part : 1
// const MOCK_PAY_SUMMARY = [
//   { id: "gross", label: "Monthly Salary", value: "₹1,25,000", sub: "Gross Pay", icon: "card", tone: "green" },
//   { id: "ded", label: "Total Deductions", value: "₹18,750", sub: "This Month", icon: "hand", tone: "blue" },
//   { id: "net", label: "Net Pay (Take Home)", value: "₹1,06,250", sub: "This Month", icon: "coins", tone: "purple" },
//   { id: "date", label: "Payment Date", value: "5th Oct, 2025", sub: "Paid", icon: "calendar", tone: "orange", badge: true },
// ];

// const MOCK_PAY_EARNINGS = [
//   { label: "Basic Pay", amount: "₹60,000" },
//   { label: "House Rent Allowance (HRA)", amount: "₹24,000" },
//   { label: "Medical Allowance", amount: "₹10,000" },
//   { label: "Special Allowance", amount: "₹20,000" },
//   { label: "Other Allowance", amount: "₹11,000" },
// ];

// const MOCK_PAY_DEDUCTIONS = [
//   { label: "Provident Fund (PF)", amount: "₹7,500" },
//   { label: "Professional Tax", amount: "₹2,500" },
//   { label: "Income Tax (TDS)", amount: "₹8,000" },
//   { label: "Other Deductions", amount: "₹750" },
// ];

// const MOCK_PAY_HISTORY = [
//   { month: "September 2025", gross: "₹1,25,000", ded: "₹18,750", net: "₹1,06,250", date: "05 Oct 2025", status: "Paid" },
//   { month: "August 2025", gross: "₹1,25,000", ded: "₹18,750", net: "₹1,06,250", date: "05 Sep 2025", status: "Paid" },
//   { month: "July 2025", gross: "₹1,25,000", ded: "₹18,500", net: "₹1,06,500", date: "05 Aug 2025", status: "Paid" },
//   { month: "June 2025", gross: "₹1,25,000", ded: "₹18,500", net: "₹1,06,500", date: "05 Jul 2025", status: "Paid" },
// ];

// const MOCK_PAY_BREAKDOWN = [
//   { label: "Basic Pay", pct: 48, color: "#2563eb" },
//   { label: "HRA", pct: 19, color: "#c9a45c" },
//   { label: "Medical Allowance", pct: 8, color: "#a855f7" },
//   { label: "Special Allowance", pct: 16, color: "#fb923c" },
//   { label: "Other Allowance", pct: 9, color: "#cbd5e1" },
// ];

// const MOCK_PAY_QUICK_ACTIONS = [
//   { id: "payslip", label: "Download Latest Payslip", icon: "download", tone: "blue" },
//   { id: "tax", label: "View Tax Documents", icon: "file", tone: "red" },
//   { id: "form16", label: "Download Form 16", icon: "fileCheck", tone: "green" },
//   { id: "cert", label: "Salary Certificates", icon: "badge", tone: "purple" },
// ];

// const MOCK_PAY_DOCS = [
//   { id: "f16", title: "Form 16 (FY 2024-25)", sub: "Tax document", icon: "file", tone: "blue" },
//   { id: "sc", title: "Salary Certificate", sub: "Official salary certificate", icon: "fileCheck", tone: "green" },
//   { id: "inv", title: "Investment Declaration", sub: "Submit for tax benefits", icon: "file", tone: "orange" },
//   { id: "reimb", title: "Reimbursement Claims", sub: "Medical, transport, etc.", icon: "file", tone: "purple" },
// ];

// const YEARS = ["2025", "2024", "2023"];

// /* ───────── tiny inline icon set ───────── */
// const PAY_ICON_PATHS = {
//   wallet: "M3 7a2 2 0 0 1 2-2h12v3M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2zM16 13h2",
//   card: "M3 6h18v12H3zM3 10h18M7 15h3",
//   hand: "M4 14h4l4 2h5a2 2 0 0 0 0-4h-3M8 14v5M12 3v6M9.5 6.5 12 9l2.5-2.5",
//   coins: "M12 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM4 18h6l3 2h7",
//   calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
//   download: "M12 4v11M7 11l5 5 5-5M5 20h14",
//   file: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
//   fileCheck: "M7 3h7l5 5v13H7zM14 3v5h5M10 15l2 2 4-4",
//   badge: "M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM9 14l-2 7 5-3 5 3-2-7",
//   chevron: "M9 6l6 6-6 6",
//   down: "M6 9l6 6 6-6",
// };

// function PAY_Icon({ name, size = 20 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d={ICON_PATHS[name]} />
//     </svg>
//   );
// }

// /* donut gradient built from MOCK_BREAKDOWN */
// function PAY_buildDonut(items) {
//   let acc = 0;
//   const stops = items.map((it) => {
//     const from = acc;
//     acc += it.pct;
//     return `${it.color} ${from}% ${acc}%`;
//   });
//   return `conic-gradient(${stops.join(", ")})`;
// }


// Part : 2

const MOCK_FILTERS = {
  years: ["2025", "2024", "2023"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  views: ["Payslip", "Summary", "Tax"],
};

const MOCK_HEADER_TILES = [
  { id: "annual", label: "Download Annual Statement", icon: "download", tone: "blue" },
  { id: "form16", label: "View Form 16", icon: "file", tone: "blue" },
  { id: "tax", label: "Tax Summary", icon: "pie", tone: "purple" },
];

const MOCK_KPIS = [
  { id: "gross", label: "Gross Pay", value: "₹1,25,000", sub: "September 2025", icon: "card", tone: "green", trend: "up", delta: "2%" },
  { id: "ded", label: "Total Deductions", value: "₹18,750", sub: "September 2025", icon: "file", tone: "red", trend: "down", delta: "1%" },
  { id: "net", label: "Net Pay (Final)", value: "₹1,06,250", sub: "September 2025", icon: "hand", tone: "purple", trend: "up", delta: "2%" },
  { id: "status", label: "Payment Status", value: "Paid", sub: "05 Sep 2025", icon: "calendar", tone: "orange", status: true },
];

const MOCK_EARNINGS = [
  { label: "Basic Pay", amount: "₹60,000" },
  { label: "House Allowance (HRA)", amount: "₹24,000" },
  { label: "Medical Allowance", amount: "₹10,000" },
  { label: "Special Allowance", amount: "₹20,000" },
  { label: "Other Allowance", amount: "₹11,000" },
];

const MOCK_DEDUCTIONS = [
  { label: "Provident Fund (PF)", amount: "₹7,500" },
  { label: "Professional Tax", amount: "₹2,500" },
  { label: "Income Tax (TDS)", amount: "₹8,000" },
  { label: "Other Deductions", amount: "₹750" },
];

const MOCK_BREAKDOWN = [
  { label: "Basic Pay", pct: 48, color: "#2563eb" },
  { label: "HRA", pct: 19, color: "#f5a742" },
  { label: "Medical Allowance", pct: 8, color: "#b07de8" },
  { label: "Special Allowance", pct: 16, color: "#5fd4a6" },
  { label: "Other Allowance", pct: 9, color: "#cbd5e1" },
];

const MOCK_QUICK_ACTIONS = [
  { id: "latest", label: "Download Latest Payslip", icon: "download", tone: "blue" },
  { id: "all", label: "View All Payslips", icon: "file", tone: "purple" },
  { id: "form16", label: "Download Form 16", icon: "fileCheck", tone: "green" },
  { id: "tax", label: "Tax Documents", icon: "file", tone: "red" },
  { id: "cert", label: "Salary Certificate", icon: "badge", tone: "purple" },
  { id: "inv", label: "Investment Declaration", icon: "file", tone: "orange" },
];

/* gross / net in rupees – chart + table both read from this */
const MOCK_HISTORY = [
  { month: "September 2025", gross: "₹1,25,000", ded: "₹18,750", net: "₹1,06,250", date: "05 Oct 2025", status: "Paid" },
  { month: "August 2025", gross: "₹1,25,000", ded: "₹18,750", net: "₹1,06,250", date: "05 Sep 2025", status: "Paid" },
  { month: "July 2025", gross: "₹1,25,000", ded: "₹18,500", net: "₹1,06,500", date: "05 Aug 2025", status: "Paid" },
  { month: "June 2025", gross: "₹1,25,000", ded: "₹18,500", net: "₹1,06,500", date: "05 Jul 2025", status: "Paid" },
  // { month: "September 2025", short: "Sep", gross: 125000, ded: 18750, net: 106250, status: "Paid" },
  // { month: "August 2025", short: "Aug", gross: 125000, ded: 18750, net: 106250, status: "Paid" },
  // { month: "July 2025", short: "Jul", gross: 125000, ded: 18500, net: 106500, status: "Paid" },
  // { month: "June 2025", short: "Jun", gross: 125000, ded: 18500, net: 106500, status: "Paid" },
  // { month: "May 2025", short: "May", gross: 120000, ded: 17700, net: 102300, status: "Paid" },
  // { month: "April 2025", short: "Apr", gross: 120000, ded: 17700, net: 102300, status: "Paid" },
];

const MOCK_BANK = [
  { id: "bank", label: "HDFC Bank", value: "XXXX XXXX 1234", icon: "bank", badge: "Primary" },
  { id: "pan", label: "PAN Number", value: "ABCDE1234F", icon: "file" },
  { id: "regime", label: "Tax Regime", value: "Old Regime", icon: "percent" },
  { id: "paydate", label: "Payment Date", value: "5th of every month", icon: "calendar" },
];

const CHART_MAX = 150000;
const CHART_TICKS = [
  { label: "₹1.5L", v: 150000 },
  { label: "₹1.0L", v: 100000 },
  { label: "₹50K", v: 50000 },
  { label: "0", v: 0 },
];

/* ───────── helpers ───────── */
const inr = (n) => "₹" + n.toLocaleString("en-IN");

function buildDonut(items) {
  let acc = 0;
  const stops = items.map((it) => {
    const from = acc;
    acc += it.pct;
    return `${it.color} ${from}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

const ICON_PATHS = {
  download: "M12 4v11M7 11l5 5 5-5M5 20h14",
  file: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  fileCheck: "M7 3h7l5 5v13H7zM14 3v5h5M10 15l2 2 4-4",
  pie: "M12 3v9h9A9 9 0 1 1 12 3zM15 3.5A9 9 0 0 1 20.5 9H15z",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  hand: "M4 14h4l4 2h5a2 2 0 0 0 0-4h-3M8 14v5M12 3v6M9.5 6.5 12 9l2.5-2.5",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  badge: "M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM9 14l-2 7 5-3 5 3-2-7",
  bank: "M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18",
  percent: "M6 18L18 6M8 9a1.5 1.5 0 1 0 0-.01M16 17a1.5 1.5 0 1 0 0-.01",
  down: "M6 9l6 6 6-6",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  check: "M5 12l4 4 10-10",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

function FilterSelect({ label, icon, value, options, onChange }) {
  return (
    <label className="pr-field">
      <span className="pr-field-label">{label}</span>
      <span className="pr-select">
        <Icon name={icon} size={16} />
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <Icon name="down" size={14} />
      </span>
    </label>
  );
}

export default function Salary() {
  const [year, setYear] = useState("2025");
  const [monthFilter, setMonthFilter] = useState("all");
  const [month, setMonth] = useState("September");
  const [view, setView] = useState("Payslip");
  const [trendRange, setTrendRange] = useState("Last 6 Months");
  const [histRange, setHistRange] = useState("Last 6 Months");

  // chart runs oldest → newest, left → right
  const pct = (v) => (v / CHART_MAX) * 100;

  const handleApply = () => {
    // TODO: fetch payroll for { year, month, view }
    console.log("apply", { year, month, view });
  };

  return (
    <>
      <div className="pr-page">
        {/* ── Top banner: filters + header tiles ── */}
        <section className="pr-top">
          <div className="pr-banner">
            <div className="pr-filters">
              <FilterSelect label="Select Year" icon="calendar" value={year} options={MOCK_FILTERS.years} onChange={setYear} />
              <FilterSelect label="Select Month" icon="calendar" value={month} options={MOCK_FILTERS.months} onChange={setMonth} />
              <FilterSelect label="View Type" icon="file" value={view} options={MOCK_FILTERS.views} onChange={setView} />
              <button type="button" className="pr-btn-primary" onClick={handleApply}>Apply</button>
            </div>
          </div>

          <div className="pr-tiles">
            {MOCK_HEADER_TILES.map((t) => (
              <button key={t.id} type="button" className="pr-tile">
                <span className={`pr-chip pr-tone-${t.tone}`}><Icon name={t.icon} size={18} /></span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── KPI cards ── */}
        <section className="pr-kpis">
          {MOCK_KPIS.map((k) => (
            <article key={k.id} className="pr-kpi">
              <span className={`pr-kpi-icon pr-tone-${k.tone}`}><Icon name={k.icon} size={18} /></span>
              <div className="pr-kpi-body">
                <span className="pr-kpi-label">{k.label}</span>
                <strong className={`pr-kpi-value ${k.status ? "pr-kpi-paid" : ""}`}>{k.value}</strong>
                <span className="pr-kpi-sub">{k.sub}</span>
              </div>
              {k.status ? (
                <span className="pr-kpi-check"><Icon name="check" size={20} /></span>
              ) : (
                <span className={`pr-trend pr-trend-${k.trend}`}>
                  <b><Icon name={k.trend === "up" ? "arrowUp" : "arrowDown"} size={11} /> {k.delta}</b>
                  <small>vs Last Month</small>
                </span>
              )}
            </article>
          ))}
        </section>

        <section  className="pr-scroll-area">
          {/* ── Payslip summary + Quick actions ── */}
          <section className="pr-mid">
            <div className="pr-card pr-slip">
              <div className="pr-card-head">
                <div className="pr-row-gap">
                  <h2 className="pr-card-title">Payslip Summary</h2>
                  <span className="pr-badge-green">September 2025</span>
                </div>
                <button type="button" className="pr-btn-soft">
                  View Full Payslip <Icon name="external" size={14} />
                </button>
              </div>

              <div className="pr-slip-body">
                <div className="pr-tbl">
                  <div className="pr-tr pr-tr-head"><span>Earnings</span><span>Amount</span></div>
                  {MOCK_EARNINGS.map((r) => (
                    <div key={r.label} className="pr-tr"><span>{r.label}</span><span>{r.amount}</span></div>
                  ))}
                  <div className="pr-tr pr-tr-total pr-tr-blue"><span>Total Earnings</span><span>₹1,25,000</span></div>
                </div>

                <div className="pr-tbl">
                  <div className="pr-tr pr-tr-head"><span>Deductions</span><span>Amount</span></div>
                  {MOCK_DEDUCTIONS.map((r) => (
                    <div key={r.label} className="pr-tr"><span>{r.label}</span><span>{r.amount}</span></div>
                  ))}
                  <div className="pr-tr pr-tr-total pr-tr-red"><span>Total Deductions</span><span>₹18,750</span></div>
                </div>

              </div>
            </div>

            <section className="pr-card">
              <h2 className="pr-card-title">Earnings Breakdown</h2>
              <div className="pr-break">
                <div className="pr-donut" style={{ background: buildDonut(MOCK_BREAKDOWN) }}>
                  <div className="pr-donut-hole">
                    <strong>₹1,25,000</strong>
                    <span>Total Earnings</span>
                  </div>
                </div>
                <ul className="pr-legend">
                  {MOCK_BREAKDOWN.map((b) => (
                    <li key={b.label}>
                      <i style={{ background: b.color }} />
                      <span>{b.label}</span>
                      <b>{b.pct}%</b>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* <aside className="pr-card pr-qa">
            <h2 className="pr-card-title">Quick Actions</h2>
            <div className="pr-qa-list">
              {MOCK_QUICK_ACTIONS.map((q) => (
                <button key={q.id} type="button" className="pr-qa-btn">
                  <span className={`pr-chip pr-tone-${q.tone}`}><Icon name={q.icon} size={16} /></span>
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </aside> */}
          </section>

          {/* ── Bottom row ── */}
          <section className="pr-bottom">

            {/* Payment history */}
            <section className="pr-card">
              <div className="pr-card-head">
                <h2 className="pr-card-title">Payment History</h2>
                <label className="pr-select pr-select-sm">
                  <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
                    <option value="all">All Months</option>
                    <option value="q3">Last 3 Months</option>
                    <option value="q6">Last 6 Months</option>
                  </select>
                  <Icon name="down" size={15} />
                </label>
              </div>

              <div className="pr-hist-scroll">
                <table className="pr-hist">
                  <thead>
                    <tr>
                      <th>Payment Date</th>
                      {/* <th>Month</th> */}
                      <th>Gross Pay</th>
                      <th>Deductions</th>
                      <th>Net Pay</th>
                      <th>Status</th>
                      <th className="pr-th-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_HISTORY.map((h) => (
                      <tr key={h.month}>
                        <td>{h.date}</td>
                        {/* <td>{h.month}</td> */}
                        <td>{h.gross}</td>
                        <td>{h.ded}</td>
                        <td>{h.net}</td>
                        <td><span className="pr-badge-paid">{h.status}</span></td>
                        <td className="pr-th-center">
                          <button type="button" className="pr-icon-btn" aria-label={`Download ${h.month} payslip`}>
                            <Icon name="download" size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bank & income */}
            <section className="pr-card">
              <div className="pr-card-head">
                <h2 className="pr-card-title">Bank &amp; Income Details</h2>
                <button type="button" className="pr-btn-soft">Edit</button>
              </div>
              <ul className="pr-bank">
                {MOCK_BANK.map((b) => (
                  <li key={b.id}>
                    <span className="pr-chip pr-tone-purple pr-chip-lg"><Icon name={b.icon} size={18} /></span>
                    <span className="pr-bank-text">
                      <strong>{b.label}</strong>
                      <small>{b.value}</small>
                    </span>
                    {b.badge && <span className="pr-badge-green">{b.badge}</span>}
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </section>
      </div>




      {/* Page header */}
      {/* <header className="pay-head">
         <div className="pay-head-left">
          <div className="pay-head-icon">
            <PAY_Icon name="wallet" size={30} />
          </div>
          <div>
            <h1 className="pay-title">Payroll</h1>
            <p className="pay-subtitle">
              View your salary details, payslips, deductions and payment history.
            </p>
          </div>
        </div> 

         <div className="pay-head-right">
          <label className="pay-select">
            <PAY_Icon name="calendar" size={15} />
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <PAY_Icon name="down" size={15} />
          </label>
          <button type="button" className="pay-btn-primary">
            <PAY_Icon name="download" size={18} />
            Download Annual Statement
          </button>
        </div> 
      </header> */}

      {/* Summary cards */}
      {/* <section className="pay-summary">
        {MOCK_PAY_SUMMARY.map((s) => (
          <article key={s.id} className="pay-sum-card">
            <div className={`pay-sum-icon pay-tone-${s.tone}`}>
              <PAY_Icon name={s.icon} size={15} />
            </div>
            <div className="pay-sum-body">
              <span className="pay-sum-label">{s.label}</span>
              <strong className="pay-sum-value">{s.value}</strong>
              {s.badge ? (
                <span className="pr-badge-paid">{s.sub}</span>
              ) : (
                <span className="pay-sum-sub">{s.sub}</span>
              )}
            </div>
            {s.id === "date" && (
              <span className="pay-sum-arrow"><PAY_Icon name="chevron" size={16} /></span>
            )}
          </article>
        ))}
      </section> */}

      {/* Main grid */}
      {/* <div className="pay-grid"> */}
      {/* LEFT COLUMN */}
      {/* <div className="pay-col"> */}
      {/* Latest payslip */}
      {/* <section className="pay-card">
            <div className="pay-card-head">
              <div className="pay-card-title-row">
                <h2 className="pay-card-title">Latest Payslip</h2>
                <span className="pay-muted">September 2025</span>
                <span className="pr-badge-paid">Paid</span>
              </div>
              <button type="button" className="pay-btn-soft">View Full Payslip</button>
            </div>

            <div className="pay-totals">
              <div className="pay-total pay-total-green">
                <span>Gross Pay</span>
                <strong>₹1,25,000</strong>
              </div>
              <div className="pay-total pay-total-red">
                <span>Deductions</span>
                <strong>₹18,750</strong>
              </div>
              <div className="pay-total pay-total-blue">
                <span>Net Pay</span>
                <strong>₹1,06,250</strong>
              </div>
            </div>

            <div className="pay-tables">
              <div className="pay-table">
                <div className="pay-tr pay-tr-head"><span>Earnings</span><span>Amount</span></div>
                {MOCK_PAY_EARNINGS.map((r) => (
                  <div key={r.label} className="pay-tr">
                    <span>{r.label}</span><span>{r.amount}</span>
                  </div>
                ))}
                <div className="pay-tr pay-tr-total pay-tr-total-blue">
                  <span>Total Earnings</span><span>₹1,25,000</span>
                </div>
              </div>

              <div className="pay-table">
                <div className="pay-tr pay-tr-head"><span>Deductions</span><span>Amount</span></div>
                {MOCK_PAY_DEDUCTIONS.map((r) => (
                  <div key={r.label} className="pay-tr">
                    <span>{r.label}</span><span>{r.amount}</span>
                  </div>
                ))}
                <div className="pay-tr pay-tr-total pay-tr-total-red">
                  <span>Total Deductions</span><span>₹18,750</span>
                </div>
              </div>
            </div>
          </section> */}

      {/* </div> */}

      {/* RIGHT COLUMN */}
      {/* <aside className="pay-col"> */}
      {/* Earnings breakdown */}
      {/* <section className="pay-card">
            <h2 className="pay-card-title">Earnings Breakdown</h2>
            <div className="pay-break">
              <div className="pay-donut" style={{ background: PAY_buildDonut(MOCK_PAY_BREAKDOWN) }}>
                <div className="pay-donut-hole">
                  <strong>₹1,25,000</strong>
                  <span>Total Earnings</span>
                </div>
              </div>
              <ul className="pay-legend">
                {MOCK_PAY_BREAKDOWN.map((b) => (
                  <li key={b.label}>
                    <i style={{ background: b.color }} />
                    <span>{b.label}</span>
                    <b>{b.pct}%</b>
                  </li>
                ))}
              </ul>
            </div>
          </section> */}

      {/* Quick actions */}
      {/* <section className="pay-card">
            <h2 className="pay-card-title">Quick Actions</h2>
            <div className="pay-qa">
              {MOCK_PAY_QUICK_ACTIONS.map((q) => (
                <button key={q.id} type="button" className="pay-qa-btn">
                  <span className={`pay-qa-icon pay-tone-${q.tone}`}>
                    <PAY_Icon name={q.icon} size={16} />
                  </span>
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </section> */}

      {/* Documents & forms */}
      {/* <section className="pay-card">
            <h2 className="pay-card-title">Documents &amp; Forms</h2>
            <ul className="pay-docs">
              {MOCK_PAY_DOCS.map((d) => (
                <li key={d.id}>
                  <button type="button" className="pay-doc">
                    <span className={`pay-doc-icon pay-tone-${d.tone}`}>
                      <PAY_Icon name={d.icon} size={18} />
                    </span>
                    <span className="pay-doc-text">
                      <strong>{d.title}</strong>
                      <small>{d.sub}</small>
                    </span>
                    <PAY_Icon name="chevron" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </section> */}
      {/* </aside> */}
      {/* </div> */}

      {/* Payment History */}
      {/* <div className="pr-card">
        <div className="pr-card-head">
          <h2 className="pr-card-title">Payment History</h2>
          <label className="pr-select pr-select-sm">
            <select value={histRange} onChange={(e) => setHistRange(e.target.value)}>
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
            <Icon name="down" size={14} />
          </label>
        </div>
        <div className="pr-hist-scroll">
          <table className="pr-hist">
            <thead>
              <tr><th>Month</th><th>Gross Pay</th><th>Net Pay</th><th>Status</th></tr>
            </thead>
            <tbody>
              {MOCK_HISTORY.map((h) => (
                <tr key={h.month}>
                  <td>{h.month}</td>
                  <td>{inr(h.gross)}</td>
                  <td>{inr(h.net)}</td>
                  <td><span className="pr-badge-green">{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
}

