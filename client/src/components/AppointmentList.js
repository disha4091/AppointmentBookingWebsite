import React from 'react'
import {useEffect, useState} from 'react' 
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";
import UserInfo from './UserInfo';

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
      const [user,setUser] = useState({
        name:"",
        
    })
      const handleChange = e =>{
      const {name,value} = e.target
      setAppointment({
      ...appointment,//spread operator 
      [name]:value
      })
      }
  
      const createAppointment =()=>{
         axios.post("http://localhost:5000/api/doctors/createAppointment",appointment,{ headers:{"token": localStorage.getItem("token")}})
          .then(res=>{
              alert(res.data.status);
      })
      }

    const deleteAppointment = (app_id) =>{
        console.log(app_id);
        axios.post(`http://localhost:5000/api/doctors/deleteAppointment/${app_id}`)
          .then(res=>{
              alert(res.data.message);
      })
    }

  return (
    <div className='row'>
    
    <h3 className='text-center heading1'>Your Appointments</h3>
    
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


    <div className='row'>
    {appointments.map(appointment => (  

        <div className='col-sm-3 infocard1' id={appointment.isBooked ? "booked" : "notbooked"}>
            <p>
            Time: {appointment.time}
            <br></br>
            {appointment.isBooked  &&
             <p>
             <UserInfo patientId={appointment.patientId}/>
             {
                appointment.description && <p>Description: {appointment.description}</p>}</p>}
            {!appointment.isBooked  && <p>Not Booked</p>}

            <button onClick={()=>deleteAppointment(appointment._id)}>Delete</button>
            
           </p>
        </div>  

      ))}  
      </div>
    </div>
  )
}

export default AppointmentList