import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const [user, setUser] = useState({}) ;
  useEffect(() => {
    axios.get("http://localhost:5000/getUsername",{headers:{"token": localStorage.getItem("token")}})
    .then(res=>{
        //console.log(res.data);
        setUser(res.data) ;
    })
  });
  return (
    <div className='profile'>
      <h3>Your profile</h3>
      <br></br>
      Name: {user.name}
      <br></br>
      Email: {user.email}
      <br></br>
      Age: {user.age}
  </div>
    
  )
}

export default Profile