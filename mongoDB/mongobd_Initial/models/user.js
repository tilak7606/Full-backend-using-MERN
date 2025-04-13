const mongoose = require('mongoose');
// is file mai user ka schema hai bss :

const userSchema =  mongoose.Schema({
    username : String,
    name : String,
    email : String,
    password : String
}) 

module.exports = mongoose.model("user",userSchema);