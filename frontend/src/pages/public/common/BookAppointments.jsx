import React from 'react'
import "../../../styles/Public/book-appointment.css"
import Department from '../../../pages/public/common/Department';
import departments from '../../../mock/depertment';
import PublicLayout from '../../../layouts/PublicLayout';
import { Stethoscope } from 'lucide-react';
function BookAppointments(){
    
  return (
    <PublicLayout>
     <div className="appointment-page">

      <section className="appointment-hero">
        <div className="appointment-hero-content">
          <h1>Book Appointment</h1>
          <p>
            Book appointments with our expert doctors across multiple
            specialities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="appointment-container">
        
        <div className="breadcrumb">Home / Book Appointment </div>

        <div className="search-container">
          <input type="text" placeholder="Search by speciality" className="search-input" />
        </div>

        {/* Department Grid will come here */}
        <div className="department-section">
            <div className="speciality-heading">
              <div className="speciality-badge">
                <Stethoscope size={15} strokeWidth={2.2} />
              </div>
              
              <h2>Search by Specialities</h2>
            </div>

          <div className="department-grid">
            {departments.map((department) => (
              <Department
              key={department.id}
              department={department}
              onClick={(dept) => console.log(dept)}
              />
            ))}
          </div>
        </div>

      </section>
    </div>
    </PublicLayout>
  );
}

export default BookAppointments