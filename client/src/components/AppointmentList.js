import React from 'react'
import {useEffect, useState} from 'react' 
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";

const AppointmentList = () => {

    const [appointments, setAppointments] = useState([]) ;

    useEffect(() => {
        
        axios.get("http://localhost:5000/api/doctors/listAppointments", {headers:{"token": localStorage.getItem("token")}})
        .then(res=>{
            //console.log(res.data);
            setAppointments(res.data) ;
            
      })
      });

      const navigate = useNavigate() ;
      const [appointment,setAppointment] = useState({
          time:"",
          
      })
      const handleChange = e =>{
      const {name,value} = e.target
      setAppointment({
      ...appointment,//spread operator 
      [name]:value
      })
      }
  
      const createAppointment =()=>{
        console.log(localStorage.getItem("token"));
         axios.post("http://localhost:5000/api/doctors/createAppointment",appointment,{ headers:{"token": localStorage.getItem("token")}})
          .then(res=>{
              alert(res.data.status);
      })
      }

  return (
    <div className=''>
    
    <h3 className='heading1'>Your Appointments</h3>
    
    <button type="button" class="btn btn-primary modalbtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Create Appointment
    </button>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="input-group input-group-sm mb-3">
               <span class="input-group-text" id="inputGroup-sizing-sm">Time Slot</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="time" value={appointment.time}  onChange={handleChange} placeholder="ex: 10:20-10:30"/>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={createAppointment} data-bs-dismiss="modal">Save changes</button>
        </div>
        </div>
    </div>
    </div>


    <div className='row text-center'>
    {appointments.map(appointment => (  

        <div className='col-sm-6 infocard'>
            <p>
            Time: {appointment.time}
            <br></br>
            {appointment.isBooked  &&
             <p>
             Booked
             <br></br>
             {appointment.patientId}</p>}
            {!appointment.isBooked  && <p>Not Booked</p>}
            
           </p>
        </div>  

      ))}  
      </div>
    </div>
  )
}

export default AppointmentList