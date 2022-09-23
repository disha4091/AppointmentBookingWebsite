require("dotenv").config();
const express = require("express");
const router = express.Router();
var check  = require('express-validator');
var validationResult = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Doctor = require("../models/doctorProfile");
const Appointment = require("../models/appointment");
const checkAuthDoctor = require("../controllers/checkAuthDoctor") ;
// @route   Post api/user
// @desc    Register USer
// @access  Public
router.post(
  "/registerDoctor",
  // [
  //   check("name", "Name is required").not().isEmpty(),
  //   check("email", "Please include a valid email").isEmail(),
  //   check("password", "Please enter a password min 6 to 10 charcters").isLength(
  //     { min: 6 }
  //   ),
  // ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const { name,email,password,age,education,specializations,experience,clinicDetails } = req.body;

    try {
      // See if user exists
      let doctor = await Doctor.findOne({ email });

      if (doctor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Doctor already exists" }] });
      }
      const newdoctor = new Doctor({
		name,email,password,age,education,specializations,experience,clinicDetails
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      newdoctor.password = await bcrypt.hash(password, salt);

      const resDoctor = await newdoctor.save();

      //Return jsonwebtoken

      const payload = {
        doctor: {
          id: resDoctor._id,
          name:resDoctor.name,
          age:resDoctor.age,
          email:resDoctor.email,
		      education:resDoctor.education,
		      specializations:resDoctor.specializations,
		      experience:resDoctor.experience,
		      clinicDetails:resDoctor.clinicDetails,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/loginDoctor", (req, res) => {
  Doctor.findOne({email:req.body.email})
  .then((doctor) => {
    if(!doctor) {
      return res.json({
        message:"Invalid information"
      })
    }
    bcrypt.compare(req.body.password,doctor.password)
    .then(isCorrectPassword=>{
      if(isCorrectPassword){
      const payload = {
        id: doctor._id,
        name:doctor.name,
        age:doctor.age,
        email:doctor.email,
		education:doctor.education,
		specializations:doctor.specializations,
		experience:doctor.experience,
		clinicDetails:doctor.clinicDetails,
      }
      jwt.sign(
        payload, process.env.jwtSecret,{
          expiresIn: 360000
        },(err,token)=>{
          if(err) return res.json({message:"err"})
          return res.json({ message:"Successful login", token:token})
        })
    }
    else{
      return res.json({message:"Invalid username"})
    }}
    )
  })
})

router.get("/getDoctorname", checkAuthDoctor, (req,res)=>{
  res.json({isLoggedIn:true,name:req.doctor.name, age:req.doctor.age, email:req.doctor.email, education:req.doctor.education, specializations:req.doctor.specializations, experience:req.doctor.experience, clinicDetails:req.doctor.clinicDetails})
});

router.post("/createAppointment",checkAuthDoctor, 
  async (req, res) => {
    const appointment = new Appointment({
      doctorId:  req.doctor.id,
      time: req.body.time,
      isBooked: false
    });
    await appointment.save();
    res.json({
      status: "success",
      appointment
    })
  }
)

router.get("/listDoctors", (req, res) => {
  Doctor.find()
  .then((doctor) => {
    if(!doctor) {
      return res.json({
        message:"No doctors available"
      })
    }
   else{
      return res.json(doctor)
    }}
    )
  })


router.get("/listAppointments",checkAuthDoctor, (req, res) => {
    Appointment.find({doctorId : req.doctor.id})
    .then((appointment) => {
      if(!appointment) {
        return res.json({
          message:"No appointments"
        })
      }
     else{
        
        return res.json(appointment)
      
        
      }}
      )
    })
  


    router.get('/getAppointments/:doc_id', 
    (req, res) => {

    
    //console.log(req.params.doc_id);
    Appointment.find({doctorId:req.params.doc_id})
    .then( (appointment) => {
      if(appointment.length === 0) {
        return res.json({
          message:"No appointments"
        })
      }
     else{
        
        return res.json(appointment)
      
        
      }
    })
  })

module.exports = router;



