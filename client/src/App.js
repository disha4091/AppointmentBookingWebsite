import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Register from './components/Register' ;
import Login from './components/Login' ;
import  Profile from './components/Profile' ;
import ProfileDoc from './components/ProfileDoc';
import DefaultPage from './components/DefaultPage';
import LoginDoc from './components/LoginDoc';
import RegisterDoc from './components/RegisterDoc';
import UserDashboard from './components/UserDashboard';
import DocDashboard from './components/DocDashboard';
import ListDoctors from './components/ListDoctors';
import AppointmentList from './components/AppointmentList';
import DoctorInfo from './components/DoctorInfo';

import './App.css';
import {useState} from 'react';


function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Register/>} exact path="/register" />
          <Route element={<Login/>} exact path="/login" />
          <Route element={<RegisterDoc/>} exact path="/registerdoc" />
          <Route element={<LoginDoc/>} exact path="/logindoc" />
          <Route element={<Profile/>} exact path="/profile" />
          <Route element={<UserDashboard/>} exact path="/userdashboard" /> 
          <Route element={<DocDashboard/>} exact path="/docdashboard" />                     
          <Route element={<ListDoctors/>} exact path="/listDoctors" /> 
          <Route element={<ProfileDoc/>} exact path="/profiledoc" />  
          <Route element={<AppointmentList/>} exact path="/appointmentlist" />  
          <Route element={<DoctorInfo/>} exact path="/doctor/:doctorId" />  
          <Route element={<DefaultPage/>} exact path="/"/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
