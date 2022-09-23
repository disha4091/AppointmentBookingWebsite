
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userProfile");

module.exports = function(req, res,next) {
    const token = req.headers.token
    //console.log(token);
    if(!token) return res.status(401).json({message: 'No token'})

    try{
        const decoded = jwt.verify(token, process.env.jwtSecret) ;
        req.user = {}
        req.user.id = decoded.id ;
        req.user.name = decoded.name ;
        req.user.age = decoded.age ;
        req.user.email = decoded.email ;
        next() ;
    }catch(e){
        res.status(401).json({message: 'Token invalid'})
    }
}