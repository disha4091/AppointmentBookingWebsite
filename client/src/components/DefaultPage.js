import React from 'react'
import { useNavigate, Link} from "react-router-dom";
import doctorIcon from '../images/doctorIcon.png'
import userIcon from '../images/userIcon.png'
const DefaultPage = () => {
  return (
    <div className="text-center loginForm">
    <div>
    <h3 className='heading2'>
            Welcome to HealthFirst!
        </h3>
        <div className='heading'>
            Select Profile
        </div>
    <div className="">
    
            <div className='row'>
                <div className='col'>
                  <img className='profileIcon' src={userIcon}/>
                  <Link to="/login" className="btn btn-primary link">User</Link>
                </div>

                <div  className='col'>
                  <img className='profileIcon' src={doctorIcon}/>
                  <Link to="/logindoc" className="btn btn-primary link">Doctor</Link>
                </div>
            
            </div>
           
        </div>
      
    </div>

    </div>
  )
}

export default DefaultPage