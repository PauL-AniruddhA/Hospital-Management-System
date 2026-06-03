import React, { useState } from 'react';
import "../../styles/Auth/register-page.css";
import api from '../../api/axiosConfig';

function RegistrationPage() {  
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone , setPhone] = useState(""); 
    const [role,setRole] = useState("");

    // handels registration
    const handelRegistration = async(e)=>{
      e.preventDefault();
      try {
        const response = await api.post("/auth/signup",
          {
            name,
            email,
            password,
            phone,
          });
        console.log("Registration Successfull",response.data);
        alert("Registration Successfull !!");
          
      } catch (error) {
          console.log(error);
          alert("Registration Failed ");
          
      }
    };
  return (
    <>
      <div className='register-container'>
        <form className='register-form' onSubmit={handelRegistration}>
          <h1>Register</h1>
          <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <input type="text"name="phone"placeholder="Phone Number"value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default RegistrationPage;
