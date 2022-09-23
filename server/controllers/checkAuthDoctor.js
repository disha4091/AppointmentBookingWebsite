
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorProfile");

module.exports = function(req, res,next) {
    const token = req.headers.token;
    //console.log(token);
    if(!token) return res.status(401).json({message: 'No token'})

    try{
        const decoded = jwt.verify(token, process.env.jwtSecret) ;
        req.doctor = {}
        req.doctor.id = decoded.id ;
        req.doctor.name = decoded.name ;
        req.doctor.age = decoded.age ;
        req.doctor.email = decoded.email ;
        req.doctor.education = decoded.education ;
        req.doctor.specializations = decoded.specializations ;
        req.doctor.experience = decoded.experience ;
        req.doctor.clinicDetails = decoded.clinicDetails ;
        next() ;
    }catch(e){
        res.status(401).json({message: 'Token invalid'})
    }
}