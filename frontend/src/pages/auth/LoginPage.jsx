import React from 'react'
import "../../styles/Auth/login-page.css";
import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/tokenUtils';
import { setRole } from '../../utils/roleUtils'; 

function LoginPage() {
  const[email , setEmail] = useState(""); // stores dynamic value
  const[password , setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async(e)=>{ 
    e.preventDefault(); //Stops page refresh.
    console.log("Email",email);
    console.log("Password",password);
    
    try {
        const response = await api.post("/auth/login",
            { // json Format 
                email, 
                password
            });
        
        console.log(response.data);

        const token = response.data.token;
        const role = response.data.role;

        setToken(token);
        setRole(role);

        alert("Login Success");
        
        if(role === "ADMIN") navigate("/admin");
        else if(role === "PATIENT")navigate("/patient/dashboard");
        else if(role === "DOCTOR") navigate("/doctor/dashboard");
        else alert("Dashboard not available yet");
    } catch (error) {
        console.log(error);
    }
    
  }
    return (
    <div className='login-container'>
        <div className='login-box'>
            <h1>HMS login page</h1>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
  );
}

export default LoginPage

// this line "onChange={(e)=>setEmail(e.target.value)}" means - Updates state whenever user types.

// architecture flow 

// User types email/password
//         ↓
// useState stores values
//         ↓
// Click Login
//         ↓
// handleLogin() runs
//         ↓
// preventDefault() stops refresh
//         ↓
// Axios POST request sent
//         ↓
// Spring Boot backend receives request
//         ↓
// Backend validates user
//         ↓
// JWT token returned
//         ↓
// Frontend receives response