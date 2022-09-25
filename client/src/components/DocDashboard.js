import React from 'react'
import { useNavigate } from 'react-router' ;
import homepageIcon from '../images/homepageIcon.png'

const DocDashboard = () => {

  const navigate = useNavigate() ;
  const logout = () => {
    localStorage.removeItem('token') ;
    navigate('/') ;
  }


  return (
<div className='gradient-background'>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">HealthFirst</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/appointmentlist">Appointments</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/profiledoc">Profile</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" onClick={logout}>Logout</a>
                </li>
            </ul>
            
            </div>
        </div>
    </nav>

    <div className='row '>
        <div className='col text-center homepageCon'>
            <img src={homepageIcon}/>
        </div>

        <div className='col heading3 text-left'>
            <h3 classname="">
              ✔Find Doctors.
              <br></br><br></br>
              ✔Easy appointment booking.
              <br></br><br></br>
              ✔No more waiting in queues.
              
            </h3>
        </div>
    </div>

</div>
  )
}

export default DocDashboard