import React from 'react'
import { Link, Outlet } from "react-router-dom";
import "../styles/Admin/admin-layout.css";

function AdminLayout(){
    return (
    <div className="admin-layout">

      <aside className="sidebar">

        <div className="logo">
          🏥 HMS
        </div>

        <nav>

          <Link to="/admin">
            Dashboard
          </Link>

          <Link to="/admin/staff">
            Staff Management
          </Link>

          <Link to="/admin/patients">
            Patients
          </Link>

          <Link to="/admin/settings">
            Settings
          </Link>

        </nav>

      </aside>

      <div className="main-content">

        <header className="topbar">
          <h2>Hospital Management System</h2>
        </header>

        <div className="page-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}
export default AdminLayout