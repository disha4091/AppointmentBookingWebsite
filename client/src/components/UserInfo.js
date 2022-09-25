import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';

const UserInfo = (props) => {
  
    const [username, setUsername] = useState("") ;
    useEffect(()=>{
        
        axios.get(`http://localhost:5000/getName/${props.patientId}`)
        .then(res=>{
            setUsername(res.data.user.name);
    })
})
    return (
    <div>Patient name: {username}</div>
  )
}

export default UserInfo