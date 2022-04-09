const {model, Schema} = require('mongoose');

const appointmentSchema = new Schema({
    isBooked:Boolean,
    patientId: Schema.Types.ObjectId,
    description:String,
    doctorId: Schema.Types.ObjectId,
    time: String,
    date: {
        type: Date,
        default: Date.now
    }   

})

module.exports = model('Appointment',appointmentSchema);