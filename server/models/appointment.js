import mongoose, { model } from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: String,
    doctorId: String,
    time:String,
    

})

module.exports = model('Appointment',appointmentSchema);