import React from 'react'
import "../../../styles/Public/book-appointment.css"
import Department from './department';
import departments from '../../../mock/depertment';
import PublicLayout from '../../../layouts/PublicLayout';
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

        {/* Breadcrumb */}
        <div className="breadcrumb">
          Home / Book Appointment
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by speciality"
            className="search-input"
            />
        </div>

        {/* Department Grid will come here */}
        <div className="department-section">
          <h2>Search by Specialities</h2>

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