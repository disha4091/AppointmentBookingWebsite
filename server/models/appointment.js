const {model, Schema} = require('mongoose');

const appointmentSchema = new Schema({
    patientId: Schema.Types.ObjectId,
    doctorId: Schema.Types.ObjectId,
    time: String,
    date: {
        type: Date,
        default: Date.now
    }   

})

module.exports = model('Appointment',appointmentSchema);