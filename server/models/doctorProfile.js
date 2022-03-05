import mongoose, { model } from 'mongoose';

const doctorSchema = new mongoose.Schema({
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