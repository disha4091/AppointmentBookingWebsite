import mongoose, { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
   

})

module.exports = model('User',userSchema) ;