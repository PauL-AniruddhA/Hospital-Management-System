import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import PatientDashboard from "../pages/patient/PatientDashboard";
import RegistrationPage from "../pages/auth/RegistrationPage";
import StaffSignUpPage from "../pages/auth/StaffSignUpPage";


function SecurePath({children , allowedRole}){
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("Stored Role:", role);
    console.log("Allowed Role:", allowedRole);
    
    if (!token) return <Navigate to="/" />;
    if (role !== allowedRole) return <Navigate to="/" />;

    return children;
}
function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/staffRegister" element={<StaffSignUpPage />} />
                {/* protected routes if token exists then only accessed */}
                
                <Route path="/admin/dashboard" element={<SecurePath allowedRole ="ADMIN"><AdminDashboard /></SecurePath>} />
                <Route path="/doctor/dashboard" element={<SecurePath allowedRole="DOCTOR"><DoctorDashboard /></SecurePath>} />
                <Route path="/patient/dashboard" element={<SecurePath allowedRole="PATIENT"><PatientDashboard /></SecurePath>} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;







