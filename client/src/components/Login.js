import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate, Link} from "react-router-dom";
import './style.css'
 
const Login = () => {

    const navigate = useNavigate() ;
    const [user,setUser] = useState({
        email:"",
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
        axios.post("http://localhost:5000/loginUser",user)
        .then(res=>{
            alert(res.data.message);
            if(res.data.token){
                navigate("/userdashboard");
                localStorage.setItem("token", res.data.token) ;
            }
    })
    }
    return (
    <div className="loginForm">
        <div>
            <div className='heading'>
                Login To Your Account
            </div>
        <div className="">
            
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="email" value={user.email}  onChange={handleChange} placeholder="ex: abc@gmail.com"/>
                </div>
            
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
                    <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="password" value={user.password}  onChange={handleChange} placeholder="Your password"/>
                </div>
                  
                <div>
                    <button className="btn btn-primary" type="submit" onClick={login}>
                        Login
                    </button>
                    <Link to="/register" className="btn btn-primary link">Sign up</Link>
                </div>
               
            </div>
          
        </div>

        </div>
    )
}
export default Login