require("dotenv").config();
const express = require("express");
const router = express.Router();
var check  = require('express-validator');
var validationResult = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      user = new User({
        name,
        email,
        age,
        password,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
          name:user.name,
          age:user.age,
          email:user.email
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
        message:"Invalid information"
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
          return res.json({ message:"Successful login", token:"Bearer " + token})
        })
    }
    else{
      return res.json({message:"Invalid username"})
    }}
    )
  })
})

router.get("/getUsername", checkAuth, (req,res)=>{
  res.json({isLoggedIn:true,name:req.user.name, age:req.user.age, email:req.user.email})
})
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
