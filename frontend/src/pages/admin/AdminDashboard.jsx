import React from "react";
import "../../styles/Admin/admin-dashboard.css";
import AdminLayout from "../../layouts/AdminLayout";
function AdminDashboard() {
  return (
    // <AdminLayout>
    <>
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Staff</h3>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Patients</h3>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Verification</h3>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h3>Departments</h3>
          <p>0</p>
        </div>
      </div>
    </>
    // </AdminLayout>
  );
}

export default AdminDashboard;