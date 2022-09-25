require("dotenv").config();
const express = require("express");
const router = express.Router();
var check  = require('express-validator');
var validationResult = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Appointment = require("../models/appointment");
const User = require("../models/userProfile");
const checkAuth = require("../controllers/checkAuth") ;
// @route   Post api/user
// @desc    Register USer
// @access  Public
router.post(
  "/api/users",
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
    const { name, email, password, age } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const newuser = new User({
        name,
        email,
        age,
        password,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      newuser.password = await bcrypt.hash(password, salt);

      const resUser = await newuser.save();

      //Return jsonwebtoken

      const payload = {
        user: {
          id: resUser._id,
          name:resUser.name,
          age:resUser.age,
          email:resUser.email
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

router.post("/loginUser", (req, res) => {
  User.findOne({email:req.body.email})
  .then((user) => {
    if(!user) {
      return res.json({
        message:"Invalid username"
      })
    }
    bcrypt.compare(req.body.password,user.password)
    .then(isCorrectPassword=>{
      if(isCorrectPassword){
      const payload = {
        id: user._id,
        name:user.name,
        age:user.age,
        email:user.email
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
      return res.json({message:"Invalid password"})
    }}
    )
  })
  
})

router.get("/getName/:userId", (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    if(!user) {
      return res.json({
        message:"Invalid username"
      })
    }
    
    else{
      return res.json({user}) 
    }
  })
  })
  

router.get("/getUsername", checkAuth, (req,res)=>{
  res.json({isLoggedIn:true,name:req.user.name, age:req.user.age, email:req.user.email})
})

router.post('/bookAppointment/:app_id',checkAuth, 
    (req, res) => {

    
    console.log(req.params.app_id);
    Appointment.findOne({_id:req.params.app_id})
    .then(async (appointment) => {
      if(appointment) {
        appointment.patientId = req.user.id;
        appointment.description = req.body.description ;
        appointment.isBooked = true ;
        await appointment.save().then(appointment1 => {
          res.json(' Updated Successfully');
          })
          .catch(err => {
          res.status(400).send("Unable To Update ");
          });

        console.log(appointment);
      }
    })
  //   Appointment.findOneAndUpdate({_id:req.params.app_id},{"name": "Dane"}, function(err, result){

  //     if(err){
  //         res.send(err)
  //     }
  //     else{
  //         res.send(result)
  //     }

  // })
  }
)
module.exports = router;

//-------------------------------------------------------------------------------------------------------------------------------------------
// function verifyJwt(req, res, next){
//   const token = req.headers["authorization"]?.split(' ')[1]
//   console.log('====================================');
//   console.log(req.headers);
//   console.log('====================================');
//   if(token){
//     jwt.verify(token, process.env.jwtSecret, (err, decoded)=>{
//       if(err) return res.json({
//         isLoggedIn:false,
//         message:"Failed to verify"
//       })
//       req.user = {}
//       req.user.id = decoded.id
//       req.user.email = decoded.email
//       next()
//     }) 
//   }
//   else{
//     res.json({message:"Incorrect token", isLoggedIn:false})
//   }
// }
