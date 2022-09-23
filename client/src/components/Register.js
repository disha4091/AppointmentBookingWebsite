import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";

import './style.css'

const Register = () => {

    const navigate = useNavigate() ;
    const [user,setUser] = useState({
        name:"", 
        email:"",
        age:0,
        password: ""
    })
    const handleChange = e =>{
    const {name,value} = e.target
    setUser({
    ...user,//spread operator 
    [name]:value
    })
    }

    const login =()=>{
        axios.post("http://localhost:5000/api/users",user)
        .then(res=>{
            
            if(!res.err){
                alert("Account created successfully");
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token) ;
                navigate("/profile");
                
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
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="name" value={user.name}  onChange={handleChange} placeholder="Enter full name"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="email" value={user.email}  onChange={handleChange} placeholder="ex: abc@gmail.com"/>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Age</span>
                    <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="age" value={user.age}  onChange={handleChange} placeholder="Enter number"/>
                </div>
            
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
                    <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="password" value={user.password}  onChange={handleChange} placeholder="Your password"/>
                </div>
                  
                <div>
                    <Link to="/login" className="btn btn-primary link">Login</Link>

                    <button className="btn btn-primary" type="submit" onClick={login}>
                        Create new account
                    </button>
                </div>
               
            </div>
          
        </div>

        </div>
    )
}
export default Register