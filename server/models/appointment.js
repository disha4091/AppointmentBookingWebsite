const {model, Schema} = require('mongoose');

const appointmentSchema = new Schema({
    patientId: String,
    doctorId: String,
    time:String,
    

})

module.exports = model('Appointment',appointmentSchema);