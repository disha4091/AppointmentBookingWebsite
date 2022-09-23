import React from 'react'
import {useEffect, useState} from 'react' 
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";
import doctorIcon from '../images/doctorIcon.png' ;


const ListDoctors = () => {
    

  const navigate = useNavigate() ;
    const [doctors, setDoctors] = useState([]) ;

    useEffect(() => {
        axios.get("http://localhost:5000/api/doctors/listDoctors")
        .then(res=>{
            //console.log(res.data);
            setDoctors(res.data) ;
            
      })
      });

  return (
    <div className=' row '>
    <h3 className='heading1 text-center'>Doctors available</h3>
    {doctors.map(doctor => (  
        
        <div className='col-sm-3 infocard' onClick={()=>{navigate(`/doctor/${doctor._id}`)}}>
            <img className="docIcon" src={doctorIcon} />
            <p>
            <h4>{doctor.name}</h4>
            ✉ {doctor.email}
            <br></br><br></br>
            <h6>📌 {doctor.education}</h6>
            <h6>📌 {doctor.experience} experience</h6>
            <h6>📌 Specializations: {doctor.specializations}</h6>
            <h6>📌 Clinic Details: {doctor.clinicDetails}</h6>
            <br></br>
            <button className="btn btn-primary link">Get Appointment</button>
            </p>
        </div>  

      ))}  
      
    </div>
  )
}

export default ListDoctors