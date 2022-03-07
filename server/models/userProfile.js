const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
   

})

module.exports = model('User',userSchema) ;