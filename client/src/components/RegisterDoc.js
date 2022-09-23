import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";

import './style.css'

const RegisterDoc = () => {

    const navigate = useNavigate() ;
    const [doctor,setDocter] = useState({
        name: "",
        email: "",
        password: "",
        age: 0,
        education: "",
        specializations: "",
        experience: "",
        clinicDetails: "",
    })
    const handleChange = e =>{
    const {name,value} = e.target
    setDocter({
    ...doctor,//spread operator 
    [name]:value
    })
    }

    const login =()=>{
        console.log(doctor);
        axios.post("http://localhost:5000/api/doctors/registerDoctor",doctor)
        .then(res=>{
            
            if(!res.err){
                alert("Account created successfully");
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token) ;
                navigate("/profiledoc");
                
            }
            else{
                console.log(res);
            }
    })
    }
    return (
    <div className="loginForm">
        <div>
            <div className='heading'>
                Create a new account
            </div>
        <div className="">
            
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="name" value={doctor.name}  onChange={handleChange} placeholder="Enter full name"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="email" value={doctor.email}  onChange={handleChange} placeholder="ex: abc@gmail.com"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Age</span>
                    <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="age" value={doctor.age}  onChange={handleChange} placeholder="Enter number"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Education</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="education" value={doctor.education}  onChange={handleChange} placeholder="ex: MBBS"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Specializations</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="specializations" value={doctor.specializations}  onChange={handleChange} placeholder="ex: Diabetes"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Experience</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="experience" value={doctor.experience}  onChange={handleChange} placeholder="ex: 12 years"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Clinic Details</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="clinicDetails" value={doctor.clinicDetails}  onChange={handleChange} placeholder="Enter clinic address"/>
                </div>
            
                <div class="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                    <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="password" value={doctor.password}  onChange={handleChange} placeholder="Your password"/>
                </div>
                  
                <div>
                    <Link to="/logindoc" className="btn btn-primary link">Login</Link>

                    <button className="btn btn-primary" type="submit" onClick={login}>
                        Create new account
                    </button>
                </div>
               
            </div>
          
        </div>

        </div>
    )
}
export default RegisterDoc