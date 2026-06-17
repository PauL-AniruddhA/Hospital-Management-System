import React from 'react';
import "../../../styles/Dash-Board/patient-home.css";
import { CalendarDays, FileText, Pill, FlaskConical, Receipt } from "lucide-react";
const actions = [
  {  title: "Appointments", subtitle: "Manage your visits", icon: CalendarDays  },
  {  title: "Medical Records", subtitle: "View health history", icon: FileText  },
  {  title: "Prescriptions", subtitle: "Current medications", icon: Pill  },
  {  title: "Lab Reports", subtitle: "Download reports", icon: FlaskConical  },
  {  title: "Bills", subtitle: "Payments & invoices", icon: Receipt  },
];

function PatientHomeSection()  {
   return (
    <section className="patient-home">
      <div className="patient-dashboard-card">
        <div className="patient-actions-grid">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <div
                key={index}
                className="patient-action-card"
              >
                <div className="patient-action-icon">
                  <Icon size={28} />
                </div>

                <div className="patient-action-content">
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PatientHomeSection
