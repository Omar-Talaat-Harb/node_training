const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String,
        unique: true },
    password: {
        type:String,
        required: true,
        minlength: 8},
    role: { type: String, default: 'user' }, // 'user' or 'admin'
});
const User = mongoose.model("users",userSchema);
module.exports = User;