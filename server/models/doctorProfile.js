const {model, Schema} = require('mongoose');
//const model = require('mongoose');


const doctorSchema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    education: String,
    specializations: String,
    experience: String,
    clinicDetails: String,
    

})

module.exports = model('Doctor',doctorSchema) ;