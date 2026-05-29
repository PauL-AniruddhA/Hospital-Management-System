import React, { useState } from 'react'
import api from '../../api/axiosConfig';

function StaffSignUpPage(){
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [phone , setPhone] = useState(""); 
    const[role,setRole] = useState("DOCTOR");
    const handelSignup = async(e)=>{
        e.preventDefault();
        try {
            const response = await api.post("/auth/staff/signup",
                {
                    name,
                    email,
                    password,
                    phone,
                    role
                }
            );
            alert("Staff Registered Successfully");
            console.log(response.data);
            
        } catch (error) {
            console.error(error);
            alert("Signup failed");
        }
    };


  return (
    <>
     <div className='register-container'>
        <form className='register-form' onSubmit={handelSignup}>
          <h1>Staff Registration</h1>
          <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <input type="text"name="phone"placeholder="Phone Number"value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <select value={role} onChange={(e)=> setRole(e.target.value)}>
            <option value="DOCTOR">DOCTOR</option>
            <option value="NURSE">ADMIN</option>
            <option value="RECEPTIONIST">RECEPTIONIST</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default StaffSignUpPage