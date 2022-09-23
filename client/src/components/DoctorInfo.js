import React from 'react'
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react' 
import axios from 'axios';

const DoctorInfo = (props) => {
    const params = useParams() ;
    //console.log(params);
    const [appointments, setAppointments] = useState([]) ;
    var count = 0 ;
    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/doctors/getAppointments/${params.doctorId}`)
        .then(res=>{
            //console.log(res.data);
            setAppointments(res.data) ;
            
      })
      },[]);
      const [appointment,setAppointment] = useState({description:""})
    const handleChange = e =>{
    const {name,value} = e.target
    setAppointment({
    ...appointment,//spread operator 
    [name]:value
    })
    }

    const bookAppointment =(appId)=>{
      //console.log(localStorage.getItem("token"));
       axios.post(`http://localhost:5000/bookAppointment/${appId}`,appointment,{ headers:{"token": localStorage.getItem("token")}})
        .then(res=>{
            console.log(res);
    })
    }

    function updateCount(){
        count++ ;
    }

  return (
    <div>
        <h3 className='heading1 text-center'>Appointments available</h3>

    <div className='row'>
    {appointments.length>0 && appointments.map(appointment => (  
        <div className='col-sm-4'>
        
       { !appointment.isBooked && <div className='infocard'>
       {updateCount()}
        <p>
            <br></br>
            <h5>Time: {appointment.time}</h5>
            <br></br>
            <button type="button" class="btn btn-primary link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Book Appointment
            </button>
    
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Description</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="description" value={appointment.description}  onChange={handleChange} placeholder="ex: fever"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"  onClick={()=>bookAppointment(appointment._id)} data-bs-dismiss="modal">Confirm appointment</button>
                </div>
                </div>
            </div>
            </div>
        </p>
        </div>  }
       
        </div>
      ))}  
      
      </div>
      {
            (count===0) && 
            <div className=" text-center alert">
            {count}
                <h2>Sorry no appointments available! 
                <br></br>Check after some time</h2>
            </div>
        }
      
    </div>
  )
}

export default DoctorInfo