import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DoctorDashboard from "../pages/Dashboard/doctor/DoctorDashboard";
import PatientDashboard from "../pages/Dashboard/patient/PatientDashboard";
import ReceptionDashboard from "../pages/Dashboard/receptionist/ReceptionDashboard";
import RegistrationPage from "../pages/auth/RegistrationPage";
import StaffSignUpPage from "../pages/auth/StaffSignUpPage";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/public/home/HomePage";
import BookAppointments from "../pages/public/common/BookAppointments";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                {/* <Route path="/" element={<PatientDashboard />} /> */}
                <Route path="/" element={<HomePage />} />
                <Route path="/book-appointment" element={<BookAppointments />} />
                
                {/* Auth Routing */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/staffRegister" element={<StaffSignUpPage />} />

                {/* protected routes if token exists then only accessed */}

                {/* Admin Routing */}
                <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN"><AdminLayout/></ProtectedRoute>}>
                    <Route index element={<AdminDashboard/>}/>
                </Route>
                
                <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRole="DOCTOR"><DoctorDashboard /></ProtectedRoute>} />
                <Route path="/patient/dashboard" element={<ProtectedRoute allowedRole="PATIENT"><PatientDashboard /></ProtectedRoute>} /> 
                <Route path="/receptionist/dashboard" element={<ProtectedRoute allowedRole="RECEPTIONIST"><ReceptionDashboard /></ProtectedRoute>} /> 

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;







