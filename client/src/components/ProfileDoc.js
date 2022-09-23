import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ProfileDoc = () => {
  const [doctor, setDoctor] = useState({}) ;
  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors/getDoctorname",{headers:{"token": localStorage.getItem("token")}})
    .then(res=>{
        setDoctor(res.data) ;
        //console.log(res.data);
  })
  });
  return (
    <div className='profile'>
    <h3>Your profile</h3>
    <br></br>
    Name: {doctor.name}
    <br></br>
    Email: {doctor.email}
    <br></br>
    Age: {doctor.age}
    <br></br>
    Education: {doctor.education}
    <br></br>
    Experience: {doctor.experience}
    <br></br>
    Clinic Details: {doctor.clinicDetails}
</div>
    
  )
}

export default ProfileDoc